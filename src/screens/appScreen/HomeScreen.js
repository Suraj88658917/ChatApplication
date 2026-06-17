import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Back from "../../assets/image/back.svg";
import PhoneCall from "../../assets/image/phone-call.svg";
import Camera from "../../assets/image/camera.svg";
import Send1 from "../../assets/image/send1.svg";
import Socket from "../service/Socket";

const HomeScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    Socket.initializeSocket();

    
    Socket.emit("register", "user1");

    Socket.on("receive_message", (msg) => {
      console.log("message" , msg)
      const newMessage = {
        ...msg ,
        type : "sender"
      }
      setMessages(prev => [...prev,newMessage ]);
    });

    return () => {
      Socket.removeListener("receive_message");
    };
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    const msg = {
       message,
      senderId: "user1",
      receiverId: "user2",
    }

    Socket.emit("send_message" , 
     msg
    );

    // const newMessage = {
    //   ...msg ,
    //   type:"recever"
    // }
    // setMessages(prev => [...prev,newMessage ]);

    setMessage("");
  };

  console.log(messages , "message data")

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back width={25} height={25} />
        </TouchableOpacity>

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

      {/* <View style={{ flex: 1, padding: 10 }}>
        {messages.map((msg, index) => (
          <Text key={index} style={{ marginVertical: 5 }}>
            {msg.senderId}: {msg.message}
          </Text>
        ))}
      </View> */}

      <View style={{ flex: 1, padding: 10 }}>
  {messages.map((msg, index) => {
    const isMe = msg.senderId === "user1";

    return (
      <View
        key={index}
        style={{
          alignSelf: isMe ? "flex-end" : "flex-start",
          backgroundColor: isMe ? "#149dff" : "#e5e5e5",
          padding: 10,
          borderRadius: 10,
          marginVertical: 5,
          maxWidth: "70%",
        }}
      >
        <Text style={{ color: isMe ? "#fff" : "#000" }}>
          {msg.message}
        </Text>
      </View>
    );
  })}
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

        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
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
    paddingTop: 20
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
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 5,
  },

  input: {
    flex: 1,
    backgroundColor: "#eeebeb",
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 8,
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