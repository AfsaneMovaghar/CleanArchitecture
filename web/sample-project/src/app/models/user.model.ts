export enum Gender {
    Male = 1,
    Female = 2,
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    address: string;
    gender: Gender;
  }