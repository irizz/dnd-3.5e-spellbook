import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../constants";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  public isLoggedIn: boolean = false;
  public isAgreedToCookies: boolean = false;
  public username: string = "";

  hideLogin() {
    this.isLoggedIn = false;
  }

  showLogin() {
    this.isLoggedIn = true;
  }

  clearUsername() {
    this.username = ""
  }

  setUsername(username: string) {
    this.username = username;
  }

  setIsAgreedToCookiesConsent() {
    this.isAgreedToCookies = true;
  }

  checkSession() {
    return this.http.get(`${API_URL}/checkSession`, { withCredentials: true });
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
}
