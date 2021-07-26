import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edite.component.html',
  styleUrls: ['./shopping-edite.component.scss']
})
export class ShoppingEditeComponent implements OnInit {
 @ViewChild('NameInput') NameInputRef !: ElementRef;
 @ViewChild('AmountInput') AmountInputRef !: ElementRef;
 @Output() AddNewIngredient = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }
  onAddItem(){
    const ingName = this.NameInputRef.nativeElement.value;
    const ingAmount = this.AmountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.AddNewIngredient.emit(newIngredient)
  }

}
