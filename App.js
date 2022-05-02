import * as React from 'react';
import { useState } from "react";
import { Alert, ActivityIndicator } from 'react-native';
import { NativeBaseProvider, Heading, Text, VStack, View, Box, Pressable, HStack, Spacer,
  Badge, FlatList, Button, Avatar, Image, ScrollView, Divider, Input, Center,
  FormControl, Select, CheckIcon, TextArea, Modal, Checkbox, Spinner } from "native-base";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ico';
import DateTimePicker from '@react-native-community/datetimepicker';
import SplashScreen from 'react-native-splash-screen'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import NetInfo from "@react-native-community/netinfo";
// import { initializeApp } from 'firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, { AuthorizationStatus } from '@notifee/react-native';





const API_URL = 'http://event-backend-env.eba-jqqemta3.ca-central-1.elasticbeanstalk.com'
// const API_URL = "https://5e23-2607-fea8-4360-f100-3e-e3fe-ccc8-4bf8.ngrok.io"
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


async function getAllEvents(main_state, cb_state) {

  cb_state({event_list_refresh: true})

  var getEventFormData = main_state.userInfo

  fetch(API_URL + "/get_events", {
    method: 'POST',
    body: JSON.stringify(getEventFormData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json()).then((responseJson) => {      
    // this.setState({ 
    //   all_events_list: responseJson['data'], 
    //   event_id_dict: responseJson['event_id_dict'][0],
    //   user_event_going_list: responseJson['user_event_going_list'][0],
    //   user_created_event_list: responseJson['user_created_event_list'][0],
    //   event_list_refresh: false,
    //   event_id_comment_dict: responseJson['event_id_comment_dict'][0]
    // })
    // console.log('all-event-data:', responseJson)
    cb_state({ 
      all_events_list: responseJson['data'], 
      event_id_dict: responseJson['event_id_dict'][0],
      user_event_going_list: responseJson['user_event_going_list'][0],
      user_created_event_list: responseJson['user_created_event_list'][0],
      event_list_refresh: false,
      event_id_comment_dict: responseJson['event_id_comment_dict'][0]
    })

    // console.log('events-list:', responseJson)
    // eventData = responseJson['data']
    // console.log('events-list-data:', eventData, eventData[0])
    // this.setState({ all_events_list: eventData })
  })

}


const MainHeading = ({ mainState, handler }) => {

  var tmp_navigation = useNavigation()
  // console.log('main-heading-state:', mainState)

  return (

    <HStack style={{ backgroundColor: 'white', fontSize: 26, paddingTop: 20, paddingLeft: 10}}>

      <Heading>
        Open Runs Nearby
      </Heading>
      <Spacer />

      <Pressable onPress={() => getAllEvents(mainState, handler)}>
        <Icon name="refresh" group="basic" style={{ marginTop: 1, marginRight: 16}} height="28" width="28"/>
      </Pressable>

      <Pressable onPress={() => tmp_navigation.navigate('Create Event')}>
        <Icon name="plus" group="ui-interface" style={{ marginTop: 1, marginRight: 12}} height="28" width="28"/>
      </Pressable>

    </HStack>
    
  )

}


const EventListNew = ({ mainState, handler, comment_handler, navigation }) => {

  var userLoggedIn = mainState.userLoggedIn
  var userData = mainState.userInfo
  var internetConnected = mainState.internetConnected

  var userEventGoingList = mainState.user_event_going_list
  var userCreatedEventList = mainState.user_created_event_list
  var event_id_comment_dict = mainState.event_id_comment_dict
  // mainState.event_id_comment_dict[eventID]

  const [showModal, setShowModal] = useState(false);

  var eventData = mainState.all_events_list

  // if (mainState.event_comment_refresh === false){
  //   handler({'event_comment_refresh': true}) // so when user clicks on eventDetail, they will see an updated comments-state
  // }

  if (mainState.event_list_refresh === true){

    return (

      <View style={{ flex: 1, backgroundColor: 'white', padding: 15}}>

        <MainHeading handler={handler} mainState={mainState} />

        <HStack space={2} justifyContent="center" pt="10">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
        
        {/* <Text style={{ justifyContent: 'center', backgroundColor: 'white', padding: 15, fontSize: 15, marginTop: 20}}>
          No Upcoming Runs Posted. Be the first to post and notify everyone!
        </Text> */}

      </View>

    )


  } else if (eventData.length > 0) {

    return (

      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 15}}>
  
        <MainHeading handler={handler} mainState={mainState} />
  
        <FlatList data={eventData} renderItem={({
          item
        }) => <Box key={item.event_id}>
            
            <Pressable onPress={() => navigation.navigate('Event Detail', 
            {mainState: mainState, event_id: item.event_id, state_handler: handler})}>
  
              <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="1" padding="5" mt="6" rounded="25" backgroundColor="white">
  
                <HStack alignItems="center">
  
                  <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" />
                  <Spacer />
                  <Badge backgroundColor="#0284c7" _text={{color: "white", fontSize: "13"}} variant="solid" rounded="10">
                    {item.park_name}
                  </Badge>
  
                </HStack>                
  
                <Text mt="3" fontWeight="medium" fontSize="xl">
                  {item.event_name}
                </Text>
  
                <HStack mt="0.5">
  
                  <Text ml="0.5"></Text>
                  <Icon name="calendar" group="ui-interface" color="gray" />
                  <Text color="gray.400" ml="2" fontSize="sm" fontWeight="600">
                    {item.event_date}
                  </Text>
  
                  <Text ml="4"></Text>
                  <Icon ml="2" name="time" group="essential" color="gray"/>
                  <Text ml="1" color="gray.400" fontSize="sm" fontWeight="600">
                    {item.event_time}
                  </Text>
  
                </HStack>
  
                <HStack pt="5">
  
                  {item.user_going_list.length > 0 ?  
                  <Avatar.Group  max={2}>{item.user_going_list.map((avatar_item, index) => 
                    <Avatar bg="green.500" source={{
                        uri: avatar_item.profile_picture
                      }} key={index}></Avatar>
                    )}
                  </Avatar.Group> 
                  : 
                  null
                  }
  
                  {/* <Text>({item.user_event_comments.length})</Text> */}      
  
                  <Spacer />
  
                  {/* <HStack pt="4" alignSelf="center" > */}
                  <HStack pt="3" pr="3">
                    <Icon name="comment-white-oval-bubble" group="font-awesome" height="24" width="24"/> 
                    {/* <Icon name="comment-black-oval-bubble-shape" group="font-awesome" height="24" width="24"/>  */}
                    <Text fontSize={16} fontWeight="medium" pl="1">
                     {/* ({item.user_event_comments.length}) */}
                     {/* ({event_id_comment_dict[item.id].length}) */}
                    </Text>
                  </HStack>

                  { userEventGoingList.includes(item.event_id) ?  
                  
                    <Badge alignSelf="center" variant={"solid"} bg="cyan.500" _text={{fontSize: 15}}>
                      Your Going
                    </Badge> 
                    : <Button colorScheme="info" onPress={() => navigation.navigate('Event Detail', {
                      mainState: mainState, event_id: item.event_id, state_handler: handler})}>
                    Details
                  </Button>
                  }
  
                </HStack>
  
              </Box>
  
            </Pressable>
  
          </Box>}>
  
        </FlatList>
  
      </View>
  
    )


  } else if (eventData.length == 0){

    return (

      <View style={{ flex: 1, backgroundColor: 'white', padding: 15}}>

        <MainHeading handler={handler} mainState={mainState} />
        
        <Text style={{ justifyContent: 'center', backgroundColor: 'white', padding: 15, fontSize: 15, marginTop: 20}}>
          No Upcoming Runs Posted. Be the first to post and notify everyone!
        </Text>

      </View>

    )

  }


}


const EventDetailPage = ({ route }) => {

  var tmp_navigation = useNavigation();
  var cb_handler = route.params.state_handler
  var mainState = route.params.mainState
  var eventID = route.params.event_id

  var userInfo = mainState.userInfo
  var userProfileInfo = mainState.userProfileInfo
  var userLoggedIn = mainState.userLoggedIn
  var eventIdDict = mainState.event_id_dict[eventID]
  var user_comment_list = mainState.event_id_comment_dict[eventID]
  var userEventGoingList = mainState.user_event_going_list
  var userCreatedEventList = mainState.user_created_event_list

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = React.useState(1);
  const [errors, setErrors] = React.useState({});
  const [commentFormData, setCommentData] = React.useState({
    comment_input: ''
  });


  function saveUserAttend() {
    // console.log('save-user-attend:', eventIdDict, eventID)

    var formData = {'access_token': userInfo.access_token, 'event_id': eventID}
    
    fetch(API_URL + "/user_attending_event", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {      
      userEventGoingList.push(eventID)
      var prev_user_going_list = eventIdDict['user_going_list']
      prev_user_going_list.push({
        'ug_id': userProfileInfo['user']['id'],
        'profile_picture': userProfileInfo['user']['photo'],
        'name': userProfileInfo['user']['name']
      })

      mainState.event_id_dict[eventID] = eventIdDict
      cb_handler({
        'user_event_going_list': userEventGoingList, 
        'event_id_dict': mainState.event_id_dict
      })

    })

  }

  function deleteEvent(){
    var formData = {'access_token': userInfo.access_token, 'event_id': eventID}

    fetch(API_URL + "/delete_event", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {

      cb_handler({'event_list_refresh': true})
      tmp_navigation.navigate('MainEventList')

    })

  }

  function saveComment(){
    setErrors({});

    var user_comment = commentFormData['comment_input']

    if (user_comment === "") {

      setErrors({ ...errors,
        error_msg: 'Comment Invalid.'
      });
      return false;
      
    } else {

      var saveCommentFormData = {'event_id': eventID, 'comment': user_comment, 'access_token': userInfo['access_token']}

      fetch(API_URL + "/create_comment", {
        method: 'POST',
        body: JSON.stringify(saveCommentFormData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json()).then((responseJson) => {
        // console.log('response-json:', responseJson)
        var di = {'comment': user_comment, 'user_full_name': userProfileInfo.user.name, 'user_profile_pic': userProfileInfo.user.photo}
        var prev_comment_dict = mainState.event_id_comment_dict
        prev_comment_dict[eventID].push(di)
        cb_handler({'event_id_comment_dict': prev_comment_dict})
        setCommentData({comment_input: ''})
      })

    }

  }

  function unAttendEvent(){

    var formData = {'access_token': userInfo.access_token, 'event_id': eventID}
    
    fetch(API_URL + "/unattend_event", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      var index = userEventGoingList.indexOf(eventID);
      if (index > -1) {
        userEventGoingList.splice(index, 1); // 2nd parameter means remove one item only
        cb_handler({'user_event_going_list': userEventGoingList})
      }
          
    })

  }

  
  return (

    <ScrollView>
  
      <View p="8" pt="5" pb="4" backgroundColor="white">

        <HStack alignItems="center">

          <Icon name="basketball" group="miscellaneous" height="30" width="30" color="orange" />
          <Spacer />

          <Badge colorScheme="lightBlue" _text={{
            color: "white", fontSize: "13"
          }} variant="solid" rounded="10" >
            {eventIdDict.park_name}
          </Badge>
 
          { userCreatedEventList.includes(eventID) ? 
          <Pressable onPress={() => {
            Alert.alert(
              "Delete this event?",
              "This cannot be undone...",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel"
                },
                { text: "Delete", onPress: () => deleteEvent() }
              ]
            );
          }}>
              <Icon name="trash" group="ui-interface" height="26" width="26"/>
          </Pressable>
           : 
           null}

        </HStack>

        <Text mt="3" fontWeight="medium" fontSize="23"> 
          {eventIdDict.event_name}
        </Text>
          
        <HStack mt="2">
          <Icon name="calendar" group="ui-interface" color="gray" />
          <Text color="gray" ml="2" fontSize="15" fontWeight="medium">
            {eventIdDict.event_date}
          </Text>

          <Text ml="6"></Text>
          <Icon ml="2" name="time" group="essential" color="gray"/>
          <Text ml="1" color="gray" fontSize="15" fontWeight="medium">
            {eventIdDict.event_time}
          </Text>

        </HStack>

        <Text mt="6" fontSize="16" color="black">
          {eventIdDict.event_description}
        </Text>

        <HStack pt="5">

          <Pressable onPress={() => setShowModal(true)}>

            {eventIdDict.user_going_list.length > 0 ? 
            <Avatar.Group  max={2}>{eventIdDict.user_going_list.map((avatar_item, index) => 
              <Avatar key={avatar_item.ug_id} bg="green.500" source={{
                  uri: avatar_item.profile_picture
                }}></Avatar>
              )}
            </Avatar.Group>
            :
            null
            }
            
          </Pressable>


          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">

              <Modal.Header>People who are Going:</Modal.Header>
                <Modal.Body>

                  <ScrollView>{eventIdDict.user_going_list.map((avatar_item, index) => {
                    
                      return (
                        <View key={avatar_item.ug_id}>

                          <HStack>

                            <Avatar bg="green.500" source={{
                                uri: avatar_item.profile_picture
                              }} key={avatar_item.ug_id}></Avatar>

                            <Text fontSize="16" fontWeight="medium" pl="2" pt="3">
                              {avatar_item.name}
                            </Text>

                          </HStack>
                          <Divider my="1" />

                        </View>
                      )

                    })}
    
                  </ScrollView>

                </Modal.Body>

            </Modal.Content>

          </Modal>


          <Spacer />          

          { userEventGoingList.includes(eventID) ?  
          <HStack>
            <Badge alignSelf="center" variant={"solid"} bg="cyan.500" _text={{fontSize: 15}}>
              Your Going
            </Badge>
          </HStack>
            : <Button colorScheme="info" isDisabled={!userLoggedIn} onPress={() => saveUserAttend()}>Attend</Button>
          }

          {/* { userCreatedEventList.includes(eventID) && userEventGoingList.includes(eventID) ? 
          null : 
          null
          } */}

          { userEventGoingList.includes(eventID) && !userCreatedEventList.includes(eventID) ?
          <HStack>
          <Pressable pt="3" pl="3" onPress={() => {
          Alert.alert(
            "Unattend Event?",
            "you sure...",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Confirm", onPress: () => unAttendEvent() }
            ]
          );
        }}>
            <Icon name="cancel" group="ui-interface"/>
          </Pressable>
        </HStack> : null          
        }

        </HStack>

      </View>

    
        <HStack backgroundColor="white">
          <Text pl="5" fontWeight="medium" fontSize="20">Comments ({user_comment_list.length})</Text>
        </HStack>
        
        <VStack pl="4" pr="4"  backgroundColor="white">{user_comment_list.map((comment_item, index) => {

          return <Box borderBottomWidth="1" backgroundColor="white" _dark={{borderColor: "gray.600" }}
           borderColor="coolGray.200" pl="0" pr="4" py="2">

             <HStack space={3} justifyContent="space-between">

               <Avatar size="48px" source={{
                  uri: comment_item.user_profile_pic
                }} />

                <VStack>

                  <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                    {comment_item.user_full_name}
                  </Text>

                  <Text color="coolGray.600" _dark={{color: "warmGray.200"}} maxW="175px">
                    {comment_item.comment}
                  </Text>
                
                </VStack>

                <Spacer />
                <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                  11:15 PM
                </Text>

             </HStack>

          </Box>

          })}
        
        </VStack>

        <Box backgroundColor="white"pb="5" pt="1" pl="4">
          <HStack>
            <Input type={"text"} w="80%" height="12" py="0" borderRadius="8" 
            placeholder="say what's on your mind..." isDisabled={!userLoggedIn}
            value={commentFormData.comment_input}
            onChangeText={value => setCommentData({ ...commentFormData,
              comment_input: value
            })} />

            <Text pl="1"></Text>
            <Button height="12" width="12" isDisabled={!userLoggedIn} onPress={() => saveComment()}>
              <Icon name="send-button" group="material-design" height="25" width="25" color="white" />
            </Button>
          </HStack>
        </Box>

    </ScrollView>

  )

}



function saveUserProfileDetails(userData){

  return new Promise((resolve, reject) => {

  fetch(API_URL + "/auth_signup", {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json()).then((responseJson) => {
    resolve(responseJson)
    // console.log('response-json:', responseJson)
  })


  })
  
}
  

async function google_sign_in(user_device_token, user_state_cb) {

  try {      
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    userInfo['user_device_token'] = user_device_token

    // console.log('user-info:', userInfo)

    saveUserProfileDetails(userInfo).then(function(responseJson){
      // console.log('promise-res:', responseJson)

      if (responseJson['success'] === true ) { // user has been created in backend

        GoogleSignin.getTokens().then((tokRes) => {
          var idTok = tokRes['idToken']
          var accessTok = tokRes['accessToken']
          var di = {
            'login_error': false, 
            'userLoggedIn': true,
            'userInfo': {'access_token': accessTok, 'id_token': idTok}, 
            'userProfileInfo': userInfo
          }
          user_state_cb(di)
        })

      } 

      else {  // user does not exist in our app so 'successful-login' should be removed
        GoogleSignin.revokeAccess().then(() => {
          GoogleSignin.signOut()
          // mainState.login_error 
          user_state_cb({'login_error': true})
          
        })
      }

    })


    // // saveUserProfileDetails(userInfo).then((response) => response.json()).then((responseJson) => {
    // saveUserProfileDetails(userInfo).then((responseJson) => {
      
    //   if (responseJson['success'] === true ) { // user has been created in backend

    //     GoogleSignin.getTokens().then((tokRes) => {
    //       var idTok = tokRes['idToken']
    //       var accessTok = tokRes['accessToken']
    //       var di = {'userInfo': {'access_token': accessTok, 'id_token': idTok}, 'userLoggedIn': true}
    //       user_state_cb(di)
    //     })

    //   } else {  // user does not exist in our app so 'successful-login' should be removed
    //     GoogleSignin.revokeAccess(),then(() => {
    //       GoogleSignin.signOut()
    //     })
    //   }

    // })

  } 
  catch(error) {  // TODO: update state to display error message on this screen 

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
  
}



const EventFormComponent = ({ mainState, handler }) => {

  var tmp_navigation = useNavigation();

  let [parkVal, setParkVal] = React.useState("");
  let [timeVal, setTimeVal] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [formData, setData] = React.useState({
    event_title: '', 
    event_description: '',
    park_name: '',
    event_date: new Date(),
    event_time: ''
  });
  const [errors, setErrors] = React.useState({});

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setData({ ...formData,
      event_date: currentDate
    })

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const parkValueChange = (value) => {
    // console.log('select-val:', value)
    setData({ ...formData,
      park_name: value
    })
    setParkVal(value)
  }

  const timeValueChange = (value) => {
    // console.log('select-val:', value)
    setData({ ...formData,
      event_time: value
    })
    setTimeVal(value)
  }


 
  const onEventFormSubmit = () => {

    setErrors({});

    var userData = mainState.userInfo
    var user_access_token = userData['access_token']
    formData['access_token'] = user_access_token
    // console.log('new-form-data', formData)

    if (formData['event_title'] === "" || formData['event_description'] === "" || formData['park_name'] === "" | formData['event_date'] === "" | formData['event_time'] === ""){
      setErrors({ ...errors,
        error_msg: 'Please fill all fields before submitting!'
      });
      return false;
    }

    var todayDate = new Date()
    if (new Date(formData['event_date']).getTime() <= todayDate.getTime()){ // date must be greater or equal to current date
      // console.log('error on date...')
      setErrors({ ...errors,
        error_msg: 'Date should be greater than today!'
      });
      return false;
      
    } 

    handler({'event_submit_loading': true})

    fetch(API_URL + "/create_event", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      // console.log('create-evnet-form:', responseJson)

      if (responseJson['success'] === true ) {
        // redirect to homepage showing event
        // handler({'event_submitted': true})
        // handler({'event_list_refresh': true, 'event_submit_loading': false})
        handler({'event_list_refresh': true, 'event_submit_loading': false})
        setData({
          event_title: '', 
          event_description: '',
          park_name: '',
          event_date: new Date(),
          event_time: ''
        })
        tmp_navigation.navigate('MainEventList')

      } else{
        handler({'event_submit_loading': false})
        setErrors({ ...errors,
          error_msg: 'Form did not submit successfully!'
        });
      }

    })

  }
  

  if (mainState.event_submit_loading === true) {

    return (
      
      // // <HStack space={2} justifyContent="center">
      // //   <Spinner accessibilityLabel="Loading posts" />
      // //   <Heading color="primary.500" fontSize="md">
      // //     Loading
      // //   </Heading>
      // // </HStack>
      // <View style={{
      //   // flex: 1,
      //   // justifyContent: "center", 
      //   // flexDirection: "row",
      //   // justifyContent: "space-around",
      //   // padding: 10
      //   position: 'absolute',
      //   left: 0,
      //   right: 0,
      //   top: 0,
      //   bottom: 0,
      //   alignItems: 'center',
      //   justifyContent: 'center'
      // }}>
      //   <ActivityIndicator size="large" />
      // </View>


      <View style={{flex: 1, justifyContent: "center"}}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Notifying Everyone...
          </Heading>
        </HStack>
      </View>

    )

  } else {

    return (

      <ScrollView w="100%" backgroundColor="white">
        {/* <Stack space={2.5} alignSelf="center" px="4" safeArea mt="4" w={{base: "100%", md: "25%"}}> */}
        <HStack paddingTop="6" paddingLeft="2">

          <View pl="4" pt="2">
            <Icon name="pencil" group="ui-interface" />  
          </View>
          
          <Text bold fontSize="24" pl="4">
            Create A Run        
          </Text>

        </HStack>
        
        <VStack p="5">

          <Box pt="2" >
            <FormControl isRequired>
              <FormControl.Label>
                <Text fontSize="16" fontWeight="medium" >
                  Title
                </Text>
              </FormControl.Label>
              <Input placeholder="ie. Ball Run this Friday at 6PM at Smithfield Park" w="80" onChangeText={value => setData({ ...formData,
          event_title: value
        })} value={formData.event_title}/>
            </FormControl>
          </Box>

          <Box pt="4">
            <FormControl isRequired>
              <FormControl.Label>
                <Text fontSize="16" fontWeight="medium">
                  Choose a Park
                </Text>
              </FormControl.Label>

              <Select selectedValue={parkVal} minWidth="200" accessibilityLabel="Park Name" placeholder="Park Name" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => parkValueChange(itemValue)} value={formData.park_name}>
                
                <Select.Item label="Waterfront Neighbourhood Centre" value="Waterfront Neighbourhood Centre" />
                <Select.Item label="Smithfield Park" value="Smithfield Park" />
                <Select.Item label="Kipling Parkette" value="Kipling Parkette" />
                <Select.Item label="David Crombie Park" value="David Crombie Park Basketball Court" />
                <Select.Item label="Christie Pits Park" value="Christie Pits Park" />
                <Select.Item label="Underpass Park" value="Underpass Park" />
                <Select.Item label="Flagstaff Park" value="Flagstaff Park" />
                <Select.Item label="Indian Line Park" value="Indian Line Park" />
                <Select.Item label="Summerlea Park" value="Summerlea Park" />
                <Select.Item label="Firgrove Park" value="Firgrove Park" />
                <Select.Item label="Irving W. Chapley Park" value="Irving W. Chapley Park" />
                <Select.Item label="McNicoll Park" value="McNicoll Park" />
                <Select.Item label="Sanwood Park" value="Sanwood Park" />
                <Select.Item label="Confederation Park" value="Confederation Park" />
                <Select.Item label="MacGregor Playground" value="MacGregor Playground" />
                <Select.Item label="Jack Goodlad Park" value="Jack Goodlad Park" />
                <Select.Item label="Ramsden Park" value="Ramsden Park" />
                <Select.Item label="Earlscourt Park" value="Earlscourt Park" />
                <Select.Item label="Ourland Park" value="Ourland Park" />
                <Select.Item label="Paul Coffey Park" value="Paul Coffey Park" />
                <Select.Item label="Regent Park Athletic Grounds" value="Regent Park Athletic Grounds" />

              </Select>

            </FormControl>
          </Box>


          <View pt="4">
            <HStack>
              {/* <Button onPress={showDatepicker} title="Show date picker!" w="1/2">
                Choose Date
              </Button> */}
              
              <Button size="sm" variant="outline" onPress={showDatepicker}>
                Choose Date
              </Button>

              <Text pl="4" pt="2" fontWeight="medium">
                Date Selected: {date.getFullYear() + '/' + parseInt(date.getMonth()+1) + '/' + date.getDate()}
              </Text>

            </HStack>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onDateChange}
              />
            )}

          </View>

    
          <Box pt="4">

            <FormControl isRequired>

              <FormControl.Label>
                <Text fontSize="16" fontWeight="medium">
                  Choose Time
                </Text>
              </FormControl.Label>

              <Select selectedValue={timeVal}  accessibilityLabel="Choose Time" placeholder="Choose Time" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => timeValueChange(itemValue)}>
                <Select.Item label="12:00PM" value="12:00" />
                <Select.Item label="1:00PM" value="1:00" />
                <Select.Item label="2:00PM" value="2:00" />
                <Select.Item label="3:00PM" value="3:00" />
                <Select.Item label="4:00PM" value="4:00" />
                <Select.Item label="5:00PM" value="5:00" />
                <Select.Item label="6:00PM" value="6:00" />
                <Select.Item label="7:00PM" value="7:00" />
                <Select.Item label="8:00PM" value="8:00" />
                <Select.Item label="9:00PM" value="9:00" />
              </Select>
              
            </FormControl>
      
          </Box>


          {/* <Box alignItems="center" w="100%"> */}
          <FormControl pt="4" isRequired> 
            <FormControl.Label>
              <Text fontSize="16" fontWeight="medium">
                Description
              </Text>
            </FormControl.Label>
            <TextArea h={20} placeholder="ie. looking to play a 5v5 friday. Any skill-level is fine... I'll bring some water for everyone"
            onChangeText={value => setData({ ...formData, event_description: value})} value={formData.event_description}/>
          </FormControl>
          
          {/* </Box>; */}

        </VStack>
          
        {/* </Stack> */}
        
        {/* {Object.keys(errors).length > 0 ? <Text style={{color: 'red', fontSize: 16, alignSelf: "center"}}>Form did not submit successfully. Ensure all fields are filled!</Text> : null} */}
        {Object.keys(errors).length > 0 ? <Text style={{color: 'red', fontSize: 16, alignSelf: "center"}}>{errors.error_msg}</Text> : null}
        {/* <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> */}

        <Box alignItems="center">
          <Button w="1/2" onPress={onEventFormSubmit}>Create Event</Button>
        </Box>
        

      </ScrollView>

    )

  }

}


const UserLoginComponent = ({ mainState, handler }) => {

  var loginError = mainState.login_error 

  
  return (

    <View style={{
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor: 'white'}}>

      <Icon name="log-in" group="ui-interface" height="30" width="30"/>

      <Text fontSize={20} fontWeight={'medium'}>Signup or Login</Text>
      
      <HStack>        
        <GoogleSigninButton
          style={{ width: 195, height: 50 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => google_sign_in(mainState.user_device_token, handler)}
        />
      </HStack>

      {loginError ? <Text color={"red"}>Unexpected Error occured when creating account...</Text> : null}

    </View>

  )


}


const CreateEventPage = ({ mainState, handler }) => {

  var userLoggedIn = mainState.userLoggedIn

  if (userLoggedIn){
    return <EventFormComponent mainState={mainState} handler={handler} />
  } else { 
    return <UserLoginComponent mainState={mainState} handler={handler} />
  }

}



const SettingsComponent = ({ mainState }) => {
 
  var userProfile = mainState.userProfileInfo 
  const [groupValues, setGroupValues] = React.useState([]);

  return (
    
    <View backgroundColor={"white"} >

      <Center p="8">

        <Image size={120} resizeMode={"contain"} borderRadius={100} source={{
          uri: userProfile.user.photo
        }} alt="your google profile picture" />

        <Heading size="lg" mt="2">{userProfile.user.name}</Heading>

      </Center>

      
      <View pl="6">

        <Text fontSize={18} fontWeight="medium">Notifications</Text>

        <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
          <Checkbox value="one" my={4}>
            UX Research
          </Checkbox>
          <Checkbox value="two">Software Development</Checkbox>
        </Checkbox.Group>

      </View>
        

    </View>
   
    
  )

}


const SettingsPage = ({ mainState, handler }) => {

  var userLoggedIn = mainState.userLoggedIn

  if (userLoggedIn){
    return <SettingsComponent mainState={mainState} handler={handler} />
  } else { 
    return <UserLoginComponent mainState={mainState} handler={handler} />
  }

}


const MainScreen = ({ mainState, handler, navigation }) => {
  
  var inital_loading_state = mainState.initialLoadingState
  var userLoggedIn = mainState.userLoggedIn
  var userData = mainState.userInfo
  var internetConnected = mainState.internetConnected

  if (inital_loading_state === true) {

    return (

      <View style={{flex: 1, justifyContent: "center"}}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading...
          </Heading>
        </HStack>
      </View>

    )
    

  } else if (inital_loading_state === false & internetConnected === false) {

    return (

      <View style={{flex: 1, justifyContent: "center"}}>
        <Text style={{textAlign: "center", fontSize: 17}}>
          No Internet Connection! Please connect to Wifi and restart app!
        </Text>
      </View>
      
    )


  } else if (inital_loading_state === false & internetConnected === true){

    return (

      <Tab.Navigator screenOptions={{
          tabBarOptions: {
            style: {
              backgroundColor: '#f9f9f9',
            }
          }
        }}>

        <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="list" group="miscellaneous" />)}} 
        name="MainEventList" children={()=><EventListNew mainState={mainState} handler={handler} navigation={navigation}/>} />

        <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="add-plus-button" group="material-design" />)}} 
        name="Create Event" children={()=><CreateEventPage mainState={mainState} handler={handler} navigation={navigation}/>} />
        
      </Tab.Navigator> 

    )

  }
  

}




export default class App extends React.Component{

  constructor(props) {
    super(props);
    
    this.state = {
      initialLoadingState: true,
      internetConnected: false,
      userLoggedIn: false,
      userInfo: undefined,
      userProfileInfo: undefined,
      all_events_list: [],
      event_list_refresh: false,
      user_device_token: undefined,
      event_id_comment_dict: undefined
    };

    this.handler = this.handler.bind(this)

  }

 
  handler = (update_val, cb) => { // to-update user state after signup/login
    this.setState(update_val)
  }


  comment_handler = (update_val) => { // TODO: is this being used anywhere? (don't think so...)
    // 'event_id': eventID, 'comment': user_comment}
    var event_dict = this.state.event_id_dict[eventID]
  }

  

  async getCurrentUser() {

    try{
      const google_userInfo = await GoogleSignin.signInSilently();
      // console.log('google-user-info:', google_userInfo)
      const userAccessTokens = await GoogleSignin.getTokens()

      return new Promise((resolve, reject) => {

        var di = {'access_token': userAccessTokens['accessToken'], 'id_token': userAccessTokens['idToken']}

        this.setState({ 
          userLoggedIn: true,
          userInfo: di,
          userProfileInfo: google_userInfo
        }, 
        () => {this.getCurrentUserCB()}
        )

      })

    } catch(error) {
      // console.log('error:', error)
      this.getCurrentUserCB()

    }

    // try { 
    //   const google_userInfo = await GoogleSignin.signInSilently();
    //   console.log('google-user-info:', google_userInfo)      
    //   const userAccessTokens = await GoogleSignin.getTokens()
    //   var di = {'access_token': userAccessTokens['accessToken'], 'id_token': userAccessTokens['idToken']}
 
    //   this.setState({ 
    //     userLoggedIn: true,
    //     userInfo: di,
    //     userProfileInfo: google_userInfo
    //   })
      
    //   // fetch('https://07b7-2607-fea8-4360-f100-a476-956b-eb-6def.ngrok.io/get_user_profile_info', {
    //   //   method: 'POST',
    //   //   body: JSON.stringify(di),
    //   //   headers: {
    //   //     'Content-Type': 'application/json'
    //   //   }
    //   // }).then((response) => response.json()).then((responseJson) => {

    //   //   if (responseJson['success'] === true) {

    //   //     this.setState({ 
    //   //       userLoggedIn: true,
    //   //       userInfo: di,
    //   //       userProfileInfo: responseJson['data']
    //   //     })

    //   //   } else {

    //   //     this.setState({ 
    //   //       userLoggedIn: true,
    //   //       userInfo: di,
    //   //       userProfileInfo: google_userInfo
    //   //     })

    //   //   }

    //   // })


    // } catch (error) {

    //   this.setState({ 
    //     userInfo: undefined, 
    //     userLoggedIn: false
    //   })

    // }
    
  }


  async getAllEvents() {

    var getEventFormData = this.state.userInfo
    // console.log(getEventFormData)
    
    fetch(API_URL + "/get_events", {
      method: 'POST',
      body: JSON.stringify(getEventFormData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {   
      // console.log('all-event-data:', responseJson)

      this.setState({ 
        all_events_list: responseJson['data'], 
        event_id_dict: responseJson['event_id_dict'][0],
        user_event_going_list: responseJson['user_event_going_list'][0],
        user_created_event_list: responseJson['user_created_event_list'][0],
        event_list_refresh: false,
        event_id_comment_dict: responseJson['event_id_comment_dict'][0],
        initialLoadingState: false 
      })

      // console.log('events-list:', responseJson)
      // eventData = responseJson['data']
      // console.log('events-list-data:', eventData, eventData[0])
      // this.setState({ all_events_list: eventData })
    })

  }


  async getDeviceToken() {

    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    // console.log('device-token:', token)

    this.setState({ user_device_token: token})

    if (this.state.userLoggedIn === true){

      var formData = {
        "userDeviceToken": this.state.user_device_token, 
        "access_token": this.state.userInfo['access_token']
      }
      
      fetch(API_URL + "/update_user_device_token", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json()).then((responseJson) => {
        // console.log('user-device-token-updated:', responseJson)

      })

    }

  }


  // async internetCB() {

  //   return new Promise(resolve => {

  //     NetInfo.fetch().then(state => {
  //       console.log("Connection type", state.type);
  //       console.log("Is connected?", state.isConnected);
        
  //       if (state.isConnected === true){  

  //         // console.log('gcu-mount:', this.getCurrentUser())
  //         testingFN() // TODO: need to create the all these as separate functions outside
  //         // resolve(true)
          
  //         // getCurrentUser().then( () => {resolve(true)})

  //         // this.getCurrentUser();
  //         // this.getAllEvents();
  //         // this.getDeviceToken();
          
  //         // this.setState({ 
  //         //   internetConnected: state.isConnected
  //         // })

  //         // resolve(true)
  
  //       } else {
  //         resolve(true)
  //       }

  //     });

  //   })
    
  // }


  async onMessageReceived(message) {
    // console.log('notification-msg:', message)
    // console.log('notification-msg-type:', JSON.parse(message['data'])['type'])
    // notifee.displayNotification(JSON.parse(message['data']['notifee']));    

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    var notification_type = message['data']['type']
    // console.log('noitf-message:', message, notification_type)

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


  }


  getCurrentUserCB() {
    this.getDeviceToken()
    this.getAllEvents()
    // console.log('current-user-state-updated:', this.state)
    // this.getAllEvents()

  }
  

  async requestUserPermission() {
    const settings = await notifee.requestPermission();
  
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      // console.log('Permission settings:', settings);
    } else {
      // console.log('User declined permissions');
    }
  }

  async checkApplicationPermission() {
    const settings = await notifee.requestPermission();
  
    if (settings.authorizationStatus) {
      // console.log('User has notification permissions enabled')
    } else {
      // console.log('User has notification permissions disabled')
      await this.requestUserPermission()
    }
  
    console.log('iOS settings: ', settings.ios);
  }


  async componentDidMount() {

    GoogleSignin.configure({
      webClientId: '770095547736-vnejub7rlnb4gsl6pmkl2or9q6qgceeb.apps.googleusercontent.com'
    });

    SplashScreen.hide();

    await this.checkApplicationPermission()

    // const config = {
    //   name: 'SECONDARY_APP',
    // };
    // await initializeApp({});
    

    // await this.requestUserPermission()

    NetInfo.fetch().then(state => {
      // console.log('network-state:', state)
      this.setState({ internetConnected: state.isConnected })
      
      if (this.state.internetConnected === true){

        this.getCurrentUser()
        
      } else {

        this.setState({ 
          initialLoadingState: false 
        })

      }
      
    })
   
    
    messaging().onMessage(this.onMessageReceived);
    messaging().setBackgroundMessageHandler(this.onMessageReceived);

    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   this.setState({ internetConnected: state.isConnected })

    //   if (this.state.internetConnected === true){

    //     this.getAllEvents().then(function(){
    //       console.log(this.state)
    //     })

    //     // this.getCurrentUser().then(this.getDeviceToken().then(this.getAllEvents().then(function(){

    //     //   if (this.state.userLoggedIn === true){
        
    //     //     var formData = {"userDeviceToken": this.state.user_device_token}
      
    //     //     fetch("https://07b7-2607-fea8-4360-f100-a476-956b-eb-6def.ngrok.io/update_user_device_token", {
    //     //       method: 'POST',
    //     //       body: JSON.stringify(formData),
    //     //       headers: {
    //     //         'Content-Type': 'application/json'
    //     //       }
    //     //     }).then((response) => response.json()).then((responseJson) => {
    //     //       console.log('user-device-token-updated:', responseJson)
  
    //     //     })
      
    //     //   }

    //     // })))

    //   }

    // });

    // if (this.state.internetConnected === true){
      
    //   console.log('gcu-mount:', this.getCurrentUser())
    //   // await this.getCurrentUser();
    //   // await this.getAllEvents();
    //   // await this.getDeviceToken();
  
    //   // if (this.state.userLoggedIn === true){
        
    //   //   var formData = {"userDeviceToken": this.state.user_device_token}
  
    //   //   fetch("https://07b7-2607-fea8-4360-f100-a476-956b-eb-6def.ngrok.io/update_user_device_token", {
    //   //     method: 'POST',
    //   //     body: JSON.stringify(formData),
    //   //     headers: {
    //   //       'Content-Type': 'application/json'
    //   //     }
    //   //   }).then((response) => response.json()).then((responseJson) => {
    //   //     console.log('save-user-attend:', responseJson)
    //   //     // TODO: 
    //   //       // need to mark-state for this event that user is not going or user is going
    //   //         // show not-going-button and going-button
    //   //   })
  
    //   // }

    // }

  }


  async componentDidUpdate(previousProps, previousState){
    if (this.state.event_list_refresh === true){
      await this.getAllEvents();
    }
    
  }

  
  render() {

    return (

        <NativeBaseProvider>
    
          <NavigationContainer>

            <Stack.Navigator>

              <Stack.Screen name="Home" options={{ headerShown: false}}>
                {props => <MainScreen {...props} mainState={this.state} handler={this.handler}/>}
              </Stack.Screen>
              
              <Stack.Screen name="Event Detail">
                {props => <EventDetailPage {...props} />}
              </Stack.Screen>

            </Stack.Navigator>

          </NavigationContainer>

        </NativeBaseProvider>
  
    )

  }

}









