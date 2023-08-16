import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { sideNavToggle } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor() { }
  isSidenavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: sideNavToggle) {
    this.isSidenavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.isSidenavCollapsed && this.screenWidth > 768) {
      styleClass = 'content-trimmed';
    } else if (this.isSidenavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'content-md-screen';
    }
    return styleClass;
  }
}
