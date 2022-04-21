import * as React from 'react';
import { useState } from "react";
import { NativeBaseProvider, Heading, Text, VStack, View, Box, Pressable, HStack, Spacer, Flex, 
  Badge, FlatList, Button, Avatar, Image, Fab, ScrollView, Divider, Input, Center, KeyboardAvoidingView,
  FormControl, Select, CheckIcon, TextArea, Modal } from "native-base";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ico';
import DateTimePicker from '@react-native-community/datetimepicker';
import SplashScreen from 'react-native-splash-screen'

import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import NetInfo from "@react-native-community/netinfo";




// TODO:   
  // start backend/frontend-functionality**
    // location/login/create-event-form logic

  // **ENSURE THE GOOGLE CLIENT-ID ON THIS PAGE IS SET AS ENV VARIABLE BEFORE OS**
  // **For splash-screen, include toronto** (also in appstore description)

  // backdrop-shadows/colors & font (read typography chapter in book) on event-page and main-page; (ignore comment-section for now)
    // re-add all the icons (deal with icon/modal issue)
  // scroll animations (fade-in) on main-page <-- shouldn't take long to add and will look good
    // experiment with animations a bit...
  // need to make responsive and test on bunch of different android phones (along with virtual/physical Iphone)
  // Start implementation (will be interfaced with UI/backend <-- but basic core UI is laid out)
  



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const MainHeading = () => {

  let [service, setService] = React.useState("");

  var tmp_navigation = useNavigation()

  return (

    <HStack style={{ backgroundColor: 'white', fontSize: 26, paddingTop: 20, paddingLeft: 10}}>

      <Heading>
        Open Runs Nearby
      </Heading>
      <Spacer />

      <Pressable onPress={() => tmp_navigation.navigate('Settings')}>
        {/* <Icon name="user-shape" group="font-awesome" style={{ marginTop: 3, marginRight: 12}} height="24" width="24"/> */}
        <Icon name="settings" group="ui-interface" style={{ marginTop: 2, marginRight: 12}} height="28" width="28"/>
      </Pressable>
      
      
      {/* <Icon name="user-1" group="ui-interface" /> */}
      {/* <Icon name="filter-results-button" group="material-design" style={{ marginTop: 3, marginRight: 12}} height="24" width="24"/> */}
      {/* <Icon name="plus" group="ui-interface" style={{ marginTop: 3, marginRight: 12}} height="24" width="24"/> */}
      {/* <Button backgroundColor="#0284c7">
        Create Event
      </Button> */}

    </HStack>
    
  )

}


const EventListNew = ({ mainState, navigation}) => {

  var userLoggedIn = mainState.userLoggedIn
  var userData = mainState.userInfo
  var internetConnected = mainState.internetConnected

  const [showModal, setShowModal] = useState(false);
 
 
  fetch("https://0f34-2607-fea8-4360-f100-ec01-4052-22fd-a7a5.ngrok.io/get_events", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json()).then((responseJson) => {
    console.log('events-list:', responseJson)

  })

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3a123d53abb28ba",
      title: "Ball Run this Friday at Smithfield Park",
      date_of_event: "01/01/2020",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis pharetra ligula et tincidunt. Nam egestas, arcu eu euismod mollis, nisl dui pretium enim, porttitor congue erat tortor nec massa. Nulla facilisi.",
      location_distance: "9KM",
      park_name: "Smithfield Park",
      icon_name: "basketball"
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad222253abb28334ba",
      title: "Soccer Run this Friday at Harbourfront Center, 2PM",
      date_of_event: "01/01/2020",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis pharetra ligula et tincidunt. Nam egestas, arcu eu euismod mollis, nisl dui pretium enim, porttitor congue erat tortor nec massa. Nulla facilisi.",
      location_distance: "9KM",
      park_name: "Harbbourfront Center",
      icon_name: "soccer"
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53adadadaabb28334ba",
      title: "Ball Run, Wednesday evening at Christie Pits Park",
      date_of_event: "01/01/2020",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis pharetra ligula et tincidunt. Nam egestas, arcu eu euismod mollis, nisl dui pretium enim, porttitor congue erat tortor nec massa. Nulla facilisi.",
      location_distance: "9KM",
      park_name: "Christie Pits Park",
      icon_name: "basketball"
    },
  ]

  
  if (internetConnected){

    return (

      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 15}}>

        <MainHeading />

        <FlatList data={data} renderItem={({ 
          item 
        }) => <Box>

          <Pressable onPress={() => navigation.navigate('Event Detail', {mainState: mainState})}>

            <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="0" padding="5" mt="6" rounded="25" backgroundColor="white">

              <HStack alignItems="center">

                {item.icon_name == 'basketball'? <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" />: <Icon height="26" width="26" name="football" group="miscellaneous" color="black"/> }
                <Spacer />
                
                <Badge backgroundColor="#0284c7" _text={{
                  color: "white", fontSize: "13"
                }} variant="solid" rounded="10" >
                  {item.park_name}
                </Badge>
              
                {/* <Text ml="1"></Text>
                <Icon name="location" group="logistics-delivery" height="24" width="24"/>
                <Text fontSize="13" fontWeight="medium">
                  {item.location_distance}
                </Text> */}

              </HStack>
              
              <Text mt="3" fontWeight="medium" fontSize="xl">
                {item.title}
              </Text>
              
              {/* <HStack>
                <Icon name="basketball" group="miscellaneous" />
                <Text color="coolGray.800" mt="0" fontWeight="medium" fontSize="xl">
                  {item.title}            
                </Text>
                <Image shadow={2} source={{uri: "http://clipart-library.com/newimages/basketball-clip-art-1.jpg" }} alt="asd Text" size="sm" /> 
              </HStack> */}
              
              {/* <Text mt="2" fontSize="sm" color="coolGray.700">
                Lorem ipsum dolor sit amet, consectetur asd...
              </Text> */}

              <HStack mt="0.5">

                <Text ml="0.5"></Text>
                <Icon name="calendar" group="ui-interface" color="gray" />
                <Text color="gray.400" ml="2" fontSize="sm" fontWeight="600">
                  01/01/2022
                </Text>

                <Text ml="4"></Text>
                <Icon ml="2" name="time" group="essential" color="gray"/>
                {/* <Text ml="1" color="gray.500"> */}
                <Text ml="1" color="gray.400" fontSize="sm" fontWeight="600">
                  6:00PM
                </Text>

              </HStack>
              
              <HStack pt="5">
                
                <Pressable onPress={() => setShowModal(true)}>

                  <Avatar.Group size="12" max={2}>

                    <Avatar bg="green.500" source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      }}>
                    </Avatar>

                    <Avatar bg="cyan.500" source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  }}>
                      TE
                    </Avatar>
                    
                    <Avatar bg="indigo.500" source={{
                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  }}>
                      JB
                    </Avatar>
                    <Avatar bg="amber.500" source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  }}>
                      TS
                    </Avatar>
                    <Avatar bg="green.500" source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  }}>
                      AJ
                    </Avatar>
                    <Avatar bg="cyan.500" source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  }}>
                      TE
                    </Avatar>
                    <Avatar bg="indigo.500" source={{
                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  }}>
                      JB
                    </Avatar>
                    <Avatar bg="amber.500" source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  }}>
                      TS
                    </Avatar>
                  </Avatar.Group>

                </Pressable>

                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                  <Modal.Content maxWidth="400px">

                  <Modal.Header>People who are Going:</Modal.Header>
                    <Modal.Body>

                      <ScrollView>

                        <Pressable>
                          <HStack>
                            <Avatar bg="green.500" source={{
                              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            }}>
                              AJ
                            </Avatar>
                            <Text fontSize="16" fontWeight="medium" pl="2" pt="3">John Doe</Text>
                          </HStack>
                        </Pressable>
                        <Divider my="1" />

                        <Pressable>
                          <HStack>
                            <Avatar bg="green.500" source={{
                              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            }}>
                              AJ
                            </Avatar>
                            <Text fontSize="16" fontWeight="medium" pl="2" pt="3">John Doe</Text>
                          </HStack>
                        </Pressable>
                        <Divider my="1" />

                        <Pressable >
                          <HStack>
                            <Avatar bg="green.500" source={{
                              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            }}>
                              AJ
                            </Avatar>
                            <Text fontSize="16" fontWeight="medium" pl="2" pt="3">John Doe</Text>
                          </HStack>
                        </Pressable>
                        <Divider my="1" />

                      </ScrollView>

                    </Modal.Body>

                  </Modal.Content>

                </Modal>
                
                <Spacer />
                {/* <Button variant="outline">Going?</Button> */}
                <Button colorScheme="info" onPress={() => navigation.navigate('Event Detail', {mainState: mainState})}>
                  Details
                </Button>

              </HStack>

            </Box>

          </Pressable>

        </Box>
        
        }>

        </FlatList>

      </View>

    )

  } else {

    return (

      <View>
        <Text>
          No Internet Connection! Please connect to Wifi and re-open app!
        </Text>
      </View>

    )

  }

}



const ExampleEventPage = ({ route }) => {
  console.log('example-event-page:', route)

  var mainState = route.params.mainState
  var userLoggedIn = mainState.userLoggedIn

  const [selected, setSelected] = React.useState(1);
  
  return (

    <ScrollView>
  
      <View p="8" pt="5" pb="4" backgroundColor="white">

      {/* <Image shadow={2} source={{uri: "https://images.unsplash.com/photo-1565886471538-c4b98b8700d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80" }} alt="asd Text" size="2xl" />  */}

        <HStack alignItems="center">

          <Icon name="basketball" group="miscellaneous" height="30" width="30" color="orange" />
          {/* <Icon name="soccer-ball-outline" group="lodgicons"/> */}
          <Spacer />

          <Badge colorScheme="lightBlue" _text={{
            color: "white", fontSize: "13"
          }} variant="solid" rounded="10" >
            Smithfield Park
          </Badge>

          {/* <Text ml="1"></Text>
          <Icon name="location" group="logistics-delivery" height="24" width="24"/>
          <Text fontSize="13" fontWeight="medium">
            9KM
          </Text> */}

        </HStack>

        <Text mt="3" fontWeight="medium" fontSize="23"> 
          Basketball Run this Friday at Smithfield
        </Text>

        <HStack mt="2">
          <Icon name="calendar" group="ui-interface" color="gray" />
          <Text color="gray" ml="2" fontSize="15" fontWeight="medium">
            01/01/2022
          </Text>

          <Text ml="6"></Text>
          <Icon ml="2" name="time" group="essential" color="gray"/>
          <Text ml="1" color="gray" fontSize="15" fontWeight="medium">
            6:00PM
          </Text>

        </HStack>

        <Text mt="6" fontSize="16" color="black">
          I got 2 of my friends coming. Want to do a 5v5, full-court run, click join if you want to reach. 
        </Text>

        <HStack pt="5">
          
          <Avatar.Group size="12" max={2}>
            <Avatar bg="green.500" source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}>
              AJ
            </Avatar>
            <Avatar bg="cyan.500" source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }}>
              TE
            </Avatar>
            <Avatar bg="indigo.500" source={{
            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}>
              JB
            </Avatar>
            <Avatar bg="amber.500" source={{
            uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }}>
              TS
            </Avatar>
            <Avatar bg="green.500" source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}>
              AJ
            </Avatar>
            <Avatar bg="cyan.500" source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }}>
              TE
            </Avatar>
            <Avatar bg="indigo.500" source={{
            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}>
              JB
            </Avatar>
            <Avatar bg="amber.500" source={{
            uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }}>
              TS
            </Avatar>
          </Avatar.Group>

          <Spacer />

          <Button colorScheme="info">Attend</Button>

        </HStack>

      </View>

    
        <HStack backgroundColor="white">
          {/* <Icon name="comment-white-oval-bubble" group="font-awesome" height="30" width="30" />
          <Text fontSize="18" pl="2">(13)</Text> */}

          <Text pl="5" fontWeight="medium" fontSize="20">Comments (1)</Text>

        </HStack>


        <VStack pl="4" pr="4"  backgroundColor="white">

          <Box borderBottomWidth="1" backgroundColor="white" _dark={{
            borderColor: "gray.600" 
            }} borderColor="coolGray.200" pl="0" pr="4" py="2">

              <HStack space={3} justifyContent="space-between">

                <Avatar size="48px" source={{
                  uri: "https://images.unsplash.com/photo-1565886471538-c4b98b8700d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80"
                }} />

                <VStack>

                  <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                    John Doe
                  </Text>

                  <Text color="coolGray.600" _dark={{color: "warmGray.200"}} maxW="175px">
                    Hello There! Hello There!
                  </Text>

                </VStack>

                <Spacer />
                <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                  11:15 PM
                </Text>

              </HStack>

          </Box>

          <Box borderBottomWidth="1" backgroundColor="white" _dark={{
            borderColor: "gray.600" 
            }} borderColor="coolGray.200" pl="0" pr="4" py="2">

              <HStack space={3} justifyContent="space-between">

                <Avatar size="48px" source={{
                  uri: "https://images.unsplash.com/photo-1565886471538-c4b98b8700d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80"
                }} />

                <VStack>

                  <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                    John Doe
                  </Text>

                  <Text color="coolGray.600" _dark={{color: "warmGray.200"}} maxW="175px">
                    Hello There! Hello There!
                  </Text>

                </VStack>

                <Spacer />
                <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                  11:15 PM
                </Text>

              </HStack>

          </Box>

          <Box borderBottomWidth="1" backgroundColor="white" _dark={{
            borderColor: "gray.600" 
            }} borderColor="coolGray.200" pl="0" pr="4" py="2">

              <HStack space={3} justifyContent="space-between">

                <Avatar size="48px" source={{
                  uri: "https://images.unsplash.com/photo-1565886471538-c4b98b8700d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80"
                }} />

                <VStack>

                  <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                    John Doe
                  </Text>

                  <Text color="coolGray.600" _dark={{color: "warmGray.200"}} maxW="175px">
                    Hello There! Hello There!
                  </Text>

                </VStack>

                <Spacer />
                <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                  11:15 PM
                </Text>

              </HStack>

          </Box>

          <Box borderBottomWidth="0" backgroundColor="white" _dark={{
            borderColor: "gray.600" 
            }} borderColor="coolGray.200" pl="0" pr="4" py="2">

              <HStack space={3} justifyContent="space-between">

                <Avatar size="48px" source={{
                  uri: "https://images.unsplash.com/photo-1565886471538-c4b98b8700d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80"
                }} />

                <VStack>

                  <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                    John Doe
                  </Text>

                  <Text color="coolGray.600" _dark={{color: "warmGray.200"}} maxW="175px">
                    Hello There! Hello There!
                  </Text>

                </VStack>

                <Spacer />
                <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                  11:15 PM
                </Text>

              </HStack>

          </Box>

        </VStack>

        <Box backgroundColor="white"pb="5" pt="1" pl="4">
          <HStack>
            <Input type={"text"} w="80%" height="12" py="0" borderRadius="8" placeholder="got something to say?" isDisabled={!userLoggedIn}/>
            <Text pl="1"></Text>
            <Button height="12" width="12" isDisabled={!userLoggedIn}>
              <Icon name="send-button" group="material-design" height="25" width="25" color="white" />
            </Button>
          </HStack>
        </Box>


    </ScrollView>

  )

}



function saveUserProfileDetails(userData){

  // TODO: run this and ensure it works <-- on error, display alert
  return fetch("https://f9b9-2607-fea8-4360-f100-a4de-5088-8823-ec9a.ngrok.io/auth_signup", {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // .then((response) => response.json()).then((responseJson) => console.log(responseJson))

}
  

async function google_sign_in(user_state_cb) {
  console.log('cb-function:', user_state_cb)


    try {      

      GoogleSignin.getTokens().then((tokRes) => {
        console.log('GOOGLE TOKEN-DATA:', tokRes)
        var idTok = tokRes['idToken']
        var accessTok = tokRes['accessToken']
        var di = {'access_token': accessTok, 'id_token': idTok}
        user_state_cb(di)
      })

      // // TODO: on authRes success, then get the user-token-data, set the 3 states and have user see event-form/settings
      // //   important: 
      // //     if error on django's side for saving user-profile, signout user in this app as user is not an 'official-user' in our app

      // await GoogleSignin.hasPlayServices()
      // const userInfo = await GoogleSignin.signIn()
      // console.log('user-info:', userInfo)

      // saveUserProfileDetails(userInfo).then((response) => response.json()).then((responseJson) => {
      //   console.log('JSON-response:', responseJson)
        
      //   if (responseJson['success'] === true ) { // user has been created in backend
      //     // const tokenData = GoogleSignin.getTokens().then((tokRes) => tokRes.json()).then((tokRes) => {
      //     //   console.log('google-token-data:', tokenData)
      //     //   var idTok = tokenData['idToken']
      //     //   var accessTok = tokenData['accessToken']
      //     //   var di = {'access_token': accessTok, 'id_token': idTok}
      //     //   user_state_cb(di)
      //     // })
      //     GoogleSignin.getTokens().then((tokRes) => {
      //       console.log('GOOGLE TOKEN-DATA:', tokRes)
      //       var idTok = tokRes['idToken']
      //       var accessTok = tokRes['accessToken']
      //       var di = {'access_token': accessTok, 'id_token': idTok}
      //       user_state_cb(di)
      //     })

          
      //   } else {  // user does not exist in our app so 'successful-login' should be removed
      //     GoogleSignin.revokeAccess(),then(() => {
      //       GoogleSignin.signOut()
      //     })
      //   }

      // })

    } 
    catch(error) {  // TODO: what to do with error? <-- post error saying login unsuccessful
      console.log(error)

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



// TODO: ensure user-id and other user-based information is passed to validate form (ie. double-check on postman/mitmproxy)
const EventFormComponent = ({ mainState }) => {

  let [service, setService] = React.useState("");

  // const [date, setDate] = useState(new Date(1649967016478));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [formData, setData] = React.useState({
    event_title: '', 
    event_description: '',
    park_name: '',
    event_date: '',
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
    console.log('select-val:', value)
    setData({ ...formData,
      park_name: value
    })
    setService(value)
  }

  const timeValueChange = (value) => {
    console.log('select-val:', value)
    setData({ ...formData,
      event_time: value
    })
    setService(value)
  }

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors,
        name: 'Name is required'
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors,
        name: 'Name is too short'
      });
      return false;
    }

    return true;
  };


  const onEventFormSubmit = () => {
    setErrors({});

    var userData = mainState.userInfo
    var user_access_token = userData['access_token']
    formData['access_token'] = user_access_token
    console.log('new-form-data', formData)

    if (formData['event_title'] === "" || formData['event_description'] === "" || formData['park_name'] === "" | formData['event_date'] === "" | formData['event_time'] === ""){
      setErrors({ ...errors,
        error_msg: 'Please fill all fields before submitting!'
      });
      return false;

    }
    
    fetch("https://323b-2607-fea8-4360-f100-bd22-95d9-3c6b-d354.ngrok.io/create_event", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      console.log('create-evnet-form:', responseJson)
      if (responseJson['success'] === true ) {
        // redirect to homepage showing event
        var tmp_navigation = useNavigation()
        tmp_navigation.navigate('Home')

      } else{
        setErrors({ ...errors,
          error_msg: 'Form did not submit successfully!'
        });
      }

    })

  }
  
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
      })}/>
          </FormControl>
        </Box>

        <Box pt="4">
          <FormControl isRequired>
            <FormControl.Label>
              <Text fontSize="16" fontWeight="medium">
                Choose a Park
              </Text>
            </FormControl.Label>

            <Select selectedValue={service} minWidth="200" accessibilityLabel="Park Name" placeholder="Park Name" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5"/>
              }} mt={1} onValueChange={itemValue => parkValueChange(itemValue)}>
              
              <Select.Item label="Waterfront Neighbourhood Centre" value="Waterfront Neighbourhood Centre" />
              <Select.Item label="Smithfield Park" value="Smithfield Park" />
              <Select.Item label="Kipling Parkette" value="Kipling Parkette" />
              <Select.Item label="David Crombie Park Basketball Court" value="David Crombie Park Basketball Court" />
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

            <Select selectedValue={service}  accessibilityLabel="Choose Time" placeholder="Choose Time" _selectedItem={{
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
        <FormControl pt="4">
          <FormControl.Label>
            <Text fontSize="16" fontWeight="medium">
              Description
            </Text>
          </FormControl.Label>
          <TextArea h={20} placeholder="ie. looking to play a 5v5 friday. Any skill-level is fine... I'll bring some water for everyone"
           onChangeText={value => setData({ ...formData, event_description: value})}/>
        </FormControl>
        
        {/* </Box>; */}

      </VStack>
        
      {/* </Stack> */}
      
      {Object.keys(errors).length > 0 ? <Text style={{color: 'red', fontSize: 16, alignSelf: "center"}}>Form did not submit successfully. Ensure all fields are filled!</Text> : null}
      {/* <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> */}

      <Box alignItems="center">
        <Button w="1/2" onPress={onEventFormSubmit}>Create Event</Button>
      </Box>
      

    </ScrollView>

  )

}


const UserLoginComponent = ({handler}) => {

  // var tmp_navigation = useNavigation()
  // console.log('ua-ndavig:', tmp_navigation, handler)

  return (

    <View style={{
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor: 'white'}}>

      {/* <Icon name="basketball-court" group="miscellaneous" height="30" width="30"/> */}
      <Icon name="log-in" group="ui-interface" height="30" width="30"/>

      <Text fontSize={20} fontWeight={'medium'}>Signup or Login</Text>
      
      <HStack>        
        <GoogleSigninButton
          style={{ width: 195, height: 50 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => google_sign_in(handler)}
        />

      </HStack>

    </View>

  )

}


const CreateEventPage = ({ mainState, handler }) => {

  // return <EventFormComponent mainState={mainState} />

  var userLoggedIn = mainState.userLoggedIn

  if (userLoggedIn){
    return <EventFormComponent mainState={mainState} />
  } else { 
    return <UserLoginComponent handler={handler} />
  }

}


const ExampleSettings = ({ mainState, handler }) => {
  var userLoggedIn = mainState.userLoggedIn

  if (userLoggedIn) {

    return (
      <Text>
        Settings
      </Text>
    )

  } else {

    return (
      <UserLoginComponent handler={handler} />
    )

  }
  

}





const MainScreen = ({ mainState, handler, navigation }) => {

  // {props => <MainScreen {...props} mainState={this.state} userLoggedIn={this.state.userLoggedIn}  userData={this.state.userInfo} internetConnected={this.state.internetConnected} handler={this.handler}/>}
  
  var userLoggedIn = mainState.userLoggedIn
  var userData = mainState.userInfo
  var internetConnected = mainState.internetConnected
  
  console.log('main-state-info:', userLoggedIn, userData, internetConnected)


  return (

      <Tab.Navigator screenOptions={{
          tabBarOptions: {
            style: {
              backgroundColor: '#f9f9f9',
            }
          }
        }}>

        
        <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="list" group="miscellaneous" />)}} 
        name="MainEventList" children={()=><EventListNew mainState={mainState} navigation={navigation}/>} />

        <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="add-plus-button" group="material-design" />)}} 
        name="Create Event" children={()=><CreateEventPage mainState={mainState} handler={handler} navigation={navigation}/>} />
        
        {/* <Tab.Screen options={{headerShown: false, tabBarIcon: ({color, size}) => (<Icon name="settings" group="ui-interface" />)}} 
        name="Settings" children={()=><ExampleSettings mainState={mainState} navigation={navigation} handler={handler}/>} /> */}


        {/* <Tab.Screen options={{headerShown: false}} name="Create Event">
          {props => <CreateEventPage {...props} userData={userData} handler={handler}/>}
        </Tab.Screen> */}
      
        {/* <Tab.Screen options={{headerShown: false}} name="Settings" component={ExampleSettings} /> */}
        
      </Tab.Navigator> 

  )

}




export default class App extends React.Component{

  constructor(props) {
    super(props);
    
    this.state = {
      internetConnected: false,
      userLoggedIn: false,
      userInfo: undefined,
    };

    this.handler = this.handler.bind(this)

  }


  handler = (update_val) => { // to-update user state after signup/login
    console.log('handle-update:', update_val)
    this.setState({
      userInfo: update_val, 
      userLoggedIn: true
    })

  }
  

  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      const userAccessTokens = await GoogleSignin.getTokens()
      var di = {'access_token': userAccessTokens['accessToken'], 'id_token': userAccessTokens['idToken']}

      this.setState({ 
        userLoggedIn: true,
        userInfo: di
      })

    } catch (error) {

      this.setState({ 
        userInfo: undefined, 
        userLoggedIn: false
      })

    }
  }


  async componentDidMount() {
    console.log('state-info:', this.state)

    SplashScreen.hide();
    
    GoogleSignin.configure({
      webClientId:"770095547736-7kq0ent6qtcpu1rf731bkvhmsc7cpg46.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    });

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.setState({ internetConnected: state.isConnected })
    });

    await this.getCurrentUser();
    
  }


  componentDidUpdate(){
    // console.log('STATE HAS UPDATED:', this.state)
    
  }
 
  render() {

    return (

        <NativeBaseProvider>
    
          <NavigationContainer>

            <Stack.Navigator>

              {/* <Stack.Screen
                name="Home"
                component={MainScreen}
                initialParams={{ 'userState': this.state, 'handler': this.handler }}
                options={{ headerShown: false}}
              /> */}

              <Stack.Screen name="Home" options={{ headerShown: false}}>
                {/* {props => <MainScreen {...props} userLoggedIn={this.state.userLoggedIn}  userData={this.state.userInfo} internetConnected={this.state.internetConnected} handler={this.handler}/>} */}
                {props => <MainScreen {...props} mainState={this.state} handler={this.handler}/>}
              </Stack.Screen>

              {/* <Stack.Screen name="Event Detail" component={ExampleEventPage}/> */}

            </Stack.Navigator>

          </NavigationContainer>

        </NativeBaseProvider>
  
    )

  }

}








