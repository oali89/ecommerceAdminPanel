import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MenuNavFunction, navbarData } from './nav-data';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
export interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [DialogService]
})
export class SidenavComponent implements OnInit {

  collapsed = false;
  navData = navbarData;
  screenWidth = 0;
  ref: DynamicDialogRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })

    }
  }

  constructor(public dialogService: DialogService,
  ) {

  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter<sideNavToggle>();
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }
  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })

  }
  ExcuteNav(fun: MenuNavFunction) {
    switch (fun) {
      case MenuNavFunction.AddProvider:
        //        this.Providertabs()
        break;
      default:
        break
    }
  }


}
