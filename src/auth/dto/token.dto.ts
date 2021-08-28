import { User } from "src/users/schemas/users.schema"

export class TokenDto {
    readonly user        : User
    readonly refreshToken: string
}
