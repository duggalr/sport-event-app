import * as React from 'react';
import { Dimensions, StyleSheet, StatusBar, View } from 'react-native';
import { NativeBaseProvider, Text, Input, KeyboardAvoidingView, Modal, FlatList, Box, Avatar, HStack, Button, VStack, Divider, AspectRatio, Image, Center, Stack, Heading, Pressable, Badge, Spacer, Flex } from "native-base";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Icon from 'react-native-ico-material-design';
import Icon from 'react-native-ico';
import MainHeader from './components/MainHeader'


// TODO: 
  // ensure it doesn't look 'basic'; add some 'moderness' to it
    // need to change the font
    // ensure the background colors/fonts are consistent in light/dark-mode
  // Modernize UI <-- test with light/night-mode

const PressableCard = ({navigation}) => {

  return (

    <Box alignItems="center">
      <Pressable>
        {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} p="5" rounded="8" marginTop="3" style={{
          transform: [{
            scale: isPressed ? 0.96 : 1
          }]
        }}>
              <HStack alignItems="center">

                {/* <Image shadow={2} source={{uri: require("./images/ball_clipart.png")}} alt="asd Text" size="md" /> */}

                <Badge colorScheme="lightBlue.100" variant="solid" rounded="4">
                    <Text color="white" fontSize="12">
                    Christie Pits Park
                    </Text>
                </Badge>
                <Spacer />
                <Icon name="location" group="logistics-delivery" />
                <Text fontSize={11} color="gray.500">
                  9KM
                </Text>

              </HStack>

              <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                5v5 Basketball Run at Christie Pits this Friday at 6PM
              </Text>
              
              {/* 
              TODO: 
                Core thing is the event-page (along with navigation back to home screen)
                  - create the clicked-event-page and ensure back-navigation, etc. 
                  - attend and cancel button
                **ensure the background-color for all pages (header/bg-page) is same
                Add Fab for Create along with create event form 
                Test the UI on various lengths of text (ie. long/short-desc & title, etc.)
                Add Splash Screen
                Overall UI of the active/completed events (main-page, list of cards, event-pages, attend-button)
                  - fix the colors/fonts of everything                  
                                
              */}

              <HStack mt="2">

                <Icon name="calendar" group="ui-interface" />
                <Text ml="1" color="gray.500">
                  01/01/2022
                </Text>
                
                <Text ml="7"></Text>
                <Icon ml="2" name="time" group="essential" />
                <Text ml="1" color="gray.500">
                  6:00PM
                </Text>
                
              </HStack>

              
              <Text mt="2" fontSize="sm" color="coolGray.700" isTruncated>
                I got 2 of my friends coming. Want to do a 5v5, full-court run, click join if you want to reach. 
                Any skill...
              </Text>

              <Flex>

                <HStack space={0}>
                  {/* <Avatar mr={0} source={{uri: "https://bit.ly/broken-link"}}>RS</Avatar>
                  <Avatar mr={0} source={{uri: "https://bit.ly/broken-link"}}>+13</Avatar> */}

                  <Text style={{fontWeight: "bold", marginTop: 10}}>5 people going</Text>
                  <Spacer />
                  <Button size={"sm"} onPress={() => console.log("hello world")}>Attend?</Button>

                </HStack>

              </Flex>
            </Box>;
      }}
      </Pressable>
    </Box>

  )
}


// TODO: 
  // this will be a list of events retrieved from api (the list-component should be same for both)
const ActiveEventsRoute = () => {
  return(
    <PressableCard />
  )
}


const CompletedEventsRoute = () => {
  return(  
    <PressableCard />
  )
}


const Tab = createMaterialTopTabNavigator();

const MainTabNavigation = () => {
  return (    
    <Tab.Navigator>              
      <Tab.Screen name="Upcoming" component={ActiveEventsRoute} />
      <Tab.Screen name="Past or Canceled" component={CompletedEventsRoute} />
    </Tab.Navigator>
  )
}



const TestingHomeScreen = ({navigation}) => {

  return (
    <View backgroundColor="white" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontFamily: 'Lato-Regular'}}>Home Screen</Text>
      <Button
        title="Go to EventPage"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  )

}


const data = [{
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  fullName: "Aafreen Khan",
  timeStamp: "12:47 PM",
  recentText: "Good Day!",
  avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
  id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  fullName: "Sujitha Mathur",
  timeStamp: "11:11 PM",
  recentText: "Cheer up, there!",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}];


const EventPage = () => {

  return (

    <View backgroundColor="white">

      {/* <Image shadow={2} source={{uri: require("./images/basketball_court.jpeg")}} alt="asd Text" size="md" /> */}
      {/* <Image shadow={2} source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}} alt="Alternate Text" size="xl" /> */}
      
      <Box border="1" borderRadius="md">
       <VStack space="4" divider={<Divider />}>
          <Box px="4" pt="4">
            NativeBase
          </Box>
          <Box px="4">
            NativeBase is a free and open source framework that enable developers
            to build high-quality mobile apps using React Native iOS and Android
            apps with a fusion of ES6.
          </Box>
          <Box px="4" pb="4">
            GeekyAnts
          </Box>
        </VStack>
      </Box>

      {/* <HStack alignItems="flex-end" pt="2" pl="2">

        <Badge colorScheme="lightBlue" variant="solid" rounded="4">
            <Text color="white" fontSize="12">
            Christie Pits Park
            </Text>
        </Badge>
        <Icon name="location" group="logistics-delivery" />
        <Text fontSize={11} color="gray.500">
          9KM
        </Text>

      </HStack> */}

      {/* <Text color="coolGray.800" pt="2" pl="2" fontWeight="medium" fontSize="21" >
        5v5 Basketball Run at Christie Pits
      </Text>

      <HStack mt="2" pl="3">

        <Icon name="calendar" group="ui-interface" />
        <Text ml="1" color="gray.500" fontSize="14" fontWeight="medium">
          01/01/2022 (3 days from now)
        </Text>

        <Text ml="3"></Text>
        <Icon ml="2" name="time" group="essential" />
        <Text ml="1" color="gray.500" fontSize="14" fontWeight="medium">
          6:00PM
        </Text>

      </HStack>

      <HStack alignItems="flex-end" pt="2" pl="2">

        <Badge colorScheme="lightBlue" variant="solid" rounded="4">
            <Text color="white" fontSize="14">
            Christie Pits Park
            </Text>
        </Badge>
        <Icon name="location" group="logistics-delivery" />
        <Text fontSize={14} color="gray.500" fontWeight="medium">
          9KM
        </Text>

      </HStack> 

      <Text mt="2" pl="3" pr="1" fontSize="15" color="coolGray.700">
        I got 2 of my friends coming. Want to do a 5v5, full-court run, click join if you want to reach.
        Any skill level is fine. I will bring water for everyone.
      </Text>


      <HStack>
        

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
      
        
      </HStack>      */}


  
  {/* <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Comments (14)
      </Heading>
      <FlatList data={data} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between">
              <Avatar size="48px" source={{
          uri: item.avatarUrl
        }} />
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.fullName}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
    </Box>

    <Input variant="rounded" placeholder="Round" /> */}


    </View>


  )

}



const NavStack = createNativeStackNavigator();

export default function App(){

  return (

    <NativeBaseProvider style={{fontFamily: 'Lato-Regular'}}>

      <NavigationContainer>

        <MainHeader />

        {/* <NavStack.Navigator initialRouteName="Home" > */}
          {/* <NavStack.Screen options={{headerShown: false}} name="Home" component={MainTabNavigation} /> */}
        <NavStack.Navigator initialRouteName="Home" >
          <NavStack.Screen options={{headerShown: false}} name="Home" component={MainTabNavigation} />
          {/* <NavStack.Screen options={{headerShown: false}} name="Home" component={ActiveEventsRoute} /> */}
          
          {/* <NavStack.Screen name="SampleHome" options={{headerShown: false}} component={TestingHomeScreen} /> */}
          {/* <NavStack.Screen name="Detail" component={EventPage} /> */}
        </NavStack.Navigator>
        
        {/* <MainTabNavigation /> */}

      </NavigationContainer>

    </NativeBaseProvider>

  )

}



// const initialLayout = { width: Dimensions.get('window').width };

// const renderScene = SceneMap({
//   active_events: ActiveEventsRoute,
//   completed_events: CompletedEventsRoute,
// });

// // const MainNavBar = () => {
  
// //   const [index, setIndex] = React.useState(0);
// //   const [routes] = React.useState([
// //     { key: 'active_events', title: 'Active Events' },
// //     { key: 'completed_events', title: 'Completed Events' },
// //   ]);

// //   return (
// //     <TabView
// //       navigationState={{ index, routes }}
// //       renderScene={renderScene}
// //       renderTabBar={renderTabBar}
// //       onIndexChange={setIndex}
// //       initialLayout={initialLayout}
// //       style={styles.container}
// //     />
// //   );

// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     marginTop: StatusBar.currentHeight,
// //   },
// //   scene: {
// //     flex: 1,
// //   },
// //   tabbar: {
// //     backgroundColor: '#3f51b5',
// //   },
// // });












