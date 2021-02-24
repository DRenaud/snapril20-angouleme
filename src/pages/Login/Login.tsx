import {
    IonButton,
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
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import firebase from 'firebase';

const Login: React.FC = () => {
    const { currentUser } = firebase.auth();

    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showToastError, setShowToastError] = useState(false);
    const [toastErrorMessage, setToastErrorMessage] = useState('');

    const [alreadyConnected, setAlereadyConnected] = useState(false);

    useEffect(() => {
        setAlereadyConnected(!!currentUser);
    }, [currentUser]);


    const login = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            setToastErrorMessage(error.message);
            setShowToastError(true);
        }
    };

    if (alreadyConnected) {
        return <Redirect to="/home"></Redirect>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Se connecter</IonTitle>
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
                    <IonButton onClick={login}>Se connecter</IonButton>
                </IonItem>
                <IonItem class="m3">
                    <IonButton routerLink="/register">S'inscrire</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Login;
