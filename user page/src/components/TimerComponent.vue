<template>
  <div>
    <div >
      <h3 class="time" id="time"> {{ formattedTime }}</h3>
      <div class="btnGroup" role="group">
        <button @click="pauseTimer" class="btn btn-light"><i class="fa-solid fa-pause"></i></button>
        <button @click="resumeTimer" class="btn btn-light"><i class="fa-solid fa-play"></i></button>
        <button @click="stopTimer" class="btn btn-light"><i class="fa-solid fa-stop"></i></button>
        <button @click="openAlert" class="btn btn-light"><i class="fa-solid fa-stopwatch"></i></button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTime: 0,
      time: 0,
      formattedTime: '00:00',
      timer: null,
      timerRunning: false,
      timerPaused: false,
    };
  },
  methods: {
    openAlert() {
      const inputTime = prompt("Set Timer (minutes):");
      if (inputTime !== null) {
        this.inputTime = parseInt(inputTime, 10);
        this.startTimer();
      }
    },
    startTimer() {
      document.getElementById('time').style.backgroundColor="rgb(255, 255, 255)";
      document.getElementById('time').style.color="black";
      if (!this.timerRunning) {
        this.time = this.inputTime * 60;

        this.timer = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            this.stopTimer();
            
          }
          this.updateFormattedTime();
        }, 1000);

        this.timerRunning = true;
        this.timerPaused = false;
      }
    },
    pauseTimer() {
      if (this.timerRunning && !this.timerPaused) {
        clearInterval(this.timer);
        this.timerPaused = true;
      }
    },
    resumeTimer() {
      if (this.timerRunning && this.timerPaused) {
        this.timer = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            this.stopTimer();
          }
          this.updateFormattedTime();
        }, 1000);

        this.timerPaused = false;
      }
    },
    stopTimer() {
      document.getElementById('time').style.backgroundColor="red";
      document.getElementById('time').style.color="white";
      clearInterval(this.timer);
      this.time = 0;
      this.updateFormattedTime();
      this.timerRunning = false;
      this.timerPaused = false;
    },
    updateFormattedTime() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
      this.formattedTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    },
    formatTime(value) {
      return value < 10 ? `0${value}` : value;
    },

  },
  beforeUnmount() {
    this.stopTimer();
  },
};
</script>

<style scoped>
.timer {
  background-image: url(https://wallpapercave.com/wp/wp10316584.jpg);
  border-radius: 50px;
  margin-left: 65%;
  padding: 1%;
  border: 2px solid;
  width: 15%;
  transition: opacity 0.5s;
}

.time {
  background-color: rgb(255, 255, 255);
  color: black;
  justify-content: center;
  margin-bottom: 10%;
  border-radius: 20px;
  margin-left: 15%;
  padding: 2%;
  display: flex;
  border: 2px solid;
  width: 80%;
}

.btn {
  border: 1px solid rgba(0, 0, 0, 0.297);
  box-shadow: -1px 0px 5px black;
  width: 40px;
  height: 40px;
  font-size: 20px;
  background: linear-gradient(to top right, #286cea,rgb(10, 126, 215), #81cef5);
  border-radius: 20px;  
  color: white;
}
.btn:hover{
  background: linear-gradient(to top right, #81cef5,rgb(10, 126, 215),#286cea);
  color: rgb(14, 13, 13);
}

.btnGroup{
  transform: translate(105%, -140%);
  
}
</style>
