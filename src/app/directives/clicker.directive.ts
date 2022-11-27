import { KeyedWrite } from '@angular/compiler';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { concat } from 'rxjs';
import { AppComponent } from '../app.component';
import { ViewService } from '../Services/view.service';

@Directive({
  selector: '[appClicker]'
})
export class ClickerDirective {

  constructor(private viewService: ViewService) { }
  
  @HostListener('click', ['$event'])
  onButtonPress(event: any){
    this.viewService.appendOperand(event.target.innerHTML);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent){
    console.log("any button pressed");
    if(this.viewService.isOperator(event.key))
      this.viewService.setOperator(event.key);
    else if(this.validKey(event.key))
      this.viewService.appendOperand(event.key);
  }

  @HostListener('window:keydown.Enter', ['$event'])
  @HostListener('window:keydown.code.Equal', ['$event'])
  equate(event: KeyboardEvent){
    console.log("event equate triggered");
    this.viewService.calculate();
  }

  @HostListener('window:keydown.Backspace')
  eraseRecent(){
    this.viewService.eraseRecent();
  }
  @HostListener('window:keydown.Escape')
  clear(){
    this.viewService.clear();
  }

  validKey(key: string){
    // 0 .. 9
    let code = key.charCodeAt(0);

    if(code >= 48 && code <= 57)
      return true;

    let operators = [42, 43, 45, 46, 47]
    if(operators.includes(code))
      return true
    return false;
  }

}


