export abstract class deleteCompanyRepository {
  abstract deleteCompany(userId: string, companyId: string): Promise<any>;
}
