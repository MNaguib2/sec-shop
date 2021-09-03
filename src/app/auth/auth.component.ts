import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";
import { AlertComponent } from "../alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponesData, AuthService } from "./auth.service";

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
    private componentFactoryResolver : ComponentFactoryResolver) { }
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

    if (this.isLoginMode) {
      AuthObs = this.AuthService.login(email, password);
    } else {
      AuthObs = this.AuthService.singUp(email, password);
    }

    AuthObs.subscribe(response => {
      //console.log(response);
      this.isLoading = false;
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.error = error;
      this.showErrorAlert(error);
      this.isLoading = false;
    });
    authForm.reset();
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();//this is true code as a typescript but not working in angular becoust can't instantiate object as a this
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
  }
}
