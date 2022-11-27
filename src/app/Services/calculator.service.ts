import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../Config';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  configUrl = 'http://localhost:8080';
  constructor(private http:HttpClient) { }
  data: Config[] = [];

  getRequest(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/basic?expression=${expression.replace('+', '%2B').replace('e+', 'E')}`)
  }

  getSquareRoot(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/sqrt?operand=${expression.replace('e+', 'E')}`)
  }
  getSquare(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/square?operand=${expression.replace('e+', 'E')}`)
  }
  getInverse(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/inverse?operand=${expression.replace('e+', 'E')}`)
  }
  getPercent(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/percent?operand=${expression.replace('e+', 'E')}`)
  }
  getNegate(expression: string) {
    return this.http.get<Config>(`${this.configUrl}/negate?operand=${expression.replace('e+', 'E')}`)
  }
}

