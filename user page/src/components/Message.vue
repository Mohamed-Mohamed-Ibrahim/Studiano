<template>
    <div :class="[ getNameFromLocal !== mess.name ? 'message' : 'userMessage' ]">
    <!-- <div class="userMessage"> -->
        <p>{{ mess.message }}</p>
        <br>
        <p class="personName">{{ mess.date }}     <br>  {{ mess.name }}</p>
        
    </div>
</template>

<script>

import Messages from './Messages.vue'

export default{
    name: 'Message',
    props: {
        mess: Object,
    },
    computed: {
        getNameFromLocal(){
            return localStorage.getItem('userName');
        }
    },
}

</script>



<style scoped>
.message{
    background-color: rgb(199, 115, 186);
    text-align: left;
    padding: 10px;
    align-self: flex-start;
    border-radius: 10px 10px 10px 0px;
    border: 1px solid rgba(255, 255, 255, 0.217);
    transition: border  3s;
    border-radius: 10px 10px 10px 0px; 
    margin: 1%; 
    
}

.userMessage{
    background-color: rgb(63, 133, 146);
    text-align: right;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.217);
    border-radius: 10px 10px 0px 10px; 
    transition: border  3s;
    align-self: flex-end;
    margin: 10px;
}

.personName{
    font-size: 10px;
    text-align: right;
}

.userMessage:hover{
    border: 1px solid black;
}

.message:hover{
    border: 1px solid black;
}

</style>