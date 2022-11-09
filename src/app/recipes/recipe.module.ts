import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CoreModule } from "../core.module";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeRouteModule } from "./recipe.routing.module";
import { RecipesDetialsComponent } from "./recipes-detials/recipes-detials.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetialsComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  /*there is no reason to still exports all this 
  recipe components becouse we're now only using 
  them internaly in this recipes
  exports: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetialsComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  //*/
  imports: [
    RouterModule,
    RecipeRouteModule,
    SharedModule
  ]
})

export class RecipeModule { }
