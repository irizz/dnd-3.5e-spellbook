import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CookieService } from "./shared/services/cookie.service";
import { DataService } from "./shared/services/data.service";
import { ServerService } from "./shared/services/server.service";
import { ViewService } from "./shared/services/view.service";
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
    private cookies: CookieService,
    private data: DataService,
    private server: ServerService,
    private view: ViewService
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
    this.server.sendLogoutRequest().subscribe(
      () => {
        this.view.hideLogin();
        this.data.clearUsername();
        this.cookies.deleteCookie("username");
      },
      error => {
        alert(`There was some error during logout: ${error.message}`);
      }
    );
  }
}
