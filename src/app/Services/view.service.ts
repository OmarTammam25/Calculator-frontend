import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { Config } from '../Config';
import { CalculatorService } from './calculator.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  MAX_OPERAND_LENGTH = 16;
  MAX_DELAY = 20;
  isResult: boolean = false;

  leftOperand: string = "";
  rightOperand: string = "";
  operator: string = "";
  expression: string = "";  
  myFunction: string = "";

  config: Config ={
    id: 1,
    expression: '',
    result: 0
  };

  constructor(private calculatorService: CalculatorService) { }

  appendOperand(userOperand: string){
    if(this.isResult) {
      this.clearProperties();
      this.isResult = false;
    }

    if (this.operator.length === 0 && this.leftOperand.length <= this.MAX_OPERAND_LENGTH){
      console.log("size = " + this.leftOperand.length);
      if(this.hasDot(this.leftOperand) && userOperand === ".")
        return;
      this.leftOperand += userOperand;
      console.log(this.leftOperand);
    }else if (this.rightOperand.length <= this.MAX_OPERAND_LENGTH && this.operator.length != 0) {
      if(this.hasDot(this.rightOperand) && userOperand === ".")
        return;
      this.rightOperand += userOperand;
      console.log(this.rightOperand);
    }
  }

  hasDot(myOperand: string){
    if(myOperand.includes("."))
      return true;
    return false;
  }
  
  async setOperator(userOperator: string){
    this.myFunction = "";
    if(this.leftOperand.length === 0) {
        this.leftOperand = '0';  
    }
    if(this.rightOperand.length != 0){
      this.calculate();
      await this.delay(this.MAX_DELAY);
    }
    this.updateOperandsAfterResult();
    this.operator = userOperator;
  }

  
  private updateOperandsAfterResult() {
    if(this.isResult){
      this.leftOperand = this.config.result.toString();
      this.operator = "";
      this.rightOperand = "";
      this.isResult = false;
      console.log(this.config);
    }
  }

  async calculate() {
    this.buildExpression();
    if(this.isValidExpression()){
     /*  this.calculatorService.getRequest(this.expression).subscribe(data => {
        this.config = data;
      }); */
      this.config.result = eval(this.expression);
    this.isResult = true;
    }
  }

  buildExpression(){
    this.expression = this.leftOperand + " " + this.operator + " " + this.rightOperand;
  }
  
  isValidExpression() : boolean{
    if(this.leftOperand.length != 0 && this.operator.length != 0 && this.rightOperand.length != 0)
      return true;
    return false;
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  // for CE button
  clear() {
    this.config = {
      id: this.config.id,
      expression: '',
      result: 0
    }
    this.clearProperties();
  }
  
  // for back button
  eraseRecent() {
    console.log("length = " + this.leftOperand.length);
    if(this.rightOperand.length != 0){
      this.rightOperand = this.rightOperand.slice(0, this.rightOperand.length - 1);
    } else if (this.operator.length != 0) {
      this.operator = ""; 
    }else if(this.leftOperand.length != 0){
      this.leftOperand = this.leftOperand.slice(0, this.leftOperand.length - 1);
    }
  }
  
  clearProperties(){
    this.leftOperand = "";
    this.rightOperand = "";
    this.operator = "";
    this.myFunction = "";
  }
  
  isOperator(operation: string){
    if(operation === '+' || operation === '-' || operation === '*' || operation === '/')
      return true;
    return false;
  }
  
  async inverse(){
    this.updateOperandsAfterResult();
    this.calculate();
    await this.delay(this.MAX_DELAY);
    this.updateOperandsAfterResult();
    /* this.calculatorService.getInverse(this.leftOperand).subscribe(data => {
      this.config = data;
    }); */
    this.config.result = 1 / +this.leftOperand;
    await this.delay(this.MAX_DELAY);
    this.isResult = true;
    this.myFunction = "inverse";
  }
  
  async square(){
    this.updateOperandsAfterResult();
    this.calculate();
    await this.delay(this.MAX_DELAY);
    this.updateOperandsAfterResult();
    /* this.calculatorService.getSquare(this.leftOperand).subscribe(data => {
      this.config = data;
    }); */
    this.config.result = +this.leftOperand * +this.leftOperand;
    await this.delay(this.MAX_DELAY);
    this.isResult = true;
    this.myFunction = "square";
  }
  
  async squareRoot(){
    this.updateOperandsAfterResult();
    this.calculate();
    await this.delay(this.MAX_DELAY);
    this.updateOperandsAfterResult();
    console.log(this.expression);
    /* this.calculatorService.getSquareRoot(this.leftOperand).subscribe(data => {
      this.config = data;
    }); */
    this.config.result = Math.sqrt(+this.leftOperand);
    await this.delay(this.MAX_DELAY);
    this.isResult = true;
    this.myFunction = "sqrt";
  }

  async percent() {
    this.updateOperandsAfterResult();
    this.calculate();
    await this.delay(this.MAX_DELAY);
    this.updateOperandsAfterResult();
    console.log(this.expression);
    /* this.calculatorService.getPercent(this.leftOperand).subscribe(data => {
      this.config = data;
    }); */
    this.config.result = +this.leftOperand / 100.0;
    await this.delay(this.MAX_DELAY);
    this.isResult = true;
    this.myFunction = "percent"  
  }
  
  negate() {
    this.updateOperandsAfterResult();
    let temp = '';
    if(this.leftOperand.length != 0 && this.rightOperand.length === 0){
      temp = this.leftOperand;
    }else if(this.leftOperand.length != 0 && this.rightOperand.length != 0 && this.operator.length != 0) {
      temp = this.rightOperand;
    }
  /*   this.calculatorService.getNegate(temp).subscribe(data => {
      this.config = data;
      if(this.rightOperand.length === 0 && this.operator.length === 0)
        this.leftOperand = this.config.result.toString();
      else if (this.rightOperand.length === 0 && this.operator.length != 0)
        this.rightOperand = this.config.result.toString();
      else
        this.rightOperand = this.config.result.toString();
      }); */
      if(this.rightOperand.length === 0 && this.operator.length === 0){
        this.config.result = -1 * +this.leftOperand;
        this.leftOperand = this.config.result.toString();
      }
      else if (this.rightOperand.length === 0 && this.operator.length != 0){
        this.config.result = -1 * +this.leftOperand;
        this.rightOperand = this.config.result.toString();
      }
      else{
        this.config.result = -1 * +this.rightOperand;
        this.rightOperand = this.config.result.toString();
      }
    
  }

}
