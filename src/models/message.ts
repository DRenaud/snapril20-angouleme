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

/**
 * @description Méthode pour vérifier si le message possède une image
 * @param {Message} message
 * @returns {message is MessageWithPicture}
 */
export const isMessageWithPicture = (
    message: Message
): message is MessageWithPicture => {
    return !!(message as MessageWithPicture)?.picture;
};

/**
 * @description  Méthode pour vérifier si le message possède un contenu
 * @param {Message} message
 * @returns {message is MessageWithContent}
 */
export const isMessageWithContent = (
    message: Message
): message is MessageWithContent => {
    return !!(message as MessageWithContent)?.content;
};
