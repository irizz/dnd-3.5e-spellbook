import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-select-class",
  templateUrl: "./select-class.component.html",
  styleUrls: ["./select-class.component.scss"]
})
export class SelectClassComponent implements OnInit {
  constructor(private service: SharedService) {}

  charClasses = this.service.charClasses;

  ngOnInit() {
  }

  handleShowSpellsClick() {
    this.service.handleShowSpellsClick();
  }
}
