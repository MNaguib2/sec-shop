import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-load',
  template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./spinner-load.component.scss']
})
export class SpinnerLoadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
