import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "./recipe.service";
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataStorageservice {
    constructor(private http: HttpClient,private recipeservice : RecipeService ){}
    storageRecipes(
        /*this is not use to use instead of from service get
        recipes: Recipe[]
        //*/
       ){
            const recipes = this.recipeservice.getRecipes();
            return this.http.put('https://ng-course-recipe-book-790c6-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response =>{
                //console.log(response);
            })
    }

    fetchRecipes(){
       return this.http.get<Recipe[]>('https://ng-course-recipe-book-790c6-default-rtdb.firebaseio.com/recipes.json')
       .pipe(
           tap(recipes => {
            this.recipeservice.setRecipe(recipes);
           })
       )
    }

}