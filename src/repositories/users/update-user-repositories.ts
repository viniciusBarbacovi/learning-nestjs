export abstract class updateUserRepositories { 
    abstract update(id_user: string, name: string, email: string): Promise<any>;
}