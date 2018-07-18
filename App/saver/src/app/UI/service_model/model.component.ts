import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from "jquery"
import {ModelService} from "./model.service";


  // templateUrl: './spending.component.html',

@Component({
  selector: 'modal',
  template: '<ng-content></ng-content>',
  styleUrls: ['./model.component.css']
})

export class ModelComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: JQuery;
  private el;

  constructor(private modelService: ModelService, private els: ElementRef) {
    this.element = $(els.nativeElement);
    this.el = els.nativeElement;
  }

  ngOnInit(): void {
    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    $(this.el).appendTo('body');

    // close modal on background click
    $(this.el).on('click', function (e: any) {
      var target = $(e.target);
      if (!target.closest('.modal-body').length) {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modelService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modelService.remove(this.id);
    this.el.remove();
  }

  // open modal
  open(): void {
    this.el.show();
    $('body').addClass('modal-open');
  }

  // close modal
  close(): void {
    this.el.hide();
    $('body').removeClass('modal-open');
  }
}
