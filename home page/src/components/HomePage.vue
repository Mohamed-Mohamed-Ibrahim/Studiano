<template>
<video autoplay muted plays-inline class="background">
            <source src="../assets/video.mp4" type= "video/mp4">
        </video>
        <div class="header">
            <div class="pic">
                <img src="../assets/Picture1.png" class="logo">
                <h1>Studiando</h1>
            </div>
            <nav class="navigation">
                <router-link to="/">Home</router-link> 
                <router-link to="/LogIn">LogIn</router-link> 
                <button id="about" @click="moveToAbout">About</button>
            </nav>
        </div>
        <div class="info">
            <div class="text">
                <div class="bio">
                    <h1>Welcome to <br>&nbsp&nbsp&nbsp&nbsp Studiando</h1><br>
                    <h5>&nbsp&nbsp&nbsp&nbsp<span class="cmd-like-typing"> </span></h5>
                </div>
                <div class="buttons">
                    <router-link to="/HowToUse"><button id="how-to-use">How to use</button></router-link>
                    
                    <!-- <a href="file:///C:/Users/KimoStore/Desktop/Studiando%203/sign-up.html" class="sign-in-button"><button>Sign Up</button></a> -->
                    <router-link to="/SignUp" class="sign-in-button"><button>Sign Up</button></router-link> 
  
                </div>
            </div>
            
        </div>
        <!-- next javaScript code for the temrinal-like writing intro of text info -->
        <!-- <script src="https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js"></script>
        <script>
            var typed = new Typed(".cmd-like-typing",{
                strings: ["The goal of this App is to create a user-friendly webapp that combines an AI-powered search engine, Google Drive integration, an announcements section, text and voice chat features, and a collaborative to-do list. The website aims to improve communication and productivity for teams, whether they are students or professionals in various settings."],
                    typeSpeed: 30,  
                })
        </script> -->
        <div class="swip-screen">
            <div class="swip-content">
                <div class="authers" id= "a">
                    <h1>Webapp Developers</h1>
                    <div class="authers-content">
                        <div class="l-colomn">
                            <div class="omar">
                                <img src="../assets/Picture1.png" >
                                <h2>Eng/ Omar Hany</h2>
                            </div>
                            <div class="omnia">
                                <img src="../assets/Picture1.png" >
                                <h2>Eng/ Omnia Karem</h2>
                            </div>
                            <div class="mo-ibrahim">
                                <img src="../assets/Picture1.png" >
                                <h2>Eng/ Mohamed Mo. Ibrahim</h2>
                            </div>
                        </div>
                        <div class="r-colomn">
                            <div class="mo-mo">
                                <img src="../assets/mo-mo.png" >
                                <h2>Eng/ Mohamed Mo. Abdelmonaem</h2>
                            </div>
                            <div class="mo-hassan">
                                <img src="../assets/Picture1.png" >
                                <h2>Eng/ Mohamed Hassan</h2>
                            </div>
                            <div class="ibrahim">
                                <img src="../assets/ibrahim.jpg" >
                                <h2>Eng/ Ibrahim Mohamed</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="features" id="f">
                    <h1>App Features</h1>
                    <div class="row1">
                        <div class="chatbot item">
                            <h1>P</h1>
                            <h3>Pemo Chat bot</h3>
                        </div>
                        <div class="library item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            <h3> Open Library</h3>
                        </div>
                        <div class="drive item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hard-drive"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
                            <h3>Private Drive</h3>
                        </div>
                        <div class="text-chat item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            <h3>Text Chat</h3>
                        </div>
                    </div>
                    <div class="row2">
                        <div class="voice-chat item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            <h3>Voice Chat</h3>
                        </div>
                        <div class="stop-watch item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <h3>Stop Watch</h3>
                        </div>
                        <div class="video-chat item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                            <h3>Video Chat</h3>
                        </div>
                        <div class="to-do-list item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            <h3>Todo List</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swip-button">
                <button id="lbutton">
                    <i class="fa fa-chevron-left"></i>
                </button>
                <button id="rbutton">
                    <i class="fa fa-chevron-right"></i>
                </button>
            </div>
        </div>
        
        <div class="tailer">
            <h5>&copy 2023 Studiando | CSED | Alexandria University Scholars</h5>
        </div>
        
        <router-view/>
</template>
<script>
export default{
    name: "HomePage",
    data(){
        return{
        }
    },
    methods:{
        moveToAbout(){
            window.scrollTo({
                top: 750, 
                behavior: "smooth"
            });
        }
    }

}
</script>
<style>
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #170404;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(9, 90, 108);
    
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(92, 28, 176);
    
  }


/* home page */
* {
    margin: 0;
}

body {
    display: flexbox;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
    height: 10%;
    background-color: transparent;
    border-radius: 0 0 50px 50px;
    box-shadow: 0 0 5px rgb(119, 113, 113);
}

.pic {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.logo {
    transform: translate(20%, 0%);
    height: 100px;
    width: 100px;
    animation-duration: 1.5s;
    animation-name: fade;
}

.header h1 {
    color: #84149d;
}

.navigation a {
    color: #fff;
    font-size: 25px;
    margin-left: 40px;
    text-decoration: none;
    padding-right: 5px;
    transform: scaleX(0);
    transition: transform 1s;
    font-family: 'Times New Roman', Times, serif;
    cursor: pointer;

}

.navigation button {
    color: #fff;
    font-size: 25px;
    margin-left: 40px;
    padding-right: 5px;
    background-color: transparent;
    border: none;
    transition: transform 1s;
    cursor: pointer;
    font-family: 'Times New Roman', Times, serif;
    cursor: pointer;
}

.navigation a:hover,
.navigation button:hover {
    color: #fff;
    border-bottom: 2px solid #fff;
}

.background {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
}


.info {
    position: relative;
    display: flex;
    overflow: hidden;
    height: 42.5%;
    background-color: transparent;
    padding-bottom: 4%;
}

.text {
    width: 60%;
    margin: 20px;
    height: 100%;
}

.text .bio {
    height: 400px;
}

.info h1 {
    font-size: 90px;
    color: #fff;
}

.info h2 {
    font-size: 80px;
    color: #fff;
}

.text h1 {
    animation-duration: 1.5s;
    animation-name: slidein1;

}

@keyframes slidein1 {
    from {
        margin-top: 30%;
    }

    to {
        margin-top: normal;
    }
}


.info h5 {
    font-size: 15px;
    font-family: 'Courier New', Courier, monospace;
    color: #fff;
}

@keyframes fade {
    from {
        opacity: 0%;
    }

    to {
        opacity: 100%;
    }
}

.buttons {
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    margin-top: 5%;
    cursor: pointer;

}

.sign-in-button button {
    margin-right: 30px;
    color: #fff;
    background-color: #00ee5b3e;
    width: 200px;
    height: 70px;
    border-radius: 35px;
    border: none;
    font-size: 30px;

}

.sign-in-button button:hover {
    cursor: pointer;
    background-color: #00ee5b;
    color: #000;
}

#how-to-use {
    margin-left: 30px;
    color: #fff;
    background-color: #0057ee3d;
    width: 200px;
    height: 70px;
    border-radius: 35px;
    border: none;
    font-size: 30px;
    cursor: pointer;
}

#how-to-use:hover {
    cursor: pointer;
    background-color: #0057ee;
    color: #000;
}



#close {
    background-color: transparent;
    border: none;
    transform: translate(-300%, -800%);
    transition-duration: .5s;
    cursor: pointer;
}

#close:active {
    font-size: 30px;
}

.swip-screen {
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    height: 800px;
    width: 100%;
    background-image: linear-gradient(rgb(237, 234, 234), rgb(96, 239, 247));
    border-radius: 0 50px 0 0;
    margin-right: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.swip-screen .swip-content {
    display: flex;
}

.authers {
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    height: 100%;
    width: 100%;
    /* background-color: #00ee5b; */
    padding-top: 2%;
    padding-bottom: 2%;
    opacity: 1;
    transition-duration: 1s;
}

.authers-content {
    display: flex;
}

.authers-content h2 {
    color: #000;
}

.authers-content .l-colomn {
    background-color: transparent;
    width: 50%;
    align-items: center;
    /* padding-left: 5%;
    padding-right: 5%; */
    color: #000000;
}

.authers-content .r-colomn {
    width: 50%;
    background-color: transparent;
    align-items: center;
    /* padding-left: 5%;
    padding-right: 5%; */
    color: #000000;

}

.omar,
.omnia,
.mo-ibrahim,
.mo-mo,
.mo-hassan,
.ibrahim {
    display: flex;
    align-items: center;
    margin: 5%;
}

.authers-content .l-colomn .omar img,
.authers-content .l-colomn .omnia img,
.authers-content .l-colomn .mo-ibrahim img,
.authers-content .r-colomn .mo-mo img,
.authers-content .r-colomn .mo-hassan img,
.authers-content .r-colomn .ibrahim img {
    height: 150px;
    width: 150px;
    border-radius: 100%;
    border: 2px solid rgb(103, 103, 235);
    box-shadow: 0 20px 20px rgb(122, 114, 114);
    margin-right: 10%;
}

.features {
    /* background-color: #5535d4; */
    position: absolute;
    text-align: center;
    justify-content: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    height: fit-content;
    width: 100%;
    padding-top: 20%;
    padding-bottom: 7.9%;
    opacity: 0;
    transition-duration: 1s;
}

.features h1 {
    margin-bottom: 2%;
}

.features .row1 {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 50%;
    /* background-color: #000; */
}

.features .row2 {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 50%;
    /* background-color: #ea00ee; */
}

.item {
    align-items: center;
    width: 100px;
    height: 100px;
    justify-content: center;
    margin: 5px;
}

.item svg,
.item h1 {
    color: rgb(66, 22, 199);
}

.swip-button i {
    font-size: 35px;
}

.swip-button {
    justify-content: space-evenly;
    display: flex;

}

.swip-button button {
    background-color: transparent;
    color: #615f6d;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    border: none;
    transition-duration: 0.25s;
    cursor: pointer;
}

.swip-button button:hover {
    background-color: #ffffff68;
    color: #000000;
}

#lbutton:active {
    transform: translate(-20%, 0%);
}

#rbutton:active {
    transform: translate(20%, 0%);
}


.tailer {
    background-color: rgb(197, 235, 237);
    color: #0a0000;
    text-align: center;
    justify-content: center;
    border-top: 0.25px solid #fff;
    font-family: 'Courier New', Courier, monospace;
    padding-top: 2.5%;
    padding-bottom: 2%;
}
</style>