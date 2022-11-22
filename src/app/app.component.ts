import { CompilerConfig } from '@angular/compiler';
import { Component } from '@angular/core';
import { Config } from './api';
import { CalculatorService } from './calculator.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator-frontend';
  MAX_OPERAND_LENGTH = 19;
  /* result: string = ""; */
  leftOperand: string = "";
  rightOperand: string = "";
  operator: string = "";
  expression: string = "";
  
  config: Config ={
    id: 1,
    expression: '',
    result: 0
  }
  isResult: boolean = false;

  constructor(private calculatorService: CalculatorService){}

  isOperator(operation: string){
    if(operation === '+' || operation === '-' || operation === '*' || operation === '/')
      return true;
    return false;
  }
  /*
  concatenate(operation: string) {
    if(this.isMaxLength(this.expression)){
      return;
    }
    if(this.isOperator(operation)) {
      if(this.isOperator(this.expression.charAt(this.expression.length - 2))){
        this.eraseRecent();
      }
      this.expression += " ";
      this.expression += operation;
      this.expression += " ";
    }else{
      if(this.isResult){
        this.expression = "";
      }
      this.expression += operation;
    }
    this.isResult = false;
    this.config.expression = this.expression;
    console.log(this.expression);
  } */
  
  appendOperand(userOperand: string){
    if(this.isResult) {
      this.clearProperties();
      this.isResult = false;
    }
    if (this.operator.length === 0 && this.leftOperand.length <= this.MAX_OPERAND_LENGTH){
      this.leftOperand += userOperand;
      console.log(this.leftOperand);
    }else if (this.rightOperand.length <= this.MAX_OPERAND_LENGTH) {
      this.rightOperand += userOperand;
      console.log(this.rightOperand);
    }
  }

  async setOperator(userOperator: string){
    // TODO return error
    if(this.leftOperand.length === 0) {
      this.leftOperand = '0';
    }
    if(this.rightOperand.length != 0){
      this.calculate();
      await this.delay(20);
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

  // gets result
  async calculate() {
    this.buildExpression();
    if(this.isValidExpression()){
      this.calculatorService.getRequest(this.expression).subscribe(data => {
        this.config = data;
      });

    this.isResult = true;
    }
  }

  buildExpression(){
    this.expression = this.leftOperand + " " + this.operator + " " + this.rightOperand;
  }

  isValidExpression() : boolean{
    /* let oneOperator: boolean = false;
    for(let i = 0; i < this.expression.length; i++){
      if(oneOperator && this.expression.charAt(i) != " ")
        return true;

      if(this.isOperator(this.expression.charAt(i)))
          oneOperator = true;
    } */
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
  
  clearProperties(){
    this.leftOperand = "";
    this.rightOperand = "";
    this.operator = "";
  }
  // for back button
  eraseRecent() {
    /* if(this.expression.charAt(this.expression.length-1) === ' ' || this.isOperator(this.expression.charAt(this.expression.length-1))){
      this.expression = this.expression.slice(0, this.expression.length - 3);
      console.log(this.expression);
    }else{
      this.expression = this.expression.slice(0, this.expression.length -1) ;
    }
    this.config.expression = this.expression;
    this.isResult = false; */
    console.log("length = " + this.leftOperand.length);
    if(this.rightOperand.length != 0){
      this.rightOperand = this.rightOperand.slice(0, this.rightOperand.length - 1);
    } else if (this.operator.length != 0) {
      this.operator = ""; 
    }else if(this.leftOperand.length != 0){
      this.leftOperand = this.leftOperand.slice(0, this.leftOperand.length - 1);
    }
  }

  async inverse(){
    this.updateOperandsAfterResult();
    this.calculate();
    await this.delay(50);
    this.updateOperandsAfterResult();
    this.calculatorService.getInverse(this.leftOperand).subscribe(data => {
      this.config = data;
    });
    await this.delay(50);
    this.isResult = true;
  }
  
  async square(){
    this.updateOperandsAfterResult();
    this.calculate();
    await this.delay(50);
    this.updateOperandsAfterResult();
    this.calculatorService.getSquare(this.leftOperand).subscribe(data => {
      this.config = data;
    });
    await this.delay(50);
    this.isResult = true;
  }
  
  async squareRoot(){
    this.updateOperandsAfterResult();
    this.calculate();
    await this.delay(50);
    this.updateOperandsAfterResult();
    console.log(this.expression);
    this.calculatorService.getSquareRoot(this.leftOperand).subscribe(data => {
      this.config = data;
    });
    await this.delay(50);
    this.isResult = true;
  }

}

