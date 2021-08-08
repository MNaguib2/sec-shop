import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  constructor(private route: ActivatedRoute) { }
  editMode = false;
  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id = +data['id'];
      //this.editMode = +data['id'] ? false : true;
      this.editMode = data['id'] != null ;
      console.log(this.editMode);
    })
  }

}
