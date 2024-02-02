<template>
<img class="background" src="../assets/back.jpg">
    <div class="header">
        <div class="pic">
            <img src="../assets/Picture1.png" class="logo">
            <h1>Studiando</h1>
        </div>
        <nav class="navigation">
            <router-link to="/">Home</router-link> 
        </nav>
    </div>
    <div class="sign-in">
        <div class="sign-in-box" id="signInBox">
            <form id="form">
                <h1>Sign In</h1>
                <div class="i" id="em">
                    <input type="email" required id="email" v-model="this.email">
                    <label class="l">Email</label>
                    <span id="emSpan"></span>
                </div>
                <h5 id="emailLabel">{{ emailError }}</h5>
                <div class="i" id="pw">
                    <input type="password" required id="password" v-model="this.password"> 
                    <label class="l">Password</label>
                    <span id="pwSpan"></span>
                </div>
                <h5 id="passwordLabel">{{ passwordError }}</h5>
                <div class="b">
                    <input type="button" value="Log In" id="signIn" @click="logIn">
                </div>
                <div class="link">
                    <router-link to="/ForgotPassword">Forgot password?</router-link> 
                </div>
                <div class="link">
                    <label>Don't have an account?</label>
                    <router-link to="/SignUp">Register</router-link> 
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default{
    name: "LogIn",
    data(){
        return{
            userData:{},
            email: null, 
            password: null,
            emailError: "", 
            passwordError: ""
        }
    },
    methods:{
        async saveUser(){
            localStorage.setItem("username", JSON.stringify(this.userData.userName));
            localStorage.setItem("email", JSON.stringify(this.userData.email));
            await fetch("https://textchat-159f4-default-rtdb.firebaseio.com/users.json", {
              method: "post",
              headers: {
                'Content-type': "application/json; charset=UTF-8"
              },
              body: JSON.stringify(this.userData),

          })
        },
        async logIn(){
            if (!this.checkEmail()){
                return
            }
            if (!this.checkPassword()){
                return
            }
            
            const jsonFile =  await fetch("https://textchat-159f4-default-rtdb.firebaseio.com/users.json")
            let result= await jsonFile.json()
            let userCheck1 = null
            let userCheck2 = null
            let emailCheck = false
            let passwordCheck = false
            for( let message in result ){
                // users[result[message]['index']-1] = result[message]
                if (result[message].email == this.email){
                    userCheck1 = result[message]
                    emailCheck = true
                    break
                }
            }
            for( let message in result ){
                if (result[message].password == this.password){
                    userCheck2 = result[message]
                    passwordCheck = true
                }
            }
            if (!passwordCheck || userCheck1 !== userCheck2){
                this.passwordError = "wrong password"
                document.getElementById('password').style.borderBottom = "2px solid red"
                document.getElementById('passwordLabel').style.color = "red"
                return false
            }else if (!emailCheck){
                this.emailError = "wrong email"
                document.getElementById('email').style.borderBottom = "2px solid red"
                document.getElementById('emailLabel').style.color = "red"
                return false
            }else{
                this.userData = userCheck1
                this.passwordError = ""
                document.getElementById('password').style.borderBottom = "2px solid white"
                document.getElementById('passwordLabel').style.color = "white"
                localStorage.setItem("userName", JSON.stringify(this.userData.userName));
                localStorage.setItem("email", JSON.stringify(this.userData.email));
                this.$router.push('/Welcome')
                window.location.href = 'http://localhost:8081/';
            }
                
        },
        checkEmail(){
            if(this.email == null){
                this.emailError = "Please type in your desired email"
                document.getElementById('email').style.borderBottom = "2px solid red"
                document.getElementById('emailLabel').style.color = "red"
                return false
            }
            else if(!String(this.email).includes("@gmail.com")){
                this.emailError = "your email must be a valid gmail one"
                document.getElementById('email').style.borderBottom = "2px solid red"
                document.getElementById('emailLabel').style.color = "red"
                return false
            }
            else{
                this.emailError = ""
                document.getElementById('email').style.borderBottom = "2px solid white"
                document.getElementById('emailLabel').style.color = "white"
                return true
            }
        },
        checkPassword(){
            if(this.password == null){
                this.passwordError = "Please type in your desired password"
                document.getElementById('password').style.borderBottom = "2px solid red"
                document.getElementById('passwordLabel').style.color = "red"
                return false
            }
            else if (this.password.length < 8){
                this.passwordError = "Password must be at least 8 characters"
                document.getElementById('password').style.borderBottom = "2px solid red"
                document.getElementById('passwordLabel').style.color = "red"
                return false
            }else{
                this.passwordError = ""
                document.getElementById('password').style.borderBottom = "2px solid white"
                document.getElementById('passwordLabel').style.color = "white"
                return true
            }
        },
            
    }
}
</script>
<style>
.sign-in {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 100vb;
    overflow: hidden;
    height: 30%;
}

.sign-in-box {
    position: absolute;
    background-color: transparent;
    box-shadow: 5px 0px 10px rgb(117, 117, 221);
    backdrop-filter: blur(20px);
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1%;
    height: fit-content;
    width: fit-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    border: 1px solid #fff;
    font-size: 15px;
    animation-name: slidein2;
    animation-duration: 1.5s;
}

.sign-in-box h1 {
    color: #fff;
    font-size: 50px;
    font-family: 'Proxima Nova';
}

.sign-in-box .i {
    margin-top: 10%;
    display: flex;
    font-size: 30px;
}

.sign-in-box .i .l {
    transform: translate(10%, 0%);
    position: absolute;
    color: rgba(233, 208, 224, 0.364);
    pointer-events: none;
    transition-duration: .5s;
}

.sign-in-box .i input:focus-visible~.l,
.sign-in-box .i input:valid~.l {
    transform: translate(10%, -100%);
    color: rgb(249, 245, 247);
}

.sign-in-box .i input:focus {
    border-bottom: 2px solid rgb(209, 17, 139);
}

.sign-in-box .i input {
    font-size: 30px;
    padding-inline-start: 10%;
    background-color: transparent;
    border-color: transparent;
    border-bottom: 2px solid #fff;
    outline: none;
    width: 100%;
    color: #fff;
}

.sign-in-box .b {
    margin-top: 10%;
}

.sign-in-box .b input {
    background-color: #353dd468;
    font-size: 30px;
    color: #fff;
    width: 100%;
    border-radius: 20px;
    cursor: pointer;
}

.sign-in-box .link {
    color: #fff;
    font-size: 20px;
    margin-top: 5%;
}

.sign-in-box .link a {
    color: rgb(100, 182, 234);
    font-size: 20px;
}

.sign-in-box .b input:hover {
    background-color: rgb(209, 17, 139);
}

.sign-in-box .link a:hover {
    color: #5910eb;
}

.input{
    margin-top: 8%;
    font-size: 30px;
    padding-inline-start: 10%;
    background-color: transparent;
    border-color: transparent;
    border-bottom: 2px solid #fff;
    outline: none;
    /* width: 100%; */
    color: #fff;
}
#forgotBox{
    display: none;
}
.sendbtn {
    margin-top: 10%;
    background-color: #353dd468;
    font-size: 30px;
    color: #fff;
    width: 80%;
    border-radius: 20px;
    cursor: pointer;
}
.sendbtn:hover{
    background-color: #f10cb868;
}
.inputLabel{
    transform: translate(-390%, 150%);
    position: absolute;
    color: rgba(233, 208, 224, 0.364);
    pointer-events: none;
    transition-duration: .5s;
    font-size: 25px;
    width: fit-content;
}
.input:focus-visible~.inputLabel,
.input:valid~.inputLabel {
    transform: translate(-390%, 50%);
    color: rgb(249, 245, 247);
}
.inputLabel2{
    transform: translate(-210%, 150%);
    position: absolute;
    color: rgba(233, 208, 224, 0.364);
    pointer-events: none;
    transition-duration: .5s;
    font-size: 25px;
    width: fit-content;
}
.input:focus-visible~.inputLabel2,
.input:valid~.inputLabel2 {
    transform: translate(-210%, 50%);
    color: rgb(249, 245, 247);
}
.input:focus {
    border-bottom: 2px solid rgb(209, 17, 139);
}
.forgotBox h1 {
    color: #fff;
    font-size: 50px;
    font-family: 'Proxima Nova';
}

#newPasswordBox{
    display: none;
}
#newPasswordBox h1{
    color: #fff;
    font-size: 50px;
    font-family: 'Proxima Nova';
}
</style>