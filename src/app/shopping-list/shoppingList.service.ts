import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      AddNewIngredient = new EventEmitter<Ingredient>();

      getIngredients(){
          return this.ingredients.slice();
      }
    addnewIngedient(ingredient: Ingredient[]){
        /* well try new way
        for (let ingred of ingredient){
        this.ingredients.push(ingred);
        }
        //*/
        this.ingredients.push(...ingredient);
    }
}