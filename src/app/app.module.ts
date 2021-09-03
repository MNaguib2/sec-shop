import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    //FormsModule, // will used share module instead render in every module render one item
    AppRoutingModule,
    //ReactiveFormsModule, // will used share module instead render in every module render one item
    HttpClientModule,
    RecipeModule,
    //ShoppingModule, // I will comment this to Apply Lazy Lloading Load this module when use Path
    AuthModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  /* I will use shared module instead this
  entryComponents:[ //this is very important to dynamic component
    AlertComponent
  ]
  //*/
})
export class AppModule { }
