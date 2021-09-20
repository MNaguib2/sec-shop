import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations:[
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '' , component: AuthComponent , canActivate: [AuthGuard]},
    ]),
    SharedModule,
  ],
  exports:[
    RouterModule
  ]
})

export class AuthModule {}
