import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeService }  from '../../shared/recipe.service';
import { Recipe } from '../recipe.model';
import * as shoppingListAction from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipes-detials.component.html',
  styleUrls: ['./recipes-detials.component.scss']
})
export class RecipesDetialsComponent implements OnInit {

  //@Input('recipeDetials') recipes = {} as any; //this directive not used after commit 8 to work with app-router instead of directive
  recipes!:Recipe; // this value use instead of directive in router
  id!: number;
  constructor(private RecipeService : RecipeService , private router: ActivatedRoute
    , private Route : Router, private store : Store) { }

  ngOnInit() {
    //console.log(this.recipes);
    //const id = this.router.snapshot.params['id']; // this code not use but subscribe to if any change
    this.router.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.recipes = this.RecipeService.getRecipe(this.id);
    })
  }
  onAddToShoppingList(){
    this.store.dispatch(new shoppingListAction.AddIngredients(this.recipes.ingredients));

    //this.RecipeService.addIngredientstoShoppingList(this.recipes.ingredients);
  }
  onDeleteRecipe() {
    this.RecipeService.deleteRecipe(this.id);
    this.Route.navigate(['/recipes']);
  }
}
