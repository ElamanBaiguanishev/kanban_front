import { IUser } from "./types"


export interface IChat {
    id: number
    name: string
    user: IUser[]
    messages: IMessage[]
}

export interface IMessage {
    id: number

    senderId: number
    sender: IUser

    chatId: number
    chat: IChat

    content: string

    createdAt: Date
}

export interface IChatUser {
    userId: number
    user: IUser

    chatId: number
    chat: IChat
}