import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Back from "../../assets/image/back.svg";
import PhoneCall from "../../assets/image/phone-call.svg";
import Camera from "../../assets/image/camera.svg";
import Send1 from "../../assets/image/send1.svg";

const HomeScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.header}>

      <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back width={25} height={25} />
        </TouchableOpacity>
      </View>

        <Image
          style={styles.image}
          source={require("../../assets/image/image2.jpeg")}
        />

        <View style={styles.info}>
          <Text style={styles.title1}>Shivam</Text>
          <Text style={styles.title}>Booking ID: 92939</Text>
        </View>

        <View style={styles.callBtn}>
          <PhoneCall width={20} height={20} />
        </View>

      </View>

      <View style={styles.inputContainer}>

        <TouchableOpacity style={styles.iconBtn}>
          <Camera width={20} height={20} />
        </TouchableOpacity>

        <TextInput
          placeholder='Type your message'
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn}>
          <Send1 width={25} height={25} />
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeded",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5a40e",
    paddingHorizontal: 10,
    height: 90,
    paddingTop:20
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginHorizontal: 10,
  },

  info: {
    flex: 1,
  },

  title1: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },

  title: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
  },

  callBtn: {
    backgroundColor: "#fff",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

 inputContainer: {
  position: "absolute",
  bottom: 3,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#ffffff",
  width:"100%",
  height:100
},

  input: {
    flex: 1,
    backgroundColor: "#eeebeb",
    height: 55,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 8,
    fontFamily: "Poppins-Regular",
    
  },

  iconBtn: {
    backgroundColor: "#ddd",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  sendBtn: {
    backgroundColor: "#149dff",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});