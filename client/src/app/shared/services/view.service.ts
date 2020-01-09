import { Injectable } from "@angular/core";
import { ErrorToDisplay } from "../interfaces";

@Injectable({ providedIn: "root" })
export class ViewService {
  constructor() {}

  public areSpellsLoaded: boolean = false;
  public isLoading: boolean = true;
  public isError: boolean = false;
  public isFavoritesMode: boolean = false;
  public errorToDisplay: ErrorToDisplay = {};

  clearView() {
    this.areSpellsLoaded = false;
    this.isError = false;
    this.isLoading = false;
    this.isFavoritesMode = false;
  }

  showError(error: ErrorToDisplay) {
    this.errorToDisplay = error;
    this.isError = true;
  }

  showSpells() {
    this.areSpellsLoaded = true;
  }

  startLoader() {
    this.isLoading = true;
  }

  stopLoader() {
    this.isLoading = false;
  }
}
