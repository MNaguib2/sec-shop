import { EventEmitter } from '@angular/core'; // we will replace EventEmitter By Subject
import { Ingredient } from '../shared/ingredient.model'; 
import { Subject } from 'rxjs';

export class ShoppingService {

    ingredientsChanged = new  Subject<Ingredient[]>();

    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      //AddNewIngredient = new EventEmitter<Ingredient>();
      AddNewIngredient = new Subject<Ingredient>();

      getIngredients(){
          return this.ingredients.slice();
      }
/* this method will change write to work button delete and update and this particpate with recipes
    addnewIngedient(ingredient: Ingredient[]){
        /* well try new way
        for (let ingred of ingredient){
        this.ingredients.push(ingred);
        }        
        this.ingredients.push(...ingredient);
    }
    //this way update to can add ingredient from page shop-list and from recipes-Detials  */ 
/*To Solve this Error add new and made Update and add ingredients from Recipe
Error: src/app/recipes/recipe.service.ts:38:46 - error TS2345: Argument of type 'Ingredient[]' 
is not assignable to parameter of type 'Ingredient'.
*/
    addnewIngedient(ingredient: Ingredient){    
      this.ingredients.push(ingredient);
  }

    getIngredient(index : number){
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}