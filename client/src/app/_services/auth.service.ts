import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class AuthService {

  getTokenInformation() {
    const token = localStorage.getItem('currentUser');
    if (token) {
      const payloadBase64 = JSON.parse(token).token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payloadObject = JSON.parse(payloadJson);
      return payloadObject
    }
  }

  getTokenId() {
    return this.getTokenInformation()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
  }

  getTokenRole() {
    return this.getTokenInformation()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }

  getTokenName() {
    console.log(this.getTokenInformation()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
    return this.getTokenInformation()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
  }
  encode(id: string) {
    const maxNumber = 99; // Maximum number that can be generated
    const minNumber = 10; // Minimum number that can be generated

    // Split the ID string into two parts of equal length
    const halfLength = Math.ceil(id.length / 2);
    const firstHalf = id.substring(0, halfLength);
    const secondHalf = id.substring(halfLength);

    // Generate two random numbers between 10 and 99
    const randomNumber1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    const randomNumber2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    // Calculate the sum of the two random numbers
    const sum = randomNumber1 + randomNumber2;

    // Construct the encoded string
    let encodedString = `${randomNumber1}-${firstHalf}-${randomNumber2}-${secondHalf}-${sum}`;
    encodedString = btoa(encodedString)
    return encodedString;
  }

  decode(encodedString: string) {
    encodedString = atob(encodedString)
    const randomNumber1 = Number(encodedString.split("-")[0]);
    const firstHalf = encodedString.split("-")[1];
    const randomNumber2 = Number(encodedString.split("-")[2]);
    const secondHalf = encodedString.split("-")[3];
    const sum = Number(encodedString.split("-")[4]);

    const id = `${firstHalf}${secondHalf}`;

    // Verify that the sum is equal to the sum of the two random numbers
    if (sum !== randomNumber1 + randomNumber2) {
      throw new Error("Invalid encoded string: sum mismatch");
    }

    return id;
  }
}
