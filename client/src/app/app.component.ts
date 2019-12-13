import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {

  }

  appTitle = 'D&D 3.5e Spellbook'

  handleLoginClick() {
    const dialogRef = this.dialog.open(LoginFormComponent);
    dialogRef.afterClosed().subscribe();
  }

  handleSignupClick() {
    const dialogRef = this.dialog.open(SignupFormComponent);
    dialogRef.afterClosed().subscribe();
  }
}
