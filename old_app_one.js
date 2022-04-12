import React from "react";
// import { Dimensions, StatusBar } from "react-native"
// import { NativeBaseProvider, Fab, Icon, Button, Stack, HStack, Center, Heading, Text, Box, Pressable, Animated } from 'native-base';
// import { TabView, SceneMap } from "react-native-tab-view";
import { View, useWindowDimensions, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { NativeBaseProvider, Box, Text, Center } from "native-base";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';



// TODO:
  // Add the Header and for the links, don't need horizontal-line underneath; just a 'blue-dot' under active tab


const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
  
export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});



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


// export default function App() {

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
//     return <Box flexDirection="row">
//         {props.navigationState.routes.map((route, i) => {
//           const opacity = props.position.interpolate({
//             inputRange,
//             outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
//           });
//           // const color = index === i ? useColorModeValue("#000", "#e5e5e5") : useColorModeValue("#1f2937", "#a1a1aa");
//           // const borderColor = index === i ? "cyan.500" : useColorModeValue("coolGray.200", "gray.400");
//           const color = "#e5e5e5"
//           const borderColor = "cyan.500"
//           return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
//                 <Pressable onPress={() => {
//                   console.log(i);
//                   setIndex(i);
//                 }}>
//                   <Animated.Text style={{
//                     color
//                   }}>{route.title}</Animated.Text>
//                 </Pressable>
//               </Box>;
//       })}
//       </Box>;
//   };


//   return (
//     <NativeBaseProvider>

//       {/* <Heading paddingTop="6" paddingLeft="4" fontSize="2xl" color="black">Open Runs Nearby</Heading> */}

//       {/* <Box p="2" bg="primary.500" _text={{
//         fontSize: "md",
//         fontWeight: "medium",
//         color: "warmGray.50",
//         letterSpacing: "lg"
//       }} shadow={2}>
//         This is a Box
//       </Box> */}

//       {/* <Box alignItems="center">

//         <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
//           borderColor: "coolGray.600",
//           backgroundColor: "gray.700"
//           }} _web={{
//             shadow: 2,
//             borderWidth: 0
//           }} _light={{
//             backgroundColor: "gray.50"
//           }}>
//         </Box>

//         <Stack p="4" space={3}>

//           <Stack space={2}>
//             <Heading size="md" ml="-1">
//               The Garden City
//             </Heading>
//             <Text fontSize="xs" _light={{
//               color: "violet.500"
//             }} _dark={{
//               color: "violet.400"
//             }} fontWeight="500" ml="-0.5" mt="-1">
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
//                 color: "warmGray.200"
//               }} fontWeight="400">
//                 6 mins ago
//               </Text>
//             </HStack>
//           </HStack>

//         </Stack>

//       </Box> */}

//       {/* <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white"  size="sm" />} /> */}

//     </NativeBaseProvider>

//   );
// }


