export abstract class deleteInvitesRepository {
  abstract deleteInvite(
    userId: string,
    companyId: string,
    inviteId: string,
  ): Promise<any>;
}
