import { User } from "src/users/schemas/users.schema";

export interface GetAllQuery {
    author?: User
    isDraft?: boolean
    views?: number
    likers?: number
}
