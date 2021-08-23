import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { RecipeService } from '../../../shared/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {
  @Input('recipe') recipe = {} as any;
  //@Output() recipeSelected = new EventEmitter<void>(); //this is not use to replace use service 
  @Input() index !: number;
  constructor(private RecipeService : RecipeService) { }

  ngOnInit(): void {
  }
  onselected(){
    //this.recipeSelected.emit();
    this.RecipeService.recipeSelected.emit(this.recipe);
  }

}
