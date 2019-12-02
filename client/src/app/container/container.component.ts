import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  constructor(private service: SharedService) {}

  ngOnInit() {}
}
