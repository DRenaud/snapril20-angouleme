import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
} from '@capacitor/core';
import firebase from 'firebase';

const { PushNotifications } = Plugins;

const useNotification = (userId: string) => {
    const register = () => {
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then((result) => {
            if (result.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener(
            'registration',
            (token: PushNotificationToken) => {
                firebase.database().ref('users').child(userId).update({
                    notificationToken: token.value,
                });
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError', (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
        });

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotification) => {
                alert('Push received: ' + JSON.stringify(notification));
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                alert('Push action performed: ' + JSON.stringify(notification));
            }
        );
    };

    return {
        register,
    };
};

export default useNotification;
