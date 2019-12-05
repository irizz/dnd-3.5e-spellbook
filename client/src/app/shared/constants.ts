import { HttpHeaders } from "@angular/common/http";

const SERVER_URL = "http://localhost:8080";
export const API_URL = `${SERVER_URL}/api/v1`;

export const SORTING_OPTIONS = {
  BY_LEVEL: "By level",
  BY_SCHOOL: "By school"
};

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('user:password')
  })
};