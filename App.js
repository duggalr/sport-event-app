import * as React from 'react';
import { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
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

// import GetLocation from 'react-native-get-location'
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import NetInfo from "@react-native-community/netinfo";




// TODO:   
  // start backend/frontend-functionality**
    // location/login/create-event-form logic

  // backdrop-shadows/colors & font (read typography chapter in book) on event-page and main-page; (ignore comment-section for now)
    // re-add all the icons (deal with icon/modal issue)
  // scroll animations (fade-in) on main-page <-- shouldn't take long to add and will look good
    // experiment with animations a bit...
  // need to make responsive and test on bunch of different android phones (along with virtual/physical Iphone)
  // Start implementation (will be interfaced with UI/backend <-- but basic core UI is laid out)
  



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


RNLocation.configure({
  distanceFilter: 0.0
 })



const MainHeading = () => {

  let [service, setService] = React.useState("");

  return (

    <HStack style={{ backgroundColor: 'white', fontSize: 26, paddingTop: 20, paddingLeft: 10}}>

      <Heading>
        Open Runs Nearby
      </Heading>
      <Spacer />

      {/* <Icon name="filter-results-button" group="material-design" style={{ marginTop: 3, marginRight: 12}} height="24" width="24"/> */}
      {/* <Icon name="plus" group="ui-interface" style={{ marginTop: 3, marginRight: 12}} height="24" width="24"/> */}
      {/* <Button backgroundColor="#0284c7">
        Create Event
      </Button> */}

    </HStack>
    
  )

}


const EventListNew = ({navigation}) => {

  const [showModal, setShowModal] = useState(false);

  
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

  

  return (

    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 15}}>

      <MainHeading />

      <FlatList data={data} renderItem={({ 
        item 
      }) => <Box>

        <Pressable onPress={() => navigation.navigate('Event Detail')}>

          <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="0" padding="5" mt="6" rounded="25" backgroundColor="white">

            <HStack alignItems="center">

              {item.icon_name == 'basketball'? <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" />: <Icon height="26" width="26" name="football" group="miscellaneous" color="black"/> }
              <Spacer />
              
              <Badge backgroundColor="#0284c7" _text={{
                color: "white", fontSize: "13"
              }} variant="solid" rounded="10" >
                {item.park_name}
              </Badge>
            
              <Text ml="1"></Text>
              <Icon name="location" group="logistics-delivery" height="24" width="24"/>
              <Text fontSize="13" fontWeight="medium">
                {item.location_distance}
              </Text>

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
              <Button backgroundColor="#0ea5e9">Going?</Button>

            </HStack>

          </Box>

        </Pressable>

      </Box>
      
      }>

      </FlatList>

    </View>

  )

}


const ExampleEventPage = () => {

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

          <Text ml="1"></Text>
          <Icon name="location" group="logistics-delivery" height="24" width="24"/>
          <Text fontSize="13" fontWeight="medium">
            9KM
          </Text>

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
            <Input type={"text"} w="80%" height="12" py="0" borderRadius="8" placeholder="got something to say?" />
            {/* <Button>Send</Button> */}
            <Text pl="1"></Text>
            <Button height="12" width="12">
              <Icon name="send-button" group="material-design" height="25" width="25" color="white" />
            </Button>
          </HStack>
        </Box>


    </ScrollView>

  )

}


async function google_sign_in(cb) {

    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const tokenData = await GoogleSignin.getTokens()
      console.log('google-user-info:', userInfo)
      console.log('google-token-data:', tokenData)
      cb(userInfo)

    } 
    catch(error) {  // TODO: need to display error message
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
const EventFormComponent = ({ userData }) => {

  let [service, setService] = React.useState("");

  const [date, setDate] = useState(new Date(1649967016478));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


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
          <FormControl>
            <FormControl.Label>
              <Text fontSize="16" fontWeight="medium">
                Project Title
              </Text>
            </FormControl.Label>
            <Input placeholder="ie. Ball Run this Friday at 6PM at Smithfield Park" w="80"/>
          </FormControl>
        </Box>

        {/* <Box w="3/4" maxW="300"> */}
        <Box pt="4">
          <FormControl>
            <FormControl.Label>
              <Text fontSize="16" fontWeight="medium">
                Activity Type 
              </Text>
            </FormControl.Label>
            <Select selectedValue={service} minWidth="200" accessibilityLabel="Type of Activity" placeholder="Type of Activity" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setService(itemValue)}>
              <Select.Item label="Basketball" value="basketball" />
              <Select.Item label="Soccer" value="soccer" />
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
              onChange={onChange}
            />
          )}

        </View>
   
        <Box pt="4">

          <FormControl>

            <FormControl.Label>
              <Text fontSize="16" fontWeight="medium">
                Choose Time
              </Text>
            </FormControl.Label>

            <Select selectedValue={service}  accessibilityLabel="Choose Time" placeholder="Choose Time" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
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

            {/* <FormControl.HelperText>
              this is an approximate time on when you plan on coming.
            </FormControl.HelperText> */}
            
          </FormControl>
    
        </Box>


        {/* <Box alignItems="center" w="100%"> */}
        <FormControl pt="4">
          <FormControl.Label>
            <Text fontSize="16" fontWeight="medium">
              Event Description
            </Text>
          </FormControl.Label>
          <TextArea h={20} placeholder="ie. looking to play a 5v5 friday. Any skill-level is fine... I'll bring some water for everyone" />
        </FormControl>
        
        {/* </Box>; */}

      </VStack>
        
      {/* </Stack> */}
      
      <Box alignItems="center">
        <Button w="1/2">Create Event</Button>
      </Box>
      

    </ScrollView>

  )

}


const UserLoginComponent = ({handler}) => {

  // var tmp_navigation = useNavigation()
  // console.log('ua-ndavig:', tmp_navigation, handler)

  return (

    <View alignItems="center">

      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => google_sign_in(handler)}
      />

    </View>

  )

}


const CreateEventPage = ({ userData, handler }) => {

  // if user is logged-in, render-form, else, render login-screen
  if (typeof userData !== "undefined"){
    return <EventFormComponent userData={userData} />
  } else {
    return <UserLoginComponent handler={handler} />
  }

}


const ExampleSettings = () => {
  return (

    <Text>
      Settings
    </Text>
  )

}

const permissionHandle = async () => {

  let permission = await RNLocation.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse' // or 'fine'
    }
  });

  console.log('current-permission:', permission)

  if (permission === false) {

    permission = await RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse",
        rationale: {
          title: "Are you sure?",
          message: "We only use your location to show nearby runs!",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    })

    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then((data) => {
      console.log('data', data)
      // location = await RNLocation.getLatestLocation({timeout: 100})
      // console.log('location-now:', location)
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
    }).catch((err) => {
      console.log('errer', err)
      // The user has not accepted to enable the location services or something went wrong during the process
      // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      // codes :
      //  - ERR00 : The user has clicked on Cancel button in the popup
      //  - ERR01 : If the Settings change are unavailable
      //  - ERR02 : If the popup has failed to open
      //  - ERR03 : Internal error
    });

    console.log('new-permission', permission)
    location = await RNLocation.getLatestLocation({timeout: 100})
    console.log('location-details:', location, location.longitude, location.latitude, location.timestamp)

  } else {
    // console.log('location-details:', location)
    try{
      location = await RNLocation.getLatestLocation({timeout: 100})
      // console.log('location-details:', location)
      // if (location !== null){ //send back to django before returning events; this should be first thing done in componentDidMount()
      //   console.log('location-details-new:', location, location.longitude, location.latitude, location.timestamp)
      // }
      
    } catch(err){
      console.log('error', err)
    }


  }

}



const ExampleLocation = () => {
  return (
    
    <Button onPress={() => permissionHandle()}>
      Testing Location
    </Button>

  )
}


const MainScreen = ({ internetConnected, userData, handler, route, navigation }) => {

  // console.log('navigation-state', navigation.getState())
  // console.log('ms-params:', route.params)
  // console.log('ms-navigation:', navigation)  

  console.log('main-props:', userData, handler)

  // console.log('rp:', route.params)
  // var first_name = route.params.userState.first_name
  // var cb = route.params.handler
  
  return (

      <Tab.Navigator screenOptions={{
          tabBarOptions: {
            style: {
              backgroundColor: '#f9f9f9',
            }
          }
        }}>

        <Tab.Screen options={{headerShown: false}} name="MainEventList" component={ExampleLocation} />

        {/* TODO: do check for internetConnected in MainEventList and if false, display middle screen with no internet, sorry */}
          {/* add eventlistener and this should be change dynamically */}

        {/* <Tab.Screen options={{headerShown: false}} name="MainEventList" children={()=><EventListNew navigation={navigation}/>} />

        <Tab.Screen options={{headerShown: false}} name="Create Event">
          {props => <CreateEventPage {...props} userData={userData} handler={handler}/>}
        </Tab.Screen>

        <Tab.Screen options={{headerShown: false}} name="Settings" component={ExampleSettings} /> */}
        
      </Tab.Navigator> 

  )

}




export default class App extends React.Component{

  constructor(props) {
    super(props);
    
    this.state = {
      userInfo: undefined,
      internetConnected: false
    };

    this.handler = this.handler.bind(this)

  }

  handler = (update_val) => {
    console.log('handle-update:', update_val)
    this.setState({
      userInfo: update_val
    })

  }
  

  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('current-user-info:', userInfo)
      this.setState({ userInfo: userInfo })
    } catch (error) {
      this.setState({ userInfo: undefined })
    }
  }


  async componentDidMount() {
    console.log('state-info:', this.state)

    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId:"770095547736-7kq0ent6qtcpu1rf731bkvhmsc7cpg46.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    });

    await this.getCurrentUser();

    // TODO: need to addListener here (https://stackoverflow.com/questions/57296756/how-to-check-internet-connection-in-react-native-application-for-both-ios-and-an)
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.setState({ internetConnected: state.isConnected })

      // if (state.isConnected) {
        
      // } else {
      //   Alert.alert("You are offline!");
      // }

    });

  }


  componentDidUpdate(){
    console.log('STATE HAS UPDATED:', this.state)
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
                {props => <MainScreen {...props} internetConnected={this.state.internetConnected} userData={this.state.userInfo} handler={this.handler}/>}
              </Stack.Screen>

              <Stack.Screen name="Event Detail" component={ExampleEventPage}/>

            </Stack.Navigator>

          </NavigationContainer>

        </NativeBaseProvider>
  
    )

  }

}








