import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "./recipe.service";
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageservice {
  constructor(private http: HttpClient, private recipeservice: RecipeService, private authuser: AuthService) { }
  storageRecipes(
    /*this is not use to use instead of from service get
    recipes: Recipe[]
    //*/
  ) {
    const recipes = this.recipeservice.getRecipes();
    return this.http.put('https://ng-course-recipe-book-790c6-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        //console.log(response);
      })
  }

  fetchRecipes() {
    //this way to add auth token in http params and exsit another way by made specifie interceptor to login
    return this.authuser.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(//there is two way two add token to made authentication to database
          //'https://ng-course-recipe-book-790c6-default-rtdb.firebaseio.com/recipes.json?auth='+ user?.token // this is first way Or
          'https://ng-course-recipe-book-790c6-default-rtdb.firebaseio.com/recipes.json',
          {
            //params: new HttpParams().set('auth', user.token)
          }
          )
      }),
    tap(recipes => {
      this.recipeservice.setRecipe(recipes);
    }))
  }
}
