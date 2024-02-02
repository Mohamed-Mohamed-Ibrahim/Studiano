<template>
    
    <div class="allMessages">
        <div  class="messagesLayout" :key="index" v-for="(mess,index) in messages">
            <Message :mess="mess" />
        </div>
    </div>
</template>

<script>

import Message from './Message.vue'



export default{
    name: 'Messages',
    props: {
        messages: Array
    },
    components: {
        Message
    }
}


</script>

<style>
.allMessages::-webkit-scrollbar {
    width: 5px; 
}

.allMessages::-webkit-scrollbar-track {
    background: none; 
}

.allMessages::-webkit-scrollbar-thumb {
    background-color: rgba(211, 211, 211, 0.251); /* Color of the thumb */
    border-radius: 10px; /* Rounded corners */
    position: relative;
    bottom: 0;
    right: 0;
}
.allMessages{
    position: relative;
    height: 85%;
    width: 100%;
    overflow:auto;
    scroll-behavior: smooth;
    /* display: block; */
    /* display: block; */
    
}


.messagesLayout{
    /* position: absolute; */
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    box-sizing: border-box;
    
}


</style>