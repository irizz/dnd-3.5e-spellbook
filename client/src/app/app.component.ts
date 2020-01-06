import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { SharedService } from "./shared/shared.service";
import { API_URL } from "./shared/constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private service: SharedService
  ) {}

  appTitle = "D&D 3.5e Spellbook";

  handleLoginClick() {
    const dialogRef = this.dialog.open(LoginFormComponent, { width: "20%" });
    dialogRef.afterClosed().subscribe();
  }

  deleteCookie(name: string) {
    this.service.setCookie(name, "", {
      'max-age': -1
    })
  }

  handleLogoutClick() {
    this.sendLogoutRequest().subscribe(
      () => {
        this.service.isLoggedIn = false;
        this.service.username = "";
        this.deleteCookie("username");
      },
      error => {
        alert(`There was some error: ${error.message}`);
      }
    );
  }

  handleSignupClick() {
    const dialogRef = this.dialog.open(SignupFormComponent, { width: "20%" });
    dialogRef.afterClosed().subscribe();
  }

  sendLogoutRequest() {
    return this.http.get(`${API_URL}/logout`, { withCredentials: true });
  }
}
