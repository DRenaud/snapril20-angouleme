import { useEffect, useRef, useState } from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
} from '@ionic/react';
import './Home.css';
import MessageListItem from '../../components/MessageListItem/MessageListItem';
import firebase from 'firebase';
import { Redirect } from 'react-router';
import { Message, MessageWithContent } from '../../models/message';
import { User } from '../../models/user';

const Home: React.FC = () => {
    const refMessages = firebase.database().ref('messages');

    const [messages, setMessages] = useState<Message[]>([]);

    const [newTextMessage, setNewTextMessage] = useState('');
    const [currentUser, setCurrentUser] = useState<User>();

    /**
     * @description Fonction utilitaire pour faire déscendre la liste
     */
    const scrollToBottom = () => {
        let list = document.querySelector('ion-content');
        list?.scrollToBottom();
    };

    // Enregistrement aux changement de la base
    useEffect(() => {
        const register = async () => {
            // On récupére tous les messages
            refMessages.on('value', (messagesSnapshot) => {
                const initialMessages: Message[] = [];
                // On parcourt chaque noeud de messages (/messages/:id)
                messagesSnapshot.forEach((messageSnapshot) => {
                    // et on l'ajoute dans la liste
                    initialMessages.push(messageSnapshot.val());
                });
                setMessages(initialMessages);
                scrollToBottom();
            });
            if (firebase.auth().currentUser) {
                // On récupére l'utilisateur courant dans la base pour avoir son username
                await firebase
                    .database()
                    .ref('users/' + firebase.auth().currentUser!.uid)
                    .once('value', (snapshot) => {
                        setCurrentUser(snapshot.val());
                    });
            }
        };

        register();
        // Nettoayage de l'abonneemnt, sinon on reçoit les données même si on est sur une autre page
        return () => {
            refMessages.off();
        };
    }, [refMessages]);

    const logout = async () => {
        await firebase.auth().signOut();
        setMessages([]);
    };

    const sendMessageWithContent = async () => {
        if (currentUser) {
            const newMessage: MessageWithContent = {
                content: newTextMessage,
                date: Date.now(),
                user: currentUser,
            };
            await firebase.database().ref('messages').push(newMessage);
            setNewTextMessage('');
        }
    };

    if (!firebase.auth().currentUser) {
        return <Redirect to="/login"></Redirect>;
    }

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inbox</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={logout}>Se déconnecter</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Inbox</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList className="list">
                    {messages.map((m) => (
                        <MessageListItem key={m.date} message={m} />
                    ))}
                </IonList>
            </IonContent>
            <IonFooter>
                <IonTextarea
                    rows={6}
                    cols={20}
                    value={newTextMessage}
                    onIonChange={(e) => setNewTextMessage(e.detail.value!)}
                ></IonTextarea>
                <IonButton onClick={sendMessageWithContent}>Envoyer</IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default Home;
