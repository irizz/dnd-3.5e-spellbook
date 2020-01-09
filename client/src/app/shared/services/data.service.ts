import { Injectable } from "@angular/core";
import { CharClass, Spell } from "../interfaces";

@Injectable({ providedIn: "root" })
export class DataService {
  public charClassesList: CharClass[] = [];
  public spellsList: Spell[] = [];
  public charClassName: string = "";

  clearData() {
    this.charClassName = "";
    this.spellsList = [];
  }

  setCharClassName(selectedClassId: string) {
    this.charClassName = this.charClassesList.find(
      item => item.id === selectedClassId
    ).name;
  }
}
