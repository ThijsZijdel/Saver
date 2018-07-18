import { Component, OnInit } from '@angular/core';
import {MessageService} from "./service_message/message.service";


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  /**
   * Constructor with a connection to the message Service
   * @param {MessageService} messageService, application messages
   * @author: Thijs Zijdel
   */
  constructor(public messageService: MessageService) {}


  ngOnInit() {
  }

}
