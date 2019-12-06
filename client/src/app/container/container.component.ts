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

  ngOnInit() {
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
