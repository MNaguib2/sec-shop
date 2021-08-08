import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingService } from '../shopping-list/shoppingList.service';

@Injectable()

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('french fries', 20)
        ]),
         new Recipe('this A different Recipe', 
         'This is simply a test', 
         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
         [
            new Ingredient('Meat', 1),
            new Ingredient('Buns', 2)
         ])
     ];

     constructor(private ShoppingService:  ShoppingService){

     }
     getRecipes() {
         return this.recipes.slice();
     }

     addIngredientstoShoppingList(ingredients: Ingredient[]){
         //console.log(ingredients);
        this.ShoppingService.addnewIngedient(ingredients);
     }
     getRecipe(index: number){
        return this.recipes[index];
     }
      
}