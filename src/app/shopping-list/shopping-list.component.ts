import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shoppingList.service';
import * as shoppingListAction from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit , OnDestroy {

  ingredients!: Observable<{ingredients : Ingredient[]}>; //this is not use to replace work with service back to commit number 6
  private igChangeSub !: Subscription;
  constructor(private ShoppingService : ShoppingService,
    private store : Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
   this.ingredients = this.store.select('shoppingList');
    /*this will commit to I will use NgRx this function is work on reduce function instead of
    use two function to listen if any change and to get all data in first this above fun will made two in one

    this.ingredients = this.ShoppingService.getIngredients();
    //console.log(this.ingredients);
    this.igChangeSub = this.ShoppingService.AddNewIngredient.subscribe((newIngredient: Ingredient) => {
      this.ingredients.push(newIngredient);
      this.ShoppingService.addnewIngedient(newIngredient);
    });
    this.igChangeSub = this.ShoppingService.ingredientsChanged.subscribe(Ingredient => {
      this.ingredients =  Ingredient;
    });
    //*/
  }

  /*this is not use to replace work with service back to commit number 6
  OnIngredientAdd(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
//*/
ngOnDestroy(){
  //this.igChangeSub.unsubscribe();
}

onEditItem(index : number){
  //console.log(index);
    //this.ShoppingService.startedEditing.next(index);//to get Detials item and show in text edit from NgRx
    this.store.dispatch(new shoppingListAction.StarEdit(index));
}

}
