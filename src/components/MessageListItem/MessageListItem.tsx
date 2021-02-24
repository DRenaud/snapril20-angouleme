import { IonItem, IonLabel, IonNote } from '@ionic/react';
import {
    Message,
    isMessageWithContent,
    isMessageWithPicture,
} from '../../models/message';
import './MessageListItem.css';

interface MessageListItemProps {
    message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
    let messageContent = <></>;
    const date = new Date(message.date).toLocaleDateString()

    if (isMessageWithContent(message)) {
        messageContent = <p>{message.content}</p>;
    } else if (isMessageWithPicture(message)) {
        messageContent = (
            <img
                src={message.picture}
                alt={`Pris par ${message.user?.username}`}
            ></img>
        );
    }

    return (
        <IonItem>
            <div slot="start" className="dot dot-unread"></div>
            <IonLabel className="ion-text-wrap">
                <h2>
                    {message.user.username}
                    <span className="date">
                        <IonNote>{date}</IonNote>
                    </span>
                </h2>
                {messageContent}
            </IonLabel>
        </IonItem>
    );
};

export default MessageListItem;
