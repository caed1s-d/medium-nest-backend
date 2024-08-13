export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly bio: string;
  readonly image: string;
  readonly token: string;
}
