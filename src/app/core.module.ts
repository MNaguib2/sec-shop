import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { DataStorageservice } from "./shared/data-storage.service";
import { RecipeService } from "./shared/recipe.service";
import { ShoppingService } from "./shopping-list/shoppingList.service";

@NgModule({
  providers: [
    ShoppingService,
    RecipeService,
    DataStorageservice,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})

export class CoreModule {}
