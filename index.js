/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage)

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  notifee.displayNotification({
    title: 'testing one',
    body: 'Main body content of the notification',
    android: {
      channelId: channelId,
      smallIcon: 'ic_stat_sports_basketball'
    },
  });

});



// function HeadlessCheck({ isHeadless }) {
//   if (isHeadless) {
//     // App has been launched in the background by iOS, ignore
//     return null;
//   }

//   return <App />;
// }

// AppRegistry.registerComponent(appName, () => HeadlessCheck);

AppRegistry.registerComponent(appName, () => App);




