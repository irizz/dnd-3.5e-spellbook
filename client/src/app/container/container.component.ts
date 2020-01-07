import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { CookieService } from "../shared/services/cookie.service";
import { ServerService } from "../shared/services/server.service";
import { ViewService } from "../shared/services/view.service";
import { CharClassesResponse } from "../shared/interfaces";
import { sortingFunc } from "../shared/utils";
import { DataService } from '../shared/services/data.service';

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  constructor(
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
        this.view.isLoggedIn = true;
      },
      error => console.log(error.name)
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
}
