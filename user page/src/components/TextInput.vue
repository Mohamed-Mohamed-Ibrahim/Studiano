<template>
    <div class="textBox"  @keyup.enter="submitText()" >
<div id="iconPicker" v-show="emojiAdd">
    <Picker :data="emojiIndex" set="twitter" @select="addEmoji" />
</div>
        <div class="icon" @click="showIconPicker">
            <i class="fa-solid fa-face-smile-wink icon"  ></i>
            
        </div>
        <input type="text" v-model="text" name="text" class="mainInput">
        <SubmitButton @submitText="submitText()" :text="text" />
        
    </div>
</template>

<script>

import SubmitButton from './/SubmitButton.vue';


import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";


let emojiIndex = new EmojiIndex(data);

export default{
    name: 'TextInput',
    data(){
        return{
            text: '',
            emojiIndex: emojiIndex,
            emojisOutput: "",
            emojiAdd: false
        }
    },
    props:{
        noOfMessages: Number
    },
    components: {
        SubmitButton,
        Picker
    },
    methods: {
        submitText(){

            let d = new Date()
            d = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`

            if(this.text !== ''){
                const newMessage = {
                    index: this.noOfMessages+1,
                    message: this.text,
                    name: localStorage.getItem('userName'),
                    date: d
                }
                this.text = '';

                let iconPicker = document.getElementById("iconPicker")
                iconPicker.style.display = "none"

                return this.$emit('submitText', newMessage);
            }
        
        },
        addEmoji(emoji) {
            this.text += emoji.native
        },
        showIconPicker() {
            this.emojiAdd = !this.emojiAdd
        }
    },
    watch: {
        noOfMessages(){  
            console.log(this.noOfMessages)
            var messageBody = document.querySelector('.allMessages');
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

        }
    }
}


</script>

<style>
* {
  margin: 0;
  transition: all 0.5s;
}


.emoji-mart {
  background-color: rgb(146, 204, 255); /* Set your desired background color */
}

#iconPicker {
    position: absolute;
    bottom: 100%;
    left: 0;
}

.icon{
    color: white; 
    cursor: pointer;
    cursor: pointer;
    border: 0px;
    height: 100%;
    width: 20%;
    position: absolute;
    top: auto;
    bottom: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.textBox {
    /* left: 2.5%;
    bottom: 1%; */
    width: 95%;
    height: 10%;
    background-color: rgba(86, 93, 100, 0.461);
    text-align: center;
    border-radius: 30px;
    border: 1px solid black;
    transform: translate(3.5%, -140%);
}

.mainInput{
    cursor:text;    
    width: 60%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    text-overflow: clip;
    color: white;
    border-inline: none;
    border: none;
}

.mainInput:focus{
    /* border: 2px solid lightgrey; */
    outline: none;
    background: grey;
}

.icon:hover{
    color: rgb(26, 130, 220);
}

</style>