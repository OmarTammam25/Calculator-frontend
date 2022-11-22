import { KeyedWrite } from '@angular/compiler';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { concat } from 'rxjs';
import { AppComponent } from './app.component';

@Directive({
  selector: '[appClicker]'
})
export class ClickerDirective {

  constructor(private element: ElementRef, private appComponent: AppComponent) { }
  
  @HostListener('click', ['$event'])
  onButtonPress(event: any){
    this.appComponent.appendOperand(event.target.innerHTML);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent){
    console.log("any button pressed");
    if(this.appComponent.isOperator(event.key))
      this.appComponent.setOperator(event.key);
    else if(this.validKey(event.key))
      this.appComponent.appendOperand(event.key);
  }

  @HostListener('window:keydown.Enter', ['$event'])
  @HostListener('window:keydown.code.Equal', ['$event'])
  equate(event: KeyboardEvent){
    console.log("event equate triggered");
    this.appComponent.calculate();
  }

  @HostListener('window:keydown.Backspace')
  eraseRecent(){
    this.appComponent.eraseRecent();
  }
  @HostListener('window:keydown.Escape')
  clear(){
    this.appComponent.clear();
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


