import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CookieService } from "../shared/services/cookie.service";
import { ServerService } from "../shared/services/server.service";
import { ViewService } from "../shared/services/view.service";
import { CharClassesResponse } from "../shared/interfaces";
import { sortingFunc } from "../shared/utils";
import { DataService } from "../shared/services/data.service";
import {
  COOKIES_CONSENT,
  COOKIES_CONSENT_ACTION_TEXT
} from "../shared/constants";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private cookies: CookieService,
    private data: DataService,
    private server: ServerService,
    private view: ViewService
  ) {}

  ngOnInit() {
    this.server.checkSession().subscribe(
      () => {
        const username = this.cookies.getCookie("username");
        this.data.username = username;
        this.data.isAgreedToCookies = true;
        this.view.isLoggedIn = true;
      },
      () => {
        this.showCookiesConsent();
      }
    );
    this.server.fetchClasses().subscribe(
      (data: CharClassesResponse) => {
        this.view.isLoading = false;
        this.data.charClassesList = data.classesList.sort(sortingFunc);
      },
      (error: HttpErrorResponse) => {
        this.view.isLoading = false;
        this.view.isError = true;
        this.view.errorToDisplay = {
          statusText: error.statusText,
          message: error.message
        };
      }
    );
  }

  handleGoToSelectClassClick() {
    this.view.clearView();
    this.data.clearData();
  }

  showCookiesConsent() {
    const snackBarRef = this.snackBar.open(
      COOKIES_CONSENT,
      COOKIES_CONSENT_ACTION_TEXT
    );
    snackBarRef.onAction().subscribe(() => {
      this.data.isAgreedToCookies = true;
    });
  }
}
