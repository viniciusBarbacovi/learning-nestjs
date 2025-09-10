export abstract class getCompaniesRepositories {
    abstract get(userId: string): Promise<any>;
}