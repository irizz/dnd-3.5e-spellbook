import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface SpellCharClass {
  name: string;
  level: string;
}

interface CharClass {
  id: string;
  name: string;
  level?: string;
}

export interface Spell {
  id: string;
  name: string;
  school: string;
  components?: string;
  castingTime?: string;
  range?: string;
  area?: string;
  target?: string;
  effect?: string;
  duration?: string;
  savingThrow?: string;
  spellResistance?: string;
  materialComponents?: string;
  description: string;
  classes: SpellCharClass[];
}

interface SpellsResponse {
  spellsList: Spell[];
}

interface ResponseError {
  statusText?: string;
  message?: string;
}

interface ClassesResponse {
  classesList: CharClass[];
}

@Injectable({ providedIn: "root" })
export class SharedService {
  constructor(private http: HttpClient) {}

  public isLoading: boolean = true;
  public isError: boolean = false;
  public areSpellsLoaded: boolean = false;
  public spells: Spell[] = [];
  public charClasses: CharClass[] = [];
  public charClass: string = "Wizard";
  public responseError: ResponseError = {};

  fetchSpells(): Observable<SpellsResponse> {
    return this.http.get<SpellsResponse>(
      "http://localhost:8080/api/v1/getSpellsList"
    );
  }

  fetchClasses(): Observable<ClassesResponse> {
    return this.http.get<ClassesResponse>(
      "http://localhost:8080/api/v1/getClassesList"
    );
  }

  handleShowSpellsClick() {
    this.isLoading = true;

    this.fetchSpells().subscribe(
      data => {
        this.spells = data.spellsList;
        this.isLoading = false;
        this.areSpellsLoaded = true;
      },
      error => {
        this.isLoading = false;
        this.isError = true;
        this.responseError = {
          statusText: error.statusText,
          message: error.message
        };
      }
    );
  }

  handleGoToSelectClassClick() {
    this.areSpellsLoaded = false;
  }
}
