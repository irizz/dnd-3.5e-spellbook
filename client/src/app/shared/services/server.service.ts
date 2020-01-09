import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CharClassesResponse, SpellsResponse } from "../interfaces";
import { API_URL } from "../constants";

@Injectable({ providedIn: "root" })
export class ServerService {
  constructor(private http: HttpClient) {}

  getHttpOptions(login: string, password: string) {
    const authData = `${login}:${password}`;
    const encodedAuthData = btoa(authData);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Basic " + encodedAuthData
      }),
      withCredentials: true
    };
    return httpOptions;
  }

  checkSession() {
    return this.http.get(`${API_URL}/checkSession`, { withCredentials: true });
  }

  fetchClasses(): Observable<CharClassesResponse> {
    return this.http.get<CharClassesResponse>(`${API_URL}/getClassesList`);
  }

  fetchSpells(selectedClassId: string): Observable<SpellsResponse> {
    return this.http.get<SpellsResponse>(
      `${API_URL}/getSpellsListByClass?classId=${selectedClassId}`
    );
  }

  sendLoginRequest(login: string, password: string) {
    return this.http.get(
      `${API_URL}/login`,
      this.getHttpOptions(login, password)
    );
  }

  sendLogoutRequest() {
    return this.http.get(`${API_URL}/logout`, { withCredentials: true });
  }

  sendSignupRequest(login: string, password: string) {
    return this.http.post(`${API_URL}/registration`, {
      login,
      password
    });
  }
}
