import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";
import { AlertComponent } from "../alert/alert.component";
import { AppState } from "../shared";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponesData, AuthService } from "./auth.service";
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error: string = '';
  private closeSub!: Subscription;
  @ViewChild(PlaceholderDirective, {static: false})  alertHost!: PlaceholderDirective;

  constructor(private AuthService: AuthService, private router: Router,
    private componentFactoryResolver : ComponentFactoryResolver,
    private store : Store<AppState>) {

     this.closeSub = this.store.select('auth').subscribe(authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });

    }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onHandleError() {
    this.error = '';
  }
  onSubmit(authForm: NgForm) {

    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    let AuthObs: Observable<AuthResponesData>;
    this.isLoading = true;
//code Observable comment to work on Ngrx Effect instead of service and subscripe this is easy and flixablity from commit 18
    if (this.isLoginMode) {
      //AuthObs = this.AuthService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    } else {
      //AuthObs = this.AuthService.singUp(email, password);
      this.store.dispatch(new AuthActions.SignUpStart({email: email, password: password}));
    }
/*
    AuthObs.subscribe(response => {
      console.log(' kshgfdsjf'+response);
      this.isLoading = false;
      this.router.navigate(['/']);
    }, error => {
      if(error){
      this.error = error;
      }else{
        this.error = "Please Recover Your Network!";
      }
      this.showErrorAlert(this.error);
      this.isLoading = false;
    });
    //*/
    authForm.reset();
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
     //const alertCmp = new AlertComponent();//this is true code as a typescript but not working in angular becouse can't instantiate object as a this
    //*
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
    //*/
  }
}
