import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from './shared/services/auth.service';
import { LoginFormComponent } from "./login-form/login-form.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
  ) {}

  appTitle = "D&D 3.5e Spellbook";

  handleLoginClick() {
    const dialogRef = this.dialog.open(LoginFormComponent, { width: "20%" });
    dialogRef.afterClosed().subscribe();
  }

  handleSignupClick() {
    const dialogRef = this.dialog.open(SignupFormComponent, { width: "20%" });
    dialogRef.afterClosed().subscribe();
  }

  handleLogoutClick() {
    this.auth.sendLogoutRequest().subscribe(
      () => {
        this.auth.hideLogin();
        this.auth.clearUsername();
        localStorage.setItem("username", "");
      },
      error => {
        alert(`There was some error during logout: ${error.message}`);
      }
    );
  }
}
