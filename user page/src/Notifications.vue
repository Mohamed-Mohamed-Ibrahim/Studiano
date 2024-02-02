<template>
  <div class="textChatCanvas2" v-show="this.textChatSwitch">
    <Messages :messages="messages"/>
  </div>
    <TextInput @submitText="submitText" :noOfMessages="messages.length" v-show="adminOnline" />
  
</template>

<script>

import TextInput from './components/TextInput.vue'
import Messages from './components/Messages.vue'

export default {
  name: 'Notifications',
  components: {
    TextInput,
    Messages
  },
  data() {
    return{
      messages: [],
      textChatSwitch: true,
      voiceChatSwitch: false,
      adminOnline: localStorage.getItem('email') === localStorage.getItem('admin'),
      refresh: 10000
    }
  },
  async created(){
    this.messages = await this.fetchData()
    setInterval(async () => this.messages = await this.fetchData(), this.refresh)
  },
  methods:{
    // Sending new messages to Database
    async submitText(newMessage){

      // const newMess =  fetch("https://studiando-a6bec-default-rtdb.firebaseio.com/chats/notifications.json", {
      const newMess =  fetch("https://textchat-159f4-default-rtdb.firebaseio.com/chats/notifications.json", {
            method: "post",
            referrer: this.messages.length,
            headers: {
              'Content-type': "application/json; charset=UTF-8"
            },
            body: [JSON.stringify(newMessage)],

        })
      this.messages = [ ...this.messages,  newMessage]
      
    },
    // Getting Messages from firebase Database
    async fetchData(){
      // const jsonFile = await fetch('https://studiando-a6bec-default-rtdb.firebaseio.com/chats/notifications.json')
      const jsonFile = await fetch('https://textchat-159f4-default-rtdb.firebaseio.com/chats/notifications.json')
      let chat = await jsonFile.json();
      
      let arrayChat = []
      // console.log(chat)
      for( let message in chat )
        arrayChat[chat[message]['index']-1] = chat[message]

      return arrayChat
    },
  },
  computed: {
    //Scroll always to the bottom
    scrollUpdate(){
        var messageBody = document.querySelector('.allMessages');

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


#notifications {
  position: absolute;
  top: 0;
  /* left: 5%; */
  height: 100vh;
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
.textChatCanvas2{
  height: 103%;
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
