import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CookieService {
  deleteCookie(name: string) {
    this.setCookie(name, "", {
      "max-age": -1
    });
  }

  getCookie(name: string) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  setCookie(name: string, value: string, options = {}) {
    options = {
      path: "/"
    };
    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
}
