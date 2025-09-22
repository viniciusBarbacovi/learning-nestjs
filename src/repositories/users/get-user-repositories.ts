export abstract class getUserRepositories {
  abstract getUser(userId: string): Promise<any>;
}
