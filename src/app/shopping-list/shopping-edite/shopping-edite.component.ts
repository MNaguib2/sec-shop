import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shoppingList.service';

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

  constructor(private ShoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.SubscribeEdit = this.ShoppingService.startedEditing.subscribe((index: number) => {
      this.editeMode = true;
      this.editedItemIndex = index;
      this.NameInputRef.nativeElement.value = this.ShoppingService.getIngredient(index).name;
      this.AmountInputRef.nativeElement.value = this.ShoppingService.getIngredient(index).amount;
    })
  }
  ngOnDestroy() {
    this.SubscribeEdit.unsubscribe();
  }

  onClear() {
    this.NameInputRef.nativeElement.value = '';
    this.AmountInputRef.nativeElement.value = '';
    this.editeMode = false;
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

      this.ShoppingService.AddNewIngredient.next(newIngredient);
    }
    //this.AddNewIngredient.emit(newIngredient)//this is not use to replace work with service back to commit number 6
  }
  onDelete() {
    this.ShoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
