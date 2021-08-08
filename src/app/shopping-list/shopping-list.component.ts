import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shoppingList.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit , OnDestroy {

  ingredients!: Ingredient[] ; //this is not use to replace work with service back to commit number 6
  private igChangeSub !: Subscription;
  constructor(private ShoppingService : ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.ShoppingService.getIngredients();
    //console.log(this.ingredients);
    this.igChangeSub = this.ShoppingService.AddNewIngredient.subscribe(newIngredient => {
      this.ingredients.push(newIngredient);
    });
  }

  /*this is not use to replace work with service back to commit number 6
  OnIngredientAdd(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
//*/
ngOnDestroy(){
  this.igChangeSub.unsubscribe();
}
}
