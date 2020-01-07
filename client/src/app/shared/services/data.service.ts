import { Injectable } from "@angular/core";
import { CharClass, Spell } from "../interfaces";

@Injectable({ providedIn: "root" })
export class DataService {
  public charClassesList: CharClass[] = [];
  public spellsList: Spell[] = [];
  public username: string = "";
  public charClassName: string = "";

  clearData() {
    this.charClassName = "";
    this.spellsList = [];
  }

  clearUsername() {
    this.username = ""
  }

  setCharClassName(selectedClassId: string) {
    this.charClassName = this.charClassesList.find(
      item => item.id === selectedClassId
    ).name;
  }

  setUsername(username: string) {
    this.username = username;
  }
}
