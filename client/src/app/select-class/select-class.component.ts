import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";
import { CharClass } from "../shared/interfaces";

@Component({
  selector: "app-select-class",
  templateUrl: "./select-class.component.html",
  styleUrls: ["./select-class.component.scss"]
})
export class SelectClassComponent implements OnInit {
  constructor(private service: SharedService) {}

  charClassesList: CharClass[] = this.service.charClassesList;
  selectedClassId: string;

  ngOnInit() {}

  handleShowSpellsClick() {
    this.service.handleShowSpellsClick(this.selectedClassId);
    this.service.charClassName = this.service.charClassesList.find(
      item => item.id === this.selectedClassId
    ).name;
  }
}
