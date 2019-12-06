import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";
import { ErrorToDisplay } from "../shared/interfaces";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
  constructor(private service: SharedService) {}

  errorToDisplay: ErrorToDisplay = {};

  ngOnInit() {
    this.errorToDisplay = this.service.errorToDisplay;
  }

  refreshPage() {
    document.location.reload(true);
  }
}
