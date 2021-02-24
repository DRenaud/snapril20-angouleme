import { User } from './user';

export type Message = MessageWithContent | MessageWithPicture;

export interface MessageWithContent {
    content: string;
    user: User;
    date: number;
}

export interface MessageWithPicture {
    picture: string;
    user: User;
    date: number;
}

export const isMessageWithPicture = (
    message: Message
): message is MessageWithPicture => {
    return !!(message as MessageWithPicture)?.picture;
};

export const isMessageWithContent = (
    message: Message
): message is MessageWithContent => {
    return !!(message as MessageWithContent)?.content;
};
