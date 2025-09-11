export abstract class joinInviteCompaniesRepositories {
    abstract findByCode(inviteCode: string): Promise<any>;
    abstract addMember(userId: string, companyId: string): Promise<any>;
}