import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
  constructor(private service: SharedService) {}

  responseError = {};

  ngOnInit() {
    this.responseError = this.service.responseError;
  }

  refreshPage() {
    document.location.reload(true);
  }
}
