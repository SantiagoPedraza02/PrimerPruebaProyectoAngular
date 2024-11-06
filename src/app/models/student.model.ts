export class Student {
    id: number;
    jobTitle:string;
    firstName: string;
    lastName: string;
    emailAdress: string;
  
    constructor(id: number, jobTitle: string, firstName: string, lastName: string, emailAdress:string) {
      this.id = id;
      this.jobTitle= jobTitle;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAdress = emailAdress;
    }
  }
  