import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../shared/recipe.service';
import { DataStorageservice } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  //providers: [RecipeService] // Iwill remove this provider from here and move provider in app.module to share service in all app
  // this is very important to inherentance this service to another child in another component 
})
export class RecipesComponent implements OnInit {
    selectedRecipe!: Recipe;
  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {
    this.RecipeService.recipeSelected.subscribe
    (recipe => {
      this.selectedRecipe = recipe;
    });
  }
}
