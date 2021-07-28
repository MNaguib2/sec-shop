import { Component, Input, OnInit } from '@angular/core';
import { RecipeService }  from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipes-detials.component.html',
  styleUrls: ['./recipes-detials.component.scss']
})
export class RecipesDetialsComponent implements OnInit {

  @Input('recipeDetials') recipes = {} as any;
  constructor(private RecipeService : RecipeService) { }

  ngOnInit() {
    //console.log(this.recipes);
  }
  onAddToShoppingList(){
    this.RecipeService.addIngredientstoShoppingList(this.recipes.ingredients);
  }

}
