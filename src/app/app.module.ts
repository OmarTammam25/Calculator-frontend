import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClickerDirective } from './directives/clicker.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewService } from './Services/view.service';
import { CalculatorService } from './Services/calculator.service';
import { OutputComponent } from './Components/output/output.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickerDirective,
    OutputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ViewService, CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
