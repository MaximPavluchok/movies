export interface IRegister {
    firstName:string;
    lastName:string;
    email: string;
    password: string;
    confirmPassword:string;
    image: File | null;
}

export interface ILogin {
    email: string;
    password: string;
  }
  
  export interface ILoginResult {
    token: string;
  }
  