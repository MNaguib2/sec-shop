import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { AppState } from './shared';
import * as AuthActions from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sec-shop';

  loadedFeature ='recipe';
  constructor(private Authservice: AuthService,
    private store : Store<AppState>){}
  onNavigate(feature: string){
    this.loadedFeature = feature;
    //console.log(feature);
  }
  ngOnInit(){
   // this.Authservice.autoLogin();
   this.store.dispatch(new AuthActions.AutoLogin());
  }
}
