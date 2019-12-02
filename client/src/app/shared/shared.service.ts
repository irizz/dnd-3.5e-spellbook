import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SharedService {

  isLoading: boolean = false;
  isError: boolean = false;
  areSpellsLoaded: boolean = true;

  constructor() {}

  handleShowSpellsClick() {
    this.areSpellsLoaded = true;
  }

  handleGoToSelectClassClick() {
    this.areSpellsLoaded = false;
  }
}