import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from '../shared/services/auth.service';
import { CookieService } from "../shared/services/cookie.service";
import {
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  LOGIN_PATTERN,
  PASSWORD_PATTERN
} from "./signup-form-constants";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SignupFormComponent>,
    private auth: AuthService,
    private cookies: CookieService,
  ) {}

  ngOnInit() {}

  errorMessage: string = "";

  login = new FormControl("", [
    Validators.required,
    Validators.minLength(MIN_LOGIN_LENGTH),
    Validators.maxLength(MAX_LOGIN_LENGTH),
    Validators.pattern(LOGIN_PATTERN)
  ]);

  password = new FormControl("", [
    Validators.required,
    Validators.minLength(MIN_PASSWORD_LENGTH),
    Validators.maxLength(MAX_PASSWORD_LENGTH),
    Validators.pattern(PASSWORD_PATTERN)
  ]);

  confirmPassword = new FormControl("");

  clearError() {
    this.errorMessage = "";
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  isPasswordNotConfirmed(): boolean {
    return (
      this.password.errors == null &&
      this.password.value !== this.confirmPassword.value
    );
  }

  isSignupBtnDisabled(): boolean {
    return (
      this.login.errors !== null ||
      this.password.errors !== null ||
      this.isPasswordNotConfirmed()
    );
  }

  onExitClick(): void {
    this.closeModal();
  }

  onSignupClick() {
    const login = this.login.value;
    const password = this.password.value;

    this.auth.sendSignupRequest(login, password).subscribe(
      () => {
        // [NOTE] Autologin after successfull signup request
        this.auth.sendLoginRequest(login, password).subscribe(
          () => {
            this.cookies.setCookie("username", login);
            this.auth.setUsername(login);
            this.auth.showLogin();
            this.closeModal();
          },
          error => {
            this.errorMessage = error.message;
          }
        );
      },
      error => {
        if (error.status == 409) {
          this.errorMessage = "This username was already taken.";
        } else {
          this.errorMessage = error.message;
        }
      }
    );
  }
}
