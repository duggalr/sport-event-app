// import React from 'react';
// import { Text, Card, Button, Icon } from '@rneui/themed';
// import { View, StyleSheet } from 'react-native';
// import { Text, Header, Card } from '@rneui/themed';
// import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NativeBaseProvider, Fab, Icon, Button, Stack, HStack, Center, Heading, Text, Box } from 'native-base';



// const Stack = createNativeStackNavigator();

// const HomeScreen = ({ navigation }) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() =>
//         navigation.navigate('Profile', { name: 'Jane' })
//       }
//     />
//   );
// };
// const ProfileScreen = ({ navigation, route }) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };

// const App = () => {
//   return (
//     <NavigationContainer>
      
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: 'Welcome' }}
//         />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>

//     </NavigationContainer>
//   );
// };

// export default App;




// const Example = () => {

//   return <>

//       {/* <Heading paddingTop="6" paddingLeft="3" fontSize="2xl" color="black">Open Runs Nearby</Heading> */}

//       {/* <Center flex={1} px="3">

//         <Box p="2" bg="primary.500" _text={{
//         fontSize: "md",
//         fontWeight: "medium",
//         color: "warmGray.50",
//         letterSpacing: "lg"
//       }} shadow={2}>
//           This is a Box
//         </Box>

//       </Center> */}

//       {/* <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white"  size="sm" />} /> */}
      
//     </>;
// };

// export default () => {
//     return (
//       <NativeBaseProvider>
//         {/* <Center flex={1} px="3"> */}
//             <Example />
//         {/* </Center> */}
//       </NativeBaseProvider>
//     );
// };



// export default function App() {
//   return (
//     <>
//       <Box p="2" bg="primary.500" _text={{
//       fontSize: "md",
//       fontWeight: "medium",
//       color: "warmGray.50",
//       letterSpacing: "lg"
//     }} shadow={2}>
//         This is a Box
//       </Box>
//     </>

//       // <Heading paddingTop="6" paddingLeft="3" fontSize="2xl" color="white">Find Open Runs nearby</Heading>
//       // {/* <Heading style={styles.headText}>I'm a Heading</Heading> */}

//     // <Box alignItems="center">

//     //   <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
//     //     borderColor: "coolGray.600",
//     //     backgroundColor: "gray.700"
//     //   }} _web={{
//     //     shadow: 2,
//     //     borderWidth: 0
//     //   }} _light={{
//     //     backgroundColor: "gray.50"
//     //   }}>

//     //   </Box>

//     //   <Stack p="4" space={3}>
//     //     <Stack space={2}>
//     //       <Heading size="md" ml="-1">
//     //         The Garden City
//     //       </Heading>
//     //       <Text fontSize="xs" _light={{
//     //       color: "violet.500"
//     //     }} _dark={{
//     //       color: "violet.400"
//     //     }} fontWeight="500" ml="-0.5" mt="-1">
//     //         The Silicon Valley of India.
//     //       </Text>
//     //     </Stack>
//     //     <Text fontWeight="400">
//     //       Bengaluru (also called Bangalore) is the center of India's high-tech
//     //       industry. The city is also known for its parks and nightlife.
//     //     </Text>
//     //     <HStack alignItems="center" space={4} justifyContent="space-between">
//     //       <HStack alignItems="center">
//     //         <Text color="coolGray.600" _dark={{
//     //         color: "warmGray.200"
//     //       }} fontWeight="400">
//     //           6 mins ago
//     //         </Text>
//     //       </HStack>
//     //     </HStack>
//     //   </Stack>

//     // </Box>


//   );
// }


// const Example = () => {
//   return <Box alignItems="center">
//       <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
//       borderColor: "coolGray.600",
//       backgroundColor: "gray.700"
//     }} _web={{
//       shadow: 2,
//       borderWidth: 0
//     }} _light={{
//       backgroundColor: "gray.50"
//     }}>
//         <Box>
//           <AspectRatio w="100%" ratio={16 / 9}>
//             <Image source={{
//             uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
//           }} alt="image" />
//           </AspectRatio>
//           <Center bg="violet.500" _dark={{
//           bg: "violet.400"
//         }} _text={{
//           color: "warmGray.50",
//           fontWeight: "700",
//           fontSize: "xs"
//         }} position="absolute" bottom="0" px="3" py="1.5">
//             PHOTOS
//           </Center>
//         </Box>
//         <Stack p="4" space={3}>
//           <Stack space={2}>
//             <Heading size="md" ml="-1">
//               The Garden City
//             </Heading>
//             <Text fontSize="xs" _light={{
//             color: "violet.500"
//           }} _dark={{
//             color: "violet.400"
//           }} fontWeight="500" ml="-0.5" mt="-1">
//               The Silicon Valley of India.
//             </Text>
//           </Stack>
//           <Text fontWeight="400">
//             Bengaluru (also called Bangalore) is the center of India's high-tech
//             industry. The city is also known for its parks and nightlife.
//           </Text>
//           <HStack alignItems="center" space={4} justifyContent="space-between">
//             <HStack alignItems="center">
//               <Text color="coolGray.600" _dark={{
//               color: "warmGray.200"
//             }} fontWeight="400">
//                 6 mins ago
//               </Text>
//             </HStack>
//           </HStack>
//         </Stack>
//       </Box>
//     </Box>;
// };




// const styles = StyleSheet.create({
//   headText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     paddingTop: "8"
//   },
  
// });














// const FirstRoute = () => <Center flex={1} my="4">
//     This is Tab 1
//   </Center>;

// const SecondRoute = () => <Center flex={1} my="4">
//     This is Tab 2
//   </Center>;

// const initialLayout = {
//   width: Dimensions.get("window").width
// };

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute
// });

// function Example() {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([{
//     key: "first",
//     title: "Tab 1"
//   }, {
//     key: "second",
//     title: "Tab 2"
//   }]);

//   const renderTabBar = props => {
//     const inputRange = props.navigationState.routes.map((x, i) => i);
//     return <Box flexDirection="row">ital
//         {props.navigationState.routes.map((route, i) => {
//         const opacity = props.position.interpolate({
//           inputRange,
//           outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
//         });
//         const color = index === "#e5e5e5"
//         const borderColor = index === "cyan.500"
//         return <Box borderBottomWidth="2" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
//                 <Pressable onPress={() => {
//                     console.log(i);
//                     setIndex(i);
//                   }}>
//                   <Animated.Text style={{
//                     color
//                   }}>{route.title}</Animated.Text>
//                 </Pressable>
//             </Box>;
//       })}
//       </Box>;
//   };

//   return <TabView navigationState={{
//     index,
//     routes
//   }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
//     marginTop: StatusBar.currentHeight
//   }} />;
  
// }


