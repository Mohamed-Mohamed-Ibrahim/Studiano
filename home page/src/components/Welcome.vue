<template>
<img src="../assets/Welcome.jpg" class="background">
        <div>
            <img src="../assets/Picture1.png">
            <p>Welcome to Studiando</p>
        </div>
</template>
<script>
export default{
    name:"Welcome"
}
</script>
<style scoped>
body{
    margin: 0;
    display: flex;
    overflow: hidden;
}
.background{
    transform: translateY(-10%);
    max-width: 100%;
    height: auto;
    animation-name: slidein;
    animation-duration: 0.1s;
    
}
div {
    transform: translate(-250%, 50%);
    background-color: transparent;
    width: fit-content;
    height: fit-content;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    color: #fff;
    
}
div img{
    margin: 0px;
    animation-name: fadeSlideIn;
    animation-duration: 0.1s;
}
div p {
    margin: 0px;
    
}
@keyframes fadeSlideIn {
    from{
        opacity: 0;
        margin-bottom: 100%;
        size: 0%;
    }
    to{
        opacity: 1;
        margin-bottom: none;
        size: auto;
    }
}
@keyframes slidein {
    from{
        transform: translateY(-20%);
    }
    to{
        transform: translateY(-10%);
    }
}
</style>