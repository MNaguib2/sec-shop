import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "../alert/alert.component";
import { SpinnerLoadComponent } from "../spinner-load/spinner-load.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations:[
    AlertComponent,
    SpinnerLoadComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
     ],
     exports: [
      AlertComponent,
      SpinnerLoadComponent,
      PlaceholderDirective,
      DropdownDirective,
      CommonModule,
      ReactiveFormsModule,
      FormsModule
    ],
    entryComponents: [AlertComponent],
})

export class SharedModule {}
