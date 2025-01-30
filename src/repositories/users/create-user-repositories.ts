export abstract class createUserRepositories { //abstract porq o nest não consegue automatizar a injeção de dependencias usando o interface, pq n tem interface no javascript, só no type

    abstract create(name: string, email: string): Promise<any>;

}   