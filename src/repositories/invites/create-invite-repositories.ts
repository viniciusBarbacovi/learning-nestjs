export abstract class createInvitesRepository {
  abstract createInvite(companyId: string): Promise<{ code: string; expiresAt: Date }>;
  abstract checkUserIsOwner(userId: string, companyId: string): Promise<any>;
}
