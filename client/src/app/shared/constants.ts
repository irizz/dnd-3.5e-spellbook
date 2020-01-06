import { HttpHeaders } from "@angular/common/http";

export const SERVER_URL = "https://127.0.0.1:443";
export const API_URL = `${SERVER_URL}/api/v1`;

export const SORTING_OPTIONS = {
  BY_LEVEL: "By level",
  BY_SCHOOL: "By school"
};

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("user:password")
  })
};

export const MIN_LOGIN_LENGTH = 4;
export const MIN_PASSWORD_LENGTH = MIN_LOGIN_LENGTH;
export const MAX_LOGIN_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = MAX_LOGIN_LENGTH;
export const LOGIN_PATTERN = "^[a-zA-Z0-9._]+$";
export const PASSWORD_PATTERN = "^[a-zA-Z0-9!@#$%^&*]+$";
