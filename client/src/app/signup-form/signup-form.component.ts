import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import {
  API_URL,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  LOGIN_PATTERN,
  PASSWORD_PATTERN
} from "../shared/constants";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SignupFormComponent>,
    private http: HttpClient,
    private service: SharedService
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
    if (
      this.login.errors !== null ||
      this.password.errors !== null ||
      this.isPasswordNotConfirmed()
    ) {
      return true;
    } else {
      return false;
    }
  }

  onExitClick(): void {
    this.closeModal();
  }

  onSignupClick() {
    const login = this.login.value;
    const password = this.password.value;
    this.sendSignupRequest(login, password).subscribe(
      () => {
        this.service.sendLoginRequest(login, password).subscribe(
          () => {
            this.service.username = login;
            this.service.isLoggedIn = true;
            this.service.setCookie("username", login);
            this.closeModal();
          },
          error => console.error(error)
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

  sendSignupRequest(login: string, password: string) {
    return this.http.post(`${API_URL}/registration`, {
      login,
      password
    });
  }
}
