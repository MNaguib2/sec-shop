import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../shared/recipe.service';
import { DataStorageservice } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit , OnDestroy{
   //@Output() recipeWasSelected = new EventEmitter<Recipe>(); //this is not use to replace work with service back to commit number 6
recipes!: Recipe[] ;
SubScrip !: Subscription;
  constructor(private RecipeService: RecipeService,
      private router : Router , private route : ActivatedRoute) { }

  ngOnInit(): void {
    //this.recipes = this.RecipeService.getRecipes();
    this.SubScrip = this.RecipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    })
  }
  /*this is not use to replace work with service back to commit number 6
  onRecipeSelected(recipe : Recipe){
    this.recipeWasSelected.emit(recipe);
  }
  //*/
  onNewRecip(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }
  ngOnDestroy(){
    this.SubScrip.unsubscribe();
  }
}
