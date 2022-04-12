import * as React from 'react';
import { NativeBaseProvider, Heading, Text, VStack, View, Box, Pressable, HStack, Spacer, Flex, 
  Badge, FlatList, Button, Avatar, Image, Fab, ScrollView } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ico';



// const HomeScreen = () => {
//   return (

//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
//       <Text>Home</Text>
//     </View>
    
//   )
// }


// const SettingsScreen = () => {
//   return (

//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
//       <Text>Settings</Text>
//     </View>
    
//   )
// }


// const FilterScreen = () => {
//   return (

//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
//       <Text>Filter</Text>
//     </View>

//   )
// }




const MainHeading = () => {

  return (

    <HStack style={{ backgroundColor: 'white', fontSize: 26, paddingTop: 20, paddingLeft: 10}}>

      <Heading>
        Open Runs Nearby
      </Heading>
      <Spacer />
      <Icon name="filter-results-button" group="material-design" style={{ marginTop: 3, marginRight: 12}} height="24" width="24"/>
      
      {/* <Icon name="plus" group="ui-interface" style={{ marginTop: 3, marginRight: 12}} height="24" width="24"/> */}
      {/* <Button backgroundColor="#0284c7">
        Create Event
      </Button> */}

    </HStack>
    
  )

}



// TODO:   
  // scroll-header**
  // filter by date/location/active/completed
  // event-page link to main-page-cards
  // button press & avatar-list press
  // colors & font (read typography chapter in book) on event-page and main-page; (ignore comment-section for now)
  // scroll animations (fade-in) on main-page <-- shouldn't take long to add and will look good
    // experiment with animations a bit...
  // need to make responsive and test on bunch of different android phones (along with virtual/physical Iphone)


function _onScroll(e, mainState) {
  console.log(e.nativeEvent.contentOffset.y);
  var current_y_amt = e.nativeEvent.contentOffset.y
  if (mainState.previous_y_amount < current_y_amt){
    console.log('one')
    mainState = {previous_y_amount: current_y_amt, hide: true}
    // this.setState({hide: true, previous_y_amount: current_y_amt})
  } else {
    console.log('two')
    mainState = {previous_y_amount: current_y_amt, hide: false}
    // this.setState({hide: false, previous_y_amount: current_y_amt})
  }
}


const MainScreen = ({stateData, scrollFunction}) => {
  // data={this.state} scrollFunction={this._onScroll}

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
    
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
    // f8fafc
    // <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 15}}>


    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', padding: 15}}>
    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}> */}

      <MainHeading />

      {stateData.hide == true ? (console.log(stateData.hide)) : (console.log(stateData.hide))}

      <FlatList onScroll={e => scrollFunction(e, stateData)} data={data} renderItem={({ 
        item 
      }) => <Box>

        <Pressable onPress={() => console.log("I'm Pressed")}>

          {/* <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="2" p="5" mt="6" rounded="22" backgroundColor="white"> */}
          <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="0" padding="5" mt="6" rounded="25" backgroundColor="white">

            <HStack alignItems="center">

              {item.icon_name == 'basketball'? <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" />: <Icon height="26" width="26" name="football" group="miscellaneous" color="black"/> }
              {/* <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" /> */}
              {/* <Icon name="soccer-ball-outline" group="lodgicons"/> */}
              <Spacer />
              
              {/* colorScheme="#88e1f7" */}
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

  
  return (

    <View p="8" pt="10" backgroundColor="white" > 

    {/* <Image shadow={2} source={{uri: "https://images.unsplash.com/photo-1565886471538-c4b98b8700d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80" }} alt="asd Text" size="2xl" />  */}

      <HStack alignItems="center">

        <Icon name="basketball" group="miscellaneous" height="26" width="26" color="orange" />
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

      <Text mt="3" fontWeight="medium" fontSize="24">
        Basketball Run this Friday at Smithfield
      </Text>

      <HStack mt="5">
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

      <Text mt="6" fontSize="16" color="coolGray.700">
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

      <Text mt="3" fontWeight="medium" fontSize="20">
        Comments (1) ; TODO
      </Text>

  </View>


  )

}





const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (

    <NavigationContainer>

      <Tab.Navigator screenOptions={{
          tabBarOptions: {
            style: {
              backgroundColor: '#f9f9f9',
            }
          }
        }}>
        
        <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
          <Icon name="event" group="basic" />
        )}} 
        name="Home" component={HomeScreen}  />
        
        <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
          <Icon name="settings" group="miscellaneous" />
        )}}  
        name="Settings" component={SettingsScreen} />

        <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
          <Icon name="filter-results-button" group="material-design" />
        )}}  
        name="Filter" component={FilterScreen} />

      </Tab.Navigator>

    </NavigationContainer>

  )
}


const CreateEventPage = () => {
  return (
    <Text>
      Create Event
    </Text>
  )
}




// export default function App(){
export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      previous_y_amount: 0,
      hide: false,
    };
  }


  _onScroll(e, stateData) {
    console.log("y-amt:", e.nativeEvent.contentOffset.y);
    var current_y_amt = e.nativeEvent.contentOffset.y
    if (stateData.previous_y_amount < current_y_amt){
      stateData = {hide: true, previous_y_amount: current_y_amt}
      // this.setState({hide: true, previous_y_amount: current_y_amt})
    } else {
      stateData = {hide: false, previous_y_amount: current_y_amt}
      // this.setState({hide: false, previous_y_amount: current_y_amt})
    }
  }
  

  render() {

    return (

      <NativeBaseProvider>
  
        {/* <MainScreen /> */}
  
        <NavigationContainer>
  
          <Tab.Navigator screenOptions={{
              tabBarOptions: {
                style: {
                  backgroundColor: '#f9f9f9',
                }
              }
            }}>
            
            {/* <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
              <Icon name="event" group="basic" />
            )}} 
            name="Home" component={MainScreen}  /> */}

            <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
              <Icon name="event" group="basic" />
            )}} 
            name="Home" children={()=><MainScreen stateData={this.state} scrollFunction={this._onScroll} />} />
            
            <Tab.Screen options={{headerShown: false, tabBarLabelStyle: {fontSize: 11}, 
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus" group="ui-interface" height="24" width="24"/>
            )}}  
            name="Create Event" component={CreateEventPage} />
  
            <Tab.Screen options={{headerShown: false, tabBarIcon: ({ color, size }) => (
              <Icon name="settings" group="miscellaneous"/>
            )}}  
            name="Settings" component={ExampleEventPage} />
  
  
          </Tab.Navigator>
  
        </NavigationContainer>
  
      </NativeBaseProvider>
  
    )


  }


}






