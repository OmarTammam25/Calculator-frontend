import { CompilerConfig } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { Config } from './Config';
import { CalculatorService } from './Services/calculator.service';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { retry } from 'rxjs';
import { ViewService } from './Services/view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  deleteIcon = faBackspace;
  title = 'calculator-frontend';

  constructor(public viewService: ViewService){}

}

