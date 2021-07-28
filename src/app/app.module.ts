import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetialsComponent } from './recipes/recipes-detials/recipes-detials.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditeComponent } from './shopping-list/shopping-edite/shopping-edite.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingService } from './shopping-list/shoppingList.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesDetialsComponent,
    RecipesItemComponent,
    ShoppingListComponent,
    ShoppingEditeComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
