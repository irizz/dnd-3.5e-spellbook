import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private service: SharedService
  ) {}

  ngOnInit() {}

  errorMessage: string = "";

  login = new FormControl("", [Validators.required]);

  password = new FormControl("", [Validators.required]);

  closeModal(): void {
    this.dialogRef.close();
  }

  onExitClick(): void {
    this.closeModal();
  }

  onLoginBtnClick() {
    const login = this.login.value;
    const password = this.password.value;
    this.service.sendLoginRequest(login, password).subscribe(
      () => {
        this.service.username = login;
        this.service.isLoggedIn = true;
        this.service.setCookie("username", login);
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
