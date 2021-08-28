import { User } from "src/users/schemas/users.schema"

export class CreatePostDto {
    readonly author: User
    readonly header: string
    readonly content: string
    readonly isDraft: boolean
}
