import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(    public messageService: MessageService,
    ) { }
  showMessage(severity = 'success', content) {
    this.messageService.add({ severity: severity, summary: severity, detail: content, life: 5000 });
  }
}
