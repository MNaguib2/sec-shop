import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService] 
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
