import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { SharedService } from "../shared/shared.service";
import { CharClassesResponse } from "../shared/interfaces";
import { sortingFunc } from "../shared/utils";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  constructor(private service: SharedService) {}

  getCookie(name: string) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  ngOnInit() {
    this.service.checkSession().subscribe(
      () => {
        const username = this.getCookie("username");
        this.service.username = username;
        this.service.isLoggedIn = true;
      },
      error => console.log(error.name)
    );
    this.service.fetchClasses().subscribe(
      (data: CharClassesResponse) => {
        this.service.isLoading = false;
        this.service.charClassesList = data.classesList.sort(sortingFunc);
      },
      (error: HttpErrorResponse) => {
        this.service.isLoading = false;
        this.service.isError = true;
        this.service.errorToDisplay = {
          statusText: error.statusText,
          message: error.message
        };
      }
    );
  }

  handleGoToSelectClassClick() {
    this.service.handleGoToSelectClassClick();
  }
}
