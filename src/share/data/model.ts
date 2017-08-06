export interface User {
  email: string;
  password: string;
  site: string;
}

export interface Period {
  startDate: Date;
  endDate: Date;
}

export interface Guardian {
  name: string;
  photo: string;
  email: string;
}

export class Student {
  name: string = "Full name";
  roomNo: string = "";
  photo: string = "101";
  university: string = "UQ";
  phone: string = "123-456-7890";
  email: string = "abc@email.com";
  startDate: Date = new Date();
  endDate: Date = new Date();
  dateOfBirth: Date = new Date();
  holidayPeriods: Period[] = [];
  comments: string = "";
  guardianName: string = "Guardian name";
  guardianPhone: string = "123-456-7890";
  guardianEmail: string = "abc@email.com";
  status: string = "active";
}
