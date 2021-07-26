import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipes-detials.component.html',
  styleUrls: ['./recipes-detials.component.scss']
})
export class RecipesDetialsComponent implements OnInit {

  @Input('recipeDetials') recipes = {} as any;
  constructor() { }

  ngOnInit() {
    console.log(this.recipes);
  }

}
