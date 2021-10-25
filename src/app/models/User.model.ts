import { Role } from '../interfaces/Role.interface';

export class User {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public role: Role
  ) {}
}
