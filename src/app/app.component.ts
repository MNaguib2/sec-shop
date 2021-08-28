import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sec-shop';

  loadedFeature ='recipe';
  constructor(private Authservice: AuthService){}
  onNavigate(feature: string){
    this.loadedFeature = feature;
    //console.log(feature);
  }
  ngOnInit(){
    this.Authservice.autoLogin();
  }
}
