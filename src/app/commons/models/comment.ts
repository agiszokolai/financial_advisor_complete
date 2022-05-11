export interface CommentType{
    id?: number,
    categoryId: number,
    amount: number,
    comment: String,
    period: String,
    created?: Date,
    userId: number
}