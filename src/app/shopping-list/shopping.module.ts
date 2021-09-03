import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditeComponent } from "./shopping-edite/shopping-edite.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditeComponent,
  ],
  imports:[
    FormsModule,
    RouterModule.forChild([
      {path: '', component: ShoppingListComponent},
    ]),
    SharedModule
  ]
})

export class ShoppingModule { }
