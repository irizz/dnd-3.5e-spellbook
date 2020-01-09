import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { DataService } from "../shared/services/data.service";
import { ServerService } from "../shared/services/server.service";
import { ViewService } from "../shared/services/view.service";
import { CharClass, SpellsResponse } from "../shared/interfaces";

@Component({
  selector: "app-select-class",
  templateUrl: "./select-class.component.html",
  styleUrls: ["./select-class.component.scss"]
})
export class SelectClassComponent implements OnInit {
  constructor(
    private data: DataService,
    private server: ServerService,
    private view: ViewService
  ) {}

  charClassesList: CharClass[] = this.data.charClassesList;
  selectedClassId: string;

  ngOnInit() {}

  handleShowSpellsClick() {
    this.view.startLoader();
    this.server.fetchSpells(this.selectedClassId).subscribe(
      (reponse: SpellsResponse) => {
        this.data.spellsList = reponse.spellsList;
        if (this.data.spellsList.length > 0) {
          this.view.stopLoader();
          this.view.showSpells();
        } else {
          const message = `Spells for ${this.data.charClassName} were not uploaded yet`;
          this.view.stopLoader();
          this.view.showError({ message: message });
        }
      },
      (error: HttpErrorResponse) => {
        this.view.stopLoader();
        this.view.showError({
          statusText: error.statusText,
          message: error.message
        });
      }
    );
    this.data.setCharClassName(this.selectedClassId);
  }
}
