import * as React from 'react';
import { View, Text, HStack, Spacer, Pressable } from "native-base";
import { StyleSheet } from 'react-native';
import Icon from 'react-native-ico';


const MainHeader = () => {
  return (
    <View paddingTop="4" paddingLeft="4" backgroundColor="white">
      <HStack>
        <Text fontFamily='Lato-Bold' fontSize="25">Open Runs Nearby</Text>
        <Spacer />
        <Icon name="settings" group="miscellaneous" height="27" width="27" style={{marginRight: 12, marginTop: 8}}/ >
      </HStack>
    </View>
    
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  mainTitle: {
    fontSize: 20,    
    color: "black"
  }
})

export default MainHeader;




// style={{fontFamily: 'Lato-Bold'}}