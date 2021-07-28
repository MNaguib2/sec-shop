import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sec-shop';

  loadedFeature ='recipe';

  onNavigate(feature: string){
    this.loadedFeature = feature;
    //console.log(feature);
  }
  ngOnInit(){
  }
}
