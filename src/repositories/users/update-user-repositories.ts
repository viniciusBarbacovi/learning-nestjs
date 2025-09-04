export abstract class updateUserRepositories { 
    abstract update(id_user: string, firstName: string, lastName: string, email: string, password: string): Promise<any>;
}