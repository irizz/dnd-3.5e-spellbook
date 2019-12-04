import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  constructor(private service: SharedService) {}

  ngOnInit() {
    this.service.fetchClasses().subscribe(
      data => {
        this.service.isLoading = false;
        this.service.charClasses = data.classesList.sort((a, b) => a.name > b.name ? 1 : -1);
      },
      error => {
        this.service.isLoading = false;
        this.service.isError = true;
        this.service.responseError = {
          statusText: error.statusText,
          message: error.message
        };
      }
    );
  }
}
