export abstract class listInvitesRepository {
  abstract listInvite(userId: string, companyId: string): Promise<any>;
}
