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

  var notification_type = remoteMessage['data']['type']
  console.log('noitf-message:', remoteMessage, notification_type)

  if (notification_type == 'create_event'){

    notifee.displayNotification({
      title: 'New Basketball Run Posted',
      body: 'See if you can make it!',
      android: {
        channelId: channelId,
        smallIcon: 'ic_stat_sports_basketball'
      },
    });

  } else if (notification_type == 'create_comment') {

    notifee.displayNotification({
      title: 'Someone commented on your post!',
      body: '...',
      android: {
        channelId: channelId,
        smallIcon: 'ic_stat_sports_basketball'
      },
    });

  }

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




