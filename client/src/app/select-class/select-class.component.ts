import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-select-class",
  templateUrl: "./select-class.component.html",
  styleUrls: ["./select-class.component.scss"]
})
export class SelectClassComponent implements OnInit {
  charClasses: Array<String> = ["Druid", "Ranger"];

  constructor(private service: SharedService) {}

  ngOnInit() {}

  handleShowSpellsClick() {
    this.service.handleShowSpellsClick();
  }
}
