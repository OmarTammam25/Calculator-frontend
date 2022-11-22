import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './api';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  configUrl = 'http://localhost:8080';
  constructor(private http:HttpClient) { }
  data: Config[] = [];

  getRequest(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/basic?expression=${expression.replace('+', '%2B')}`)
  }
  getSquareRoot(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/sqrt?operand=${expression}`)
  }
  getSquare(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/square?operand=${expression}`)
  }
  getInverse(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/inverse?operand=${expression}`)
  }

  
}
