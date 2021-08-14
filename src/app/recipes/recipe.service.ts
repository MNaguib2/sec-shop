import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
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
         console.log(ingredients);
         for (let i = 0; i < ingredients.length; i++) {
            this.ShoppingService.addnewIngedient(ingredients[i]);
          }
        //this.ShoppingService.addnewIngedient(ingredients);
     }
     getRecipe(index: number){
        return this.recipes[index];
     }
     addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
    
      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
    
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}