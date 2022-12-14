import { Component, Input, OnInit, Output } from '@angular/core';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  @Input() displayText?: string;
  @Input() result: number = 0; 
  @Input() myFunction: string = '';

  constructor() { }
  ngOnInit(): void {
    this.result = 0;
  }

  

}
