export abstract class getCompaniesMembersRepositories {
  abstract getMembers(userId: string, companyId: string): Promise<any>;
}
