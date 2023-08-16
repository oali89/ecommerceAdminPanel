import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor(private router: Router) {

  }

  getFirstChars(Name) {
    let firstTwoLetters = '';
    if (Name != null) {
      const spaceIndex = Name.indexOf(' ');
      if (spaceIndex === -1) {
        firstTwoLetters = Name.substring(0, 2);
      } else {
        firstTwoLetters =
          Name.substring(0, 1) + Name.substring(spaceIndex + 1, spaceIndex + 2);
      }
    }
    return firstTwoLetters;
  }
}
