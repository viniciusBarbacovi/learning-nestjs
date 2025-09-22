export abstract class joinInviteCompaniesRepositories {
  abstract joinInvite(userId: string, companyId: string): Promise<any>;
}
