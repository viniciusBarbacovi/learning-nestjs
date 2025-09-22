export abstract class createInvitesRepository {
  abstract createInvite(userId: string, companyId: string): Promise<any>;
}
