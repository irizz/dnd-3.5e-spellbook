import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoginFormComponent>) {}

  ngOnInit() {}

  loginFormControl = new FormControl("", [Validators.required]);

  passwordFormControl = new FormControl("", [Validators.required]);

  onExitClick(): void {
    this.dialogRef.close();
  }
}
