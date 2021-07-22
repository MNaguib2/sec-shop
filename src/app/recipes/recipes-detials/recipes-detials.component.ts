import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-detials',
  templateUrl: './recipes-detials.component.html',
  styleUrls: ['./recipes-detials.component.scss']
})
export class RecipesDetialsComponent implements OnInit {

  recipes = [] as any;
  constructor() { }

  ngOnInit(): void {
  }

}
