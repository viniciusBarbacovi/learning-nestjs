export abstract class loginUserRepositories {
  abstract login(email: string,password: string): Promise<any>;
}


