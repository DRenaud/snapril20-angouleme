import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import firebase from 'firebase';
import { useEffect } from 'react';

const App: React.FC = () => {
    useEffect(() => {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: 'AIzaSyC8vUejcmMUWipVlwKhGmzMyVssEE5yLBE',
            authDomain: 'snapril-20-angouleme.firebaseapp.com',
            databaseURL:
                'https://snapril-20-angouleme-default-rtdb.firebaseio.com',
            projectId: 'snapril-20-angouleme',
            storageBucket: 'snapril-20-angouleme.appspot.com',
            messagingSenderId: '82749596091',
            appId: '1:82749596091:web:e0f0fb8d42285deb5f649e',
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }, []);

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" exact={true}>
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login" exact={true}>
                        <Login />
                    </Route>
                    <Route path="/register" exact={true}>
                        <Register />
                    </Route>
                    <Route path="/home" exact={true}>
                        <Home />
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
