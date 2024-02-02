<template>
    <!-- <span> -->
        <button @click="submitText()" class="submit" v-show="text">
            <i class="fa-regular fa-paper-plane sendButton" ></i>
        </button>
    <!-- </span> -->
</template>

<script>

export default{
    name: 'SubmitButton',
    props:{
        color: String,
        text: String
    },
    methods:{
        submitText(){
            return this.$emit('submitText');
        }
    }
}

</script>

<style>
.submit{
    background: none;
    border: 0px;
    height: 100%;
    width: 20%;
    position: absolute;
    right: 0;
    margin-top: 2px;
    margin-bottom: 2px;
    /* transition: all 2s ease-in; */
}

.sendButton{
    color:  white;
    transform: translate(-100%, 0%);
}

.sendButton:hover{
    color: rgb(26, 130, 220);
}

</style>