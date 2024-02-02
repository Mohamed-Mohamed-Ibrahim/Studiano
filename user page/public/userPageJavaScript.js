const App = Vue.createApp({
    data(){
        return{
            chatSwitch: false,
            featuresSwitch: false,
            optionsSwitch: false,
            notsSwitch: false,
            librarySwitch: false,
            todoSwitch: false,
            notes: [], 
            newNote: "",
            theme: "night",
            timerSwitch: false,
            notificationsSwtich: false,
        }
    },
    methods:{
        switchNotifications(){
            
            if (this.notificationsSwtich){ 
                this.notificationsSwtich = false;
                document.getElementById('ch3').style.backgroundColor="aliceblue";
                
            }
            else {
                this.notificationsSwtich = true;
                document.getElementById('ch3').style.backgroundColor="aqua";
                this.chatSwitch = false;
                document.getElementById('ch1').style.backgroundColor="aliceblue";
                
            }
        },
        switchChat(){
            if (this.chatSwitch){ 
                this.chatSwitch = false;
                document.getElementById('ch1').style.backgroundColor="aliceblue";
                
            }
            else {
                this.chatSwitch = true;
                document.getElementById('ch1').style.backgroundColor="aqua";
                this.notificationsSwtich = false;
                document.getElementById('ch3').style.backgroundColor="aliceblue";
            }
        },
        switchFeatures(){
            if (this.featuresSwitch) this.featuresSwitch = false;
            else this.featuresSwitch = true;
        },
        switchOptions(){
            if(this.optionsSwitch) this.optionsSwitch = false;
            else this.optionsSwitch = true;
        },
        switchLibrary(){
            if(this.librarySwitch){ 
                this.librarySwitch = false;
                document.getElementById('libraryButton').style.backgroundColor="transparent";
            }
            else {
                this.librarySwitch = true;
                document.getElementById('libraryButton').style.backgroundColor="aliceblue";
            }
        },
        switchTodo(){
            if(this.todoSwitch){
                this.todoSwitch = false;
                document.getElementById('f2').style.backgroundColor="rgb(65, 149, 223)";
            }
            else {
                this.notsSwitch = false;
                this.todoSwitch = true;
                document.getElementById('f2').style.backgroundColor="aliceblue";
                document.getElementById('f3').style.backgroundColor="rgb(65, 149, 223)";
            }
        },
        switchNotes(){
            if(this.notsSwitch){ 
                this.notsSwitch = false;
                document.getElementById('f3').style.backgroundColor="rgb(65, 149, 223)";
            }
            else{ 
                this.notsSwitch = true;
                this.todoSwitch = false;
                document.getElementById('f3').style.backgroundColor="aliceblue";
                document.getElementById('f2').style.backgroundColor="rgb(65, 149, 223)";
            }
        },
        
        switchTimer(){
            if (this.timerSwitch){ 
                this.timerSwitch = false;
                document.getElementById('f1').style.backgroundColor="rgb(65, 149, 223)";
            }
            else {
                this.timerSwitch = true;
                document.getElementById('f1').style.backgroundColor="aliceblue";
            }
        },
        addNote() {
            if (this.newNote.trim() !== "") {
              this.notes.push(this.newNote.trim());
              this.newNote = "";
            }
          },
          clearNotes() {
            this.notes = [];
          }
        ,
        computed: {
          formattedNotes() {
            return this.notes.map(note => '${note}<br>').join('');
          }
        },
        changeTheme() {
            if (this.theme === "day") {
              this.theme = "night";
              document.getElementById("background_video").src="darkthemebackgroudn.mp4";
              document.querySelector("#themeButton").classList.replace("fa-moon", "fa-sun");
              document.getElementById("chat").style.backgroundImage = 'url("https://w0.peakpx.com/wallpaper/580/650/HD-wallpaper-whatsapp-bg-dark-background-thumbnail.jpg")';
            } else {
                this.theme = "day";
                document.getElementById("background_video").src="light theme background.mp4";
                document.querySelector("#themeButton").classList.replace("fa-sun", "fa-moon");
                document.getElementById("chat").style.backgroundImage = 'url("https://w0.peakpx.com/wallpaper/557/521/HD-wallpaper-whatsapp-v-background-doodle-pattern-patterns-whatsapp-thumbnail.jpg")';
            }
          },
        logout(){
            window.location.href = 'http://localhost:8080/';
        }
          
    }
});

App.mount('body');