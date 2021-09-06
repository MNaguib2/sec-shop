import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shoppingList.service';
import * as shoppingListAction from '../store/shopping-list.actions';
import { ShoppingListState } from '../store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edite.component.html',
  styleUrls: ['./shopping-edite.component.scss']
})
export class ShoppingEditeComponent implements OnInit, OnDestroy {
  @ViewChild('NameInput') NameInputRef !: ElementRef;
  @ViewChild('AmountInput') AmountInputRef !: ElementRef;
  //@Output() AddNewIngredient = new EventEmitter<Ingredient>();//this is not use to replace work with service back to commit number 6
  editeMode = false;
  SubscribeEdit!: Subscription;
  name!: string;
  amount !: number;
  editedItemIndex !: number;
  constructor(private ShoppingService: ShoppingService,
    private store: Store<{shoppingList: ShoppingListState}>) { }
  ngOnInit(): void {
    /*instead of using the async pipe in the template recove shopping-list.component.html
    i will set up my own subscription whoch can of course becouse it just an observable
    */
    this.SubscribeEdit = this.store.select('shoppingList').subscribe(data  => {
      if(data.editedIngredientIndex > -1){
      this.editeMode = true;
      this.editedItemIndex = data.editedIngredientIndex;
      this.NameInputRef.nativeElement.value = data.editedIngredient?.name;
      this.AmountInputRef.nativeElement.value = data.editedIngredient?.amount;
      }
    });
    /* I work in NgRx in stead of use service and subject or eventEmitter
    this.SubscribeEdit = this.ShoppingService.startedEditing.subscribe((index: number) => {
      this.editeMode = true;
      this.editedItemIndex = index;
      this.NameInputRef.nativeElement.value = this.ShoppingService.getIngredient(index).name;
      this.AmountInputRef.nativeElement.value = this.ShoppingService.getIngredient(index).amount;
    })
    //*/
  }
  ngOnDestroy() {
    this.SubscribeEdit.unsubscribe();
  }

  onClear() {
    this.NameInputRef.nativeElement.value = '';
    this.AmountInputRef.nativeElement.value = '';
    this.editeMode = false;
    this.store.dispatch(new shoppingListAction.StopEdit());
  }

  onAddEditItem() {
    if (this.editeMode) {
      this.ShoppingService.updateIngredient(this.editedItemIndex,
        new Ingredient(this.NameInputRef.nativeElement.value,
          this.AmountInputRef.nativeElement.value)
        )
    }
    else {
      const ingName = this.NameInputRef.nativeElement.value;
      const ingAmount = this.AmountInputRef.nativeElement.value;
      const newIngredient = new Ingredient(ingName, ingAmount);
      //this.ShoppingService.AddNewIngredient.emit(newIngredient);//this will change becouse replace eventEmitter by Subject
      //console.log(newIngredient);
      //I will commit this to Apply NGRX
      //this.ShoppingService.AddNewIngredient.next(newIngredient);
      this.store.dispatch(new shoppingListAction.AddIngredient(newIngredient));
      //here i write code ngrx in this compnent and above in edit i write code in service as a learn both statue
    }
    //this.AddNewIngredient.emit(newIngredient)//this is not use to replace work with service back to commit number 6
  }
  onDelete() {
    this.ShoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
