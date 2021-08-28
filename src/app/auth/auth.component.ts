import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponesData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = '';

  constructor(private AuthService: AuthService, private router: Router) { }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
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
      this.isLoading = false;
    });
    authForm.reset();
  }
}
