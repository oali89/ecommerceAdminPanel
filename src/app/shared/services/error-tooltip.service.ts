import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorTooltipService {
  constructor() {}
  GetErrortooltip(Input, ctrlLabel = 'Field') {
    let tooltip = '';

    if (Input?.errors && Input?.touched) {
      if (Input.errors.required) tooltip += `${ctrlLabel} is required \n`;

      if (Input.errors.maxlength) tooltip += `${ctrlLabel} Exceed max Length \n`;

      if (Input.errors.pattern) tooltip += `${ctrlLabel} Invalid Format \n`;

      if (Input.errors.email) tooltip += `${ctrlLabel} Not in Email Format \n`;

      if (Input.errors.maxFileSize) tooltip += `${ctrlLabel} Maximum 5 MB \n`;

      if (Input.errors.ageRange) tooltip += `${ctrlLabel} accept ages between 22 and 100   \n`;

      if (Input.errors.lessThanStartOrignError)
        tooltip += `${ctrlLabel} should be greater than Original Start date \n`;
      if (Input.errors.lessThanOrignError)
        tooltip += `${ctrlLabel} should be greater than Original Schedule End date \n`;
      if (Input.errors.greaterThanOrignError)
        tooltip += `${ctrlLabel} should be less than Original Schedule End date \n`;
    }

    return tooltip;
  }
}
