import { EventEmitter } from '@angular/core'; // we will replace EventEmitter By Subject
import { Ingredient } from '../shared/ingredient.model'; 
import { Subject } from 'rxjs';

export class ShoppingService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      //AddNewIngredient = new EventEmitter<Ingredient>();
      AddNewIngredient = new Subject<Ingredient>();

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