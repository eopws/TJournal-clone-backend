export class CreateUserDto {
    readonly nickname      : string
    readonly email         : string
    readonly activationLink: string
    readonly password      : string
}
