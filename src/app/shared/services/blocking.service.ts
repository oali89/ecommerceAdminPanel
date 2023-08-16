import { Inject, Injectable, ViewChild } from '@angular/core';
import { BlockUI } from 'primeng/blockui';

@Injectable({
  providedIn: 'root'
})
export class BlockingService {
  
  @ViewChild(BlockUI, { static: false, read: BlockUI }) blockUIChild: BlockUI;
  show() {
    this.blockUIChild.block();
    // const blockUI = document.getElementsByTagName('p-blockUI')[0];
    
    // if (blockUI) {
     
    //   blockUI.classList .add('d-block');
    // }
  }

  hide() {
    this.blockUIChild.unblock();

    // const blockUI = document.getElementsByTagName('p-blockUI')[0];
    // if (blockUI) {
    //   blockUI.classList .add('d-none');
    // }
  }
}
