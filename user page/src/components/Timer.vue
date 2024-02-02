<template>

<TimerComponent></TimerComponent>

</template>

<script>

import TimerComponent from "./TimerComponent" ;

export default {
  name: 'Timer',
  components: {
    TimerComponent
  }
}
</script>

<style>
#timer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  margin-top: 55px;
  width: fit-content;
  position: fixed;
  transform: translate(600%, -50%);
  animation-duration: .8s;
  animation-name: timerFadeIn;
}

@keyframes timerFadeIn {
  from{
      transform: translate(600%,-70%);
  }
  to{
      transform: translate(600%,-50%);
  }
}

</style>
