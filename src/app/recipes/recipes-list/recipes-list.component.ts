import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
   //@Output() recipeWasSelected = new EventEmitter<Recipe>(); //this is not use to replace work with service back to commit number 6
recipes!: Recipe[] ;
  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.RecipeService.getRecipes();
  }
  /*this is not use to replace work with service back to commit number 6
  onRecipeSelected(recipe : Recipe){
    this.recipeWasSelected.emit(recipe);
  }
  //*/
}
