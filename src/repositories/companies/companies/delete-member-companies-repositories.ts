export abstract class deleteMemberCompaniesRepositories {
  abstract deleteMember(
    userId: string,
    companyId: string,
    memberId: string,
  ): Promise<any>;
}
