export class User {
  constructor(
    public email: string,
    public username: string,
    public password: string,
    public confirmPassword: string,
    public gender: 'male' | 'female' ,
    public id?: number | any, 
    public image?: string,
    public role: 'admin' | 'user' = 'user', 
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
export class Auth {
  constructor(public message: string, public token: string, public user: any) {}
}
 export class Login{
    constructor( public email: string, public password: string){}
  }