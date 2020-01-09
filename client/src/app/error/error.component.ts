import { Component, OnInit } from "@angular/core";
import { ViewService } from "../shared/services/view.service";
import { ErrorToDisplay } from "../shared/interfaces";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
  constructor(private view: ViewService) {}

  errorToDisplay: ErrorToDisplay = {};

  ngOnInit() {
    this.errorToDisplay = this.view.errorToDisplay;
  }

  refreshPage() {
    document.location.reload(true);
  }
}
