import { Post } from "src/posts/schemas/posts.schema"
import { Comment } from "../schemas/comments.schema"

export class CreateCommentDto {
    readonly post: Post
    readonly parent?: Comment
    readonly content: string
}
