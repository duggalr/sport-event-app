import * as React from 'react';
import { useState } from "react";
import { NativeBaseProvider, Heading, Text, VStack, View, Box, Pressable, HStack, Spacer, Flex, 
  Badge, FlatList, Button, Avatar, Image, Fab, ScrollView, Divider, Input, Center, KeyboardAvoidingView } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ico';
// import Modal from "react-native-modal";




// TODO:   
  // tab-navigation
  // organizing the event-page and comments (add icons again for home/event-page)
  // create-event-page (just basic form-ui)
  // user-profile/settings page (just create the user-profile page first; no need for seeing which events I clicked going/saved, etc.)
  // **modal speed**
  // **scroll-header**
  // colors & font (read typography chapter in book) on event-page and main-page; (ignore comment-section for now)
    // re-add all the icons (deal with icon/modal issue)
  // scroll animations (fade-in) on main-page <-- shouldn't take long to add and will look good
    // experiment with animations a bit...
  // need to make responsive and test on bunch of different android phones (along with virtual/physical Iphone)

  


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



// const BottomMainBar = () => {

//   return (

//     <Tab.Navigator screenOptions={{
//       tabBarOptions: {
//         style: {
//           backgroundColor: '#f9f9f9',
//         }
//       }
//     }}>
    
//       {/* <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
//         <Icon name="event" group="basic" />
//       )}} 
//       name="Home" component={MainScreen}  /> */}

//       <Tab.Screen options={{headerShown: false}} name="Home" children={()=><MainScreen />} />
      
//       <Tab.Screen options={{headerShown: false}} name="Create Event" component={CreateEventPage} />

//       <Tab.Screen options={{headerShown: false}} name="Settings" component={ExampleEventPage} />

//     </Tab.Navigator>

//   )

// }


const ExampleSettings = () => {
  return (

    <Text>
      Settings
    </Text>
  )

}


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const EventListNew = ({navigation}) => {

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
      title: "Ball Run this Friday at Harbourfront Center, 2PM",
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

      <FlatList data={data} renderItem={({ 
        item 
      }) => <Box>

        <Pressable onPress={() => navigation.navigate('EventPage')}>

          <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="0" padding="5" mt="6" rounded="25" backgroundColor="white">

            <HStack alignItems="center">

              {/* {item.icon_name == 'basketball'? <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" />: <Icon height="26" width="26" name="football" group="miscellaneous" color="black"/> } */}
              {/* <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" /> */}
              {/* <Icon name="soccer-ball-outline" group="lodgicons"/> */}
              <Spacer />
              
              <Badge backgroundColor="#0284c7" _text={{
                color: "white", fontSize: "13"
              }} variant="solid" rounded="10" >
                {item.park_name}
              </Badge>
            
              <Text ml="1"></Text>
              {/* <Icon name="location" group="logistics-delivery" height="24" width="24"/> */}
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
              {/* <Icon name="calendar" group="ui-interface" color="gray" /> */}
              <Text color="gray.400" ml="2" fontSize="sm" fontWeight="600">
                01/01/2022
              </Text>

              <Text ml="4"></Text>
              {/* <Icon ml="2" name="time" group="essential" color="gray"/> */}
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





const MainScreen = ({ navigation }) => {
  // data={this.state} scrollFunction={this._onScroll}

  // const [showModal, setShowModal] = useState(false);
  // const [isModalVisible, setModalVisible] = useState(false);
  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };


  return (
    
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
    // f8fafc
    // <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 15}}>

    // <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 15}}>
    // {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}> */}

      // <MainHeading />

      <Tab.Navigator screenOptions={{
            tabBarOptions: {
          style: {
            backgroundColor: '#f9f9f9',
          }
        }
      }}>

        <Tab.Screen options={{headerShown: false}} name="MainEventList" children={()=><EventListNew navigation={navigation}/>} />
        
        <Tab.Screen options={{headerShown: false}} name="Create Event" component={CreateEventPage} />
        
        <Tab.Screen options={{headerShown: false}} name="Settings" component={ExampleSettings} />        
        
      </Tab.Navigator> 

    // </View> 
    
  )

}




const ExampleEventPage = () => {

  function handleClick(){
    console.log("input-button-click")
  }

  const [selected, setSelected] = React.useState(1);
  
  return (

    <KeyboardAvoidingView h={{
      base: "400px",
      lg: "auto"
    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
  
    <View p="8" pt="10" backgroundColor="white" > 

    {/* <Image shadow={2} source={{uri: "https://images.unsplash.com/photo-1565886471538-c4b98b8700d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80" }} alt="asd Text" size="2xl" />  */}

      <HStack alignItems="center">

        {/* <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" /> */}
        {/* <Icon name="soccer-ball-outline" group="lodgicons"/> */}
        <Spacer />

        <Badge colorScheme="lightBlue" _text={{
          color: "white", fontSize: "13"
        }} variant="solid" rounded="10" >
          Smithfield Park
        </Badge>

        <Text ml="1"></Text>
        {/* <Icon name="location" group="logistics-delivery" height="24" width="24"/> */}
        <Text fontSize="13" fontWeight="medium">
          9KM
        </Text>

      </HStack>

      <Text mt="3" fontWeight="medium" fontSize="24"> 
        Basketball Run this Friday at Smithfield
      </Text>

      <HStack mt="2">
        {/* <Icon name="calendar" group="ui-interface" color="gray" /> */}
        <Text color="gray" ml="2" fontSize="15" fontWeight="medium">
          01/01/2022
        </Text>

        <Text ml="6"></Text>
        {/* <Icon ml="2" name="time" group="essential" color="gray"/> */}
        <Text ml="1" color="gray" fontSize="15" fontWeight="medium">
          6:00PM
        </Text>

      </HStack>

      <Text mt="6" fontSize="16" color="black">
        I got 2 of my friends coming. Want to do a 5v5, full-court run, click join if you want to reach. 
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


      
      {/* <VStack pt="20">

        <Icon name="add-comment-button" group="material-design" />

        <Text mt="3" fontWeight="medium" fontSize="20">
          Comments (1) ; TODO
        </Text>
        
          <Box alignItems="center">
            <Input type={"text"} w="100%" maxW="300px" height="12" py="0" placeholder="got something to say?" />
          </Box>
        
      </VStack> */}


    </View>

    </KeyboardAvoidingView>


  )

}


const CreateEventPage = () => {
  return (
    <Text>
      Create Event
    </Text>
  )
}







const TestingMain = ({ navigation }) => {
  return (

    <MainScreen navigation={navigation}/>

    // <ExampleEventPage />

    // <Tab.Navigator screenOptions={{
    //   tabBarOptions: {
    //     style: {
    //       backgroundColor: '#f9f9f9',
    //     }
    //   }
    // }}>
    
    //   {/* <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
    //     <Icon name="event" group="basic" />
    //   )}} 
    //   name="Home" component={MainScreen}  /> */}

    //   <Tab.Screen options={{headerShown: false}} name="Settings" component={ExampleEventPage} />

    //   <Tab.Screen options={{headerShown: false}} name="MainEventList" children={()=><MainScreen navigation={navigation}/>} />
      
    //   <Tab.Screen options={{headerShown: false}} name="Create Event" component={CreateEventPage} />

    // </Tab.Navigator>

  )
}




export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      previous_y_amount: 0,
      hide: false,
    };
  }


  render() {

    return (

      <NativeBaseProvider>
  
        {/* <MainScreen /> */}
  
        <NavigationContainer>

          <Stack.Navigator>
            
            <Stack.Screen
              name="Home"
              component={TestingMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="EventPage" component={ExampleEventPage} />

          </Stack.Navigator>
  
        </NavigationContainer>
  
      </NativeBaseProvider>
  
    )

  }

}









