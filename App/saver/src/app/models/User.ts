export class User {
  id: number;
  name: string;
  surname: string;
  password: string;
  email: string;

  constructor(id: number, name: string, surname: string, password: string, email: string,) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.email = email;

  }
}
