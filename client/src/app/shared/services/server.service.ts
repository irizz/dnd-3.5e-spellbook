import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CharClassesResponse, SpellsResponse } from "../interfaces";
import { API_URL } from "../constants";

@Injectable({ providedIn: "root" })
export class ServerService {
  constructor(private http: HttpClient) {}

  fetchClasses(): Observable<CharClassesResponse> {
    return this.http.get<CharClassesResponse>(`${API_URL}/getClassesList`);
  }

  fetchSpells(selectedClassId: string): Observable<SpellsResponse> {
    return this.http.get<SpellsResponse>(
      `${API_URL}/getSpellsListByClass?classId=${selectedClassId}`
    );
  }

  fetchFavoriteSpellsList(classId: string) {
    return this.http.get<SpellsResponse>(
      `${API_URL}/getFavoriteSpellsList?classId=${classId}`,
      { withCredentials: true }
    );
  }

  sendAddFavoriteSpellRequest(spellId: string, classId: string) {
    return this.http.post(
      `${API_URL}/addFavoriteSpell`,
      {
        id: spellId,
        classId: classId
      },
      { withCredentials: true }
    );
  }

  sendRemoveFavoriteSpellRequest(spellId: string, classId: string) {
    return this.http.post(
      `${API_URL}/removeFavoriteSpell`,
      {
        id: spellId,
        classId: classId
      },
      { withCredentials: true }
    );
  }
}
