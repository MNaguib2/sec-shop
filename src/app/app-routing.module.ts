import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // pathMatch to solve problem path '' is empity without any **
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipe.module").then(m => m.RecipeModule)
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping.module").then(m => m.ShoppingModule)
  },
  {path: 'auth' , loadChildren: () =>
  import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '**', redirectTo: '/recipes', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
