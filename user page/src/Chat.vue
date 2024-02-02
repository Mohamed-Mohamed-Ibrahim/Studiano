<template>
  <div class="chatOptions">
    <div class="chatOptionButton" id="textCh" @click="openChannelSelection">
      <i class="fa-brands fa-rocketchat"></i>
    </div>
    <div class="chatOptionButton" id="voiceCh" @click="openVoiceChat">
      <i class="fa-solid fa-microphone"></i>
    </div>
  </div>

  <div class="textChatCanvas" v-if="textChatSwitch && !voiceChatSwitch">
    <Messages :messages="messages"/>

  </div>
  
  <div class="voiceChatCanvas" v-if="voiceChatSwitch && !textChatSwitch">
      <VC id="VC" v-if="voiceChatSwitch && !textChatSwitch"></VC>
  </div>

<div id="channelsLayout">

    <div id="channelSelectionLayout">
      <label for="channelSelection">Channels</label>
      <br>
      <select @change="changeChannel" name="" id="channelSelection" >
        <option :value="channel" v-for="(channel,index) in channels" :key="index">{{ channel }}</option>
      </select>
      <button @click="enterChannel(); closeChannelSelection();">Go to Channel</button>
    </div>

    <div id="newChannelLayout">      
      <label for="channelTextInput">New Channel Name</label>
      <br>
      <input type="text" v-model="newChannel" id="channelTextInput">
      <br>
      <button @click="createChannel();">Create Channel</button>
    </div>

    <div id="privateChatLayout">      
      <label for="privateChatInput">Private Chat</label>
      <br>
      <input type="text" v-model="privateChat" id="privateChatInput">
      <br>
      <button @click="openPrivateChat">Open Chat</button>
    </div>
  </div>

  <TextInput @submitText="submitText" :noOfMessages="messages.length" v-show="this.textChatSwitch"/>

</template>

<script>

import TextInput from './components/TextInput.vue'
import Messages from './components/Messages.vue'
import VC from './components/VC.vue'

export default {
  name: 'Chat',
  components: {
    TextInput,
    Messages,
    VC
  },
  data() {
    return{
      messages: [],
      channels: [],
      textChatSwitch: false,
      voiceChatSwitch: false,
      currentChannel: "",
      newChannel: "",
      privateChat: "",
      refresh: 5000
    }
  },
  async created(){
    this.fetchData()
    setInterval(() => this.fetchData(), this.refresh)
    this.channels = await this.fetchChannels()
    setInterval(async () => this.channels = await this.fetchChannels(), 2*this.refresh)
  },
  methods:{
    // Create and channel and send it to Firebase
    async createChannel(){

      if( this.newChannel ) {
        
        this.channels = [ ...this.channels,  this.newChannel]

        this.newChannel = ""
      }

    },
    // Getting channels from firebase
    async fetchChannels() {
      
      // const jsonFile = await fetch(`https://studiando-a6bec-default-rtdb.firebaseio.com/chats.json`)
      const jsonFile = await fetch(`https://textchat-159f4-default-rtdb.firebaseio.com/chats/channels.json`)
      
      let channels = await jsonFile.json();
      
      let channelNames = []
      for( let name in channels )
        channelNames[ channelNames.length ] = name

      return channelNames
    },
    // Sending new messages to Database
    async submitText(newMessage){

      if( this.privateChat ) {  
        // const newMess =  await fetch(`https://studiando-a6bec-default-rtdb.firebaseio.com/chats/${this.currentChannel}.json`, {
        const newMess =  await fetch(`https://textchat-159f4-default-rtdb.firebaseio.com/chats/private/${this.privateChat}.json`, {
              method: "post",
              referrer: this.messages.length,
              headers: {
                'Content-type': "application/json; charset=UTF-8"
              },
              body: JSON.stringify(newMessage),

          })
      } else {  
        // const newMess =  await fetch(`https://studiando-a6bec-default-rtdb.firebaseio.com/chats/${this.currentChannel}.json`, {
        const newMess =  await fetch(`https://textchat-159f4-default-rtdb.firebaseio.com/chats/channels/${this.currentChannel}.json`, {
              method: "post",
              referrer: this.messages.length,
              headers: {
                'Content-type': "application/json; charset=UTF-8"
              },
              body: [JSON.stringify(newMessage)],

          })
      }
      this.messages = [ ...this.messages,  newMessage]
    },
    // Getting Messages from firebase Database
    async fetchData(){
      let chat;
      if( this.privateChat ) {  
        // const newMess =  await fetch(`https://studiando-a6bec-default-rtdb.firebaseio.com/chats/${this.currentChannel}.json`, {
        const jsonFile =  await fetch(`https://textchat-159f4-default-rtdb.firebaseio.com/chats/private/${this.privateChat}.json`)
        chat = await jsonFile.json();
      } else {  
        // const newMess =  await fetch(`https://studiando-a6bec-default-rtdb.firebaseio.com/chats/${this.currentChannel}.json`, {
        const jsonFile =  await fetch(`https://textchat-159f4-default-rtdb.firebaseio.com/chats/channels/${this.currentChannel}.json`)
        chat = await jsonFile.json();
      }

      let arrayChat = []

      for( let message in chat )
        arrayChat[chat[message]['index']-1] = chat[message]

      this.messages = arrayChat
    },
    async fetchPrivateChats(selectedUser, onlineUser) {

      // const jsonFile = await fetch(`https://studiando-a6bec-default-rtdb.firebaseio.com/chats/private.json`)
      const jsonFile1 = await fetch(`https://textchat-159f4-default-rtdb.firebaseio.com/chats/private.json`)
      
      let channels = await jsonFile1.json();
      
      let chatName = ""

      for( let name in channels )
        if( this.isSubstringAppearingOnce(name,selectedUser) && this.isSubstringAppearingOnce(name,onlineUser) )
          chatName = name
      console.log(selectedUser)
      console.log(onlineUser)
      if( chatName ){ 

        this.privateChat = chatName
        const jsonFile2 = await fetch(`https://textchat-159f4-default-rtdb.firebaseio.com/chats/private/${chatName}.json`)      
        this.messages = await jsonFile2.json();

      } else {
        
        this.privateChat = `${selectedUser}_${onlineUser}`
        this.messages = [];

      }

    },
    isSubstringAppearingOnce(mainString, subString) {

        if(mainString === subString)
          return false

        const firstIndex = mainString.indexOf(subString);
        const lastIndex = mainString.lastIndexOf(subString);

        return firstIndex !== -1  ;
    },
    openTextChat() {
        this.textChatSwitch = true;
        this.voiceChatSwitch = false;
        const channelsLayout = document.querySelector(".voiceChatCanvas")
        channelsLayout.style.display = "none"
    },
    openVoiceChat() {
        this.textChatSwitch = false;
        this.voiceChatSwitch = true;
        this.privateChat = ""
        document.getElementById('textCh').style.backgroundColor="rgba(98, 140, 180, 0.34)";
        document.getElementById('voiceCh').style.backgroundColor="rgb(26, 130, 220)";
        const vc = document.getElementById("channelsLayout")
        vc.style.display = "none"
        const channelsLayout = document.querySelector(".voiceChatCanvas")
        channelsLayout.style.display = "block"
    },
    changeChannel() {
        const channelDropdown = document.getElementById('channelSelection')
        const selectedChannel = channelDropdown.value;
        this.currentChannel = selectedChannel

        this.closeChannelSelection
        clearInterval(this.fetchData)
        this.fetchData()
        setInterval(() => this.fetchData(), this.refresh)
    },
    async openPrivateChat() {

      let selectedUser = this.privateChat
      let onlineUser = localStorage.getItem('userName');
      
      if(selectedUser === onlineUser) {
        alert("Can not make chat with yourself")
        this.privateChat = ""
        return
      }

      this.fetchPrivateChats(selectedUser, onlineUser)

      this.closeChannelSelection()
      clearInterval(this.fetchData)
      this.fetchData()
      setInterval(() => this.fetchData(), this.refresh)
    },
    closeChannelSelection() {
      const channelsLayout = document.getElementById("channelsLayout")
      channelsLayout.style.display = "none"
      this.openTextChat()
    },
    openChannelSelection() {
      if( !this.textChatSwitch ) {        
        const channelsLayout = document.getElementById("channelsLayout")
        channelsLayout.style.display = "block"
      }
      document.getElementById('textCh').style.backgroundColor="rgb(26, 130, 220)";
      document.getElementById('voiceCh').style.backgroundColor="rgba(98, 140, 180, 0.34)";
    },
    enterChannel() {
      
      const channelDropdown = document.getElementById('channelSelection')
      const selectedChannel = channelDropdown.value;
      
      if( selectedChannel != this.currentChannel || this.privateChat ) {
        this.privateChat = ""  
        const channelDropdown = document.getElementById('channelSelection')
        const selectedChannel = channelDropdown.value;
        this.currentChannel = selectedChannel
        this.openTextChat()
      }
    }
  },
  computed: {
    //Scroll always to the bottom
    scrollUpdate(){
        var messageBody = document.getElementsByClassName('allMessages');

        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

    }
  },

}
</script>

<style>

* {
  margin: 0;
  transition: all 0.5s;
}

#channelSelection {
  max-width: 150px;
  min-width: 100px;
}

#channelsLayout {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}

#channelsLayout *{
  margin: 2% 0;
}

#textInputLayout {
  position: absolute;
  bottom: 0;
  left: 0;
}

#chat {
  position: absolute;
  top: 0;
  /* left: 5%; */
  height: 98vh;
  width: 25vw;
  border: 1px solid rgb(92, 90, 90);
  box-shadow: 0px 0px 10px rgba(130, 129, 129, 0.582);
  border-radius: 10px;
  box-sizing: border-box;
  /* padding: 20px; */
  background-image: linear-gradient(rgba(0, 0, 255, 0), rgb(0, 179, 255));
  /* display: none; */
  transform: translate(40px, 0px);
  animation-name: entry;
  animation-duration: 0.5s;
  animation-delay: 0.5s;
  animation-fill-mode: both;
  animation-direction: alternate;
}
.chatOptions{
  display: flex;
  font-size: 20px;
  justify-content: flex-start;
}
#textCh{
  background-color: rgb(26, 130, 220);
}
.textChatCanvas{
  height: 96%;
  margin: 0%;
}

.voiceChatCanvas{
  height: 50%;
  margin: 0%;
}
.chatOptionButton{
  color: rgb(255, 255, 255);
  margin: 2%;
  border-radius: 20px;
  background-color: rgba(98, 140, 180, 0.34);
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
}

.chatOptionButton:hover{
  background-color: rgb(26, 130, 220);
}
.hidden {
  animation-name: exit;
  animation-duration: 0.5s;
  animation-delay: 0.5s;
  animation-fill-mode: both;
  animation-direction: alternate;
}

@keyframes entry{
  0% { 
    opacity: 0;
    left: 0%;
  }
  100% { 
    opacity: 1; 
    left: 5%;
  }
}

@keyframes exit{
  0% { 
    opacity: 1;
    left: 5%;
  }
  100% { 
    opacity: 0; 
    left: 0%;
  }
}

</style>
