import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("run");

      navigation.replace("HomeScreen");

    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20 , fontFamily:"Poppins-Bold"}}>ChatApplication</Text>
    </View>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#208bf0",
    justifyContent: "center",
    alignItems: "center"
  }
});