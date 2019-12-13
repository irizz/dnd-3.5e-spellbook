import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignupFormComponent>) { }

  ngOnInit() {
  }

  loginFormControl = new FormControl("", [Validators.required]);

  passwordFormControl = new FormControl("", [Validators.required]);

  onExitClick(): void {
    this.dialogRef.close();
  }

}
