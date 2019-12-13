import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  CharClass,
  CharClassesResponse,
  Spell,
  SpellsResponse,
  ErrorToDisplay
} from "./interfaces";
import { API_URL, HTTP_OPTIONS } from "./constants";

@Injectable({ providedIn: "root" })
export class SharedService {
  constructor(private http: HttpClient) { }

  // variables responsible for components rendering
  public areSpellsLoaded: boolean = false;
  public isError: boolean = false;
  public isLoading: boolean = true;
  // variables for storing response data
  public charClassesList: CharClass[] = [];
  public spellsList: Spell[] = [];
  // other
  public charClassName: string = "";
  public errorToDisplay: ErrorToDisplay = {};
  public isFavoritesMode: boolean = false;

  fetchClasses(): Observable<CharClassesResponse> {
    return this.http.get<CharClassesResponse>(`${API_URL}/getClassesList`, HTTP_OPTIONS);
  }

  fetchSpells(selectedClassId: string): Observable<SpellsResponse> {
    return this.http.get<SpellsResponse>(
      `${API_URL}/getSpellsListByClass?classId=${selectedClassId}`,
      HTTP_OPTIONS
    );
  }

  handleShowSpellsClick(selectedClassId: string) {
    this.isLoading = true;
    this.fetchSpells(selectedClassId).subscribe(
      (data: SpellsResponse) => {
        this.spellsList = data.spellsList;
        if (this.spellsList.length > 0) {
          this.isLoading = false;
          this.areSpellsLoaded = true;
        } else {
          this.errorToDisplay = {
            message: `Spells for ${this.charClassName} were not uploaded yet`
          };
          this.isLoading = false;
          this.isError = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.errorToDisplay = {
          statusText: error.statusText,
          message: error.message
        };
        this.isLoading = false;
        this.isError = true;
      }
    );
  }

  handleGoToSelectClassClick() {
    this.areSpellsLoaded = false;
    this.isError = false;
    this.isFavoritesMode = false;
    this.charClassName = "";
  }
}
