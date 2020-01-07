import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CookieService } from "../shared/services/cookie.service";
import { DataService } from "../shared/services/data.service";
import { ServerService } from "../shared/services/server.service";
import { ViewService } from "../shared/services/view.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private cookies: CookieService,
    private data: DataService,
    private server: ServerService,
    private view: ViewService
  ) {}

  ngOnInit() {}

  errorMessage: string = "";
  login = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);

  closeModal(): void {
    this.dialogRef.close();
  }

  isLoginButtonDisabled(): boolean {
    return this.isLoginHasError() || this.isPasswordHasError();
  }

  isErrorMessageEmpty(): boolean {
    return this.errorMessage === "";
  }

  isLoginHasError(): boolean {
    return this.login.hasError("required");
  }

  isPasswordHasError(): boolean {
    return this.password.hasError("required");
  }

  onCancelClick(): void {
    this.closeModal();
  }

  onLoginClick(): void {
    const login = this.login.value;
    const password = this.password.value;

    this.server.sendLoginRequest(login, password).subscribe(
      () => {
        this.data.setUsername(login);
        this.cookies.setCookie("username", login);
        this.view.showLogin();
        this.closeModal();
      },
      error => {
        if (error.status == 401) {
          this.errorMessage = "Invalid login/password.";
        } else {
          this.errorMessage = error.message;
        }
      }
    );
  }
}
