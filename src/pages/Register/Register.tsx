import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToast,
    IonToolbar,
} from '@ionic/react';
import firebase from 'firebase';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { User } from '../../models/user';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [showToastError, setShowToastError] = useState(false);
    const [toastErrorMessage, setToastErrorMessage] = useState('');

    const register = async () => {
        try {
            // On inscrit l'utilisateur
            const credential = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            const newUser: User = {
                email,
                username,
            };

            // On le stock en base pour stocker son nom d'utilisateur
            await firebase
                .database()
                .ref('users/' + credential.user?.uid)
                .set(newUser);

            // On nettoie
            setEmail('');
            setPassword('');
            setUsername('');

        } catch (error) {
            // Si il y'a une erreur, on l'affiche dans petit toast rouge
            setToastErrorMessage(error.message);
            setShowToastError(true);
        }
    };

    if (firebase.auth().currentUser) {
        return <Redirect to="/home"></Redirect>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>{' '}
                    <IonTitle>S'inscrire</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonToast
                    isOpen={showToastError}
                    onDidDismiss={() => {
                        setShowToastError(false);
                        setToastErrorMessage('');
                    }}
                    message={toastErrorMessage}
                    duration={2000}
                    color="danger"
                />
                <IonItem>
                    <IonLabel>Nom d'utilisateur</IonLabel>
                    <IonInput
                        value={username}
                        onIonChange={(e) => setUsername(e.detail.value!)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel>Email</IonLabel>
                    <IonInput
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel>Mot de passe</IonLabel>
                    <IonInput
                        type="password"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                </IonItem>
                <IonItem>
                    <IonButton onClick={register}>S'inscrire</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Register;
