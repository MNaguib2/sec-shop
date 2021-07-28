import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {
  @Input('recipe') recipe = {} as any;
  //@Output() recipeSelected = new EventEmitter<void>(); //this is not use to replace use service 
  constructor(private RecipeService : RecipeService) { }

  ngOnInit(): void {
  }
  onselected(){
    //this.recipeSelected.emit();
    this.RecipeService.recipeSelected.emit(this.recipe);
  }

}
