import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeStorageService {
  verifycode: string | undefined 
  constructor() { }

  assignCode(code: string){
    this.verifycode = code;
  }
}
