<template>
<img class="background" src="../assets/back.jpg">
    <div class="header">
        <div class="pic">
            <img src="../assets/Picture1.png" class="logo">
            <h1>Studiando</h1>
        </div>
        <nav class="navigation">
            <router-link to="/">Home</router-link> 
            <router-link to="/LogIn">LogIn</router-link> 
        </nav>
    </div>
    <div class="sign-Up">
        <div class="Sign-Up-box">
            <form>
                <div class="format">
                    <legend>Sign Up</legend>
                </div>
                <br>
                <div class="name">
                    <div class="inputs" v-show="!this.codeCheck">
                        <input type="text" id="firstName" v-model="this.userData.fName" required>
                        <label id="fn">First Name</label>
                        <span id="fnSpan"></span>
                    </div>
                    <h5 id="fNameLabel">{{ fNameError }}</h5>
                    <div class="inputs" id="ln" v-show="!this.codeCheck">
                        <input type="text" id="lastName" v-model="this.userData.lName" required>
                        <label>Last Name</label>
                        <span id="lnSpan"></span>
                    </div>
                    <h5 id="lNameLabel">{{ lNameError }}</h5>
                </div>
                <div class="inputs" id="un" v-show="!this.codeCheck">
                    <input type="text" id="userName" v-model="this.userData.userName" required>
                    <label>Username</label>
                    <span id="unSpan"></span>
                </div>
                <h5 id="userNameLabel">{{ userNameError }}</h5>
                <div class="inputs" id="em" v-show="!this.codeCheck">
                    <input type="email" id="email" v-model="this.userData.email" required>
                    <label>Email</label>
                    <span id="emSpan"></span>
                </div>
                <h5 id="emailLabel">{{ emailError }}</h5>
                <div class="inputs" id="pw" v-show="!this.codeCheck">
                    <input type="password" id="password" v-model="this.userData.password" required>
                    <label>Password</label>
                    <i class='fas fa-eye' id="showPassword"></i>
                    <span id="pwSpan"></span>
                </div>
                <h5 id="passwordLabel">{{ passwordError }}</h5>
                
                <div class="inputs" id="cp" v-show="!this.codeCheck">
                    <input type="password" id="confirmP" v-model="this.cPassword" required>
                    <label>Confirm Password</label>
                    <span id="cpSpan"></span>
                </div>
                <h5 id="cPasswordLabel">{{ cPasswordError }}</h5>
                <div class="inputs" id="bd" v-show="!this.codeCheck">
                    <input type="date" id="birthday" v-model="this.userData.dateOfBirth" required>
                    <label>Birthday</label>
                    <span id="bdSpan"></span>
                </div>
                <h5 id="dateLabel">{{ dateError }}</h5>
                <div class="inputs" id="codeArea" v-show="this.codeCheck">
                    <input type="text" id="codeField" v-model="this.codeWritten" required>
                    <label>Validation Code</label>
                    <span id="codeSpan"></span>
                </div>
                <h5 id="codeLabel">{{ codeError }}</h5>
                <div class="gender" id="gn" v-show="!this.codeCheck">
                    <div class="r">
                        <input type="radio" name="gender" v-model="this.userData.gender" value="male" id="gender" required>
                        <label for="male">Male</label>
                    </div>
                    <div class="r">
                        <input type="radio" name="gender" v-model="this.userData.gender" value="female" id="gender" required>
                        <label for="female">Female</label>
                    </div>
                    <br>
                </div>
                <h5 id="genderLabel">{{ genderError }}</h5>
                <div class="button" v-if="!this.codeCheck" @click="sendCode">
                    <input type="button" id="code" value="sendCode" />
                </div>
                <div class="button" v-show="this.codeCheck">
                    <input type="button" id="signUp" value="signUp" @click="submit"/>
                </div>
                <h5 id="policyLabel">{{ policyError }}</h5>
                <div class="policy" id="p" v-show="!this.codeCheck">
                    <div id="cookiesBox" v-if="this.check">
                        <p>{{policyData}}</p>
                    </div>
                    <input type="checkbox" id="policy" v-model="this.policyCheck" required>
                    <label id="policyL"> agree to app cookies?   </label>
                    <a @click="openCookies">{{status}} cookies</a>
                </div>
                <div class="link">
                    <label>Already have an account?</label>
                <router-link to="/LogIn">LogIn</router-link> 
                </div>
            </form>
        </div>
    </div></template>

<script>
import emailjs from 'emailjs-com' 


export default{
    name: "SignUp",
    data(){
        return{
            userData:{
                fName: null,
                lName: null,
                userName:null,
                password: null,
                email: null,
                dateOfBirth: null,
                gender: null, 
            },
            usersPath:"C:/Users/KimoStore/Desktop/homepage/UserData/",
            policyData: "We use essential cookies to make sure the site can function. We also use optional cookies for advertising, personalisation of content, usage analysis, and social media.By accepting optional cookies, you consent to the processing of your personal data.",
            check: false,
            status: "show",
            codeCheck: false,
            codeWritten: null,
            code: null,
            cPassword: null,
            policyCheck: false,
            passwordError: "",
            fNameError: "",
            lNameError: "",
            cPasswordError: "",
            emailError: "",
            userNameError: "",
            genderError: "",
            dateError: "",
            policyError: "",
            checkEmailExcestance: false
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
        openCookies(){
            if (this.check){
                this.check = false
                this.status= "show"
            }
            else{
                this.check = true
                this.status= "hide"
            }
        },
        codeFieldAppear(){
            this.code= true
        },
        creatCode() {
            let code
            let codeString
            for (let i = 0; i < 4; ++i) {
                code = Math.floor(Math.random(33, 126) * (126 - 33 + 1)) + 33
                codeString += String.fromCharCode(code)
            }
            return codeString.replace("undefined", "")
        },
        async sendCode(){
            if(!this.checkFName()){
                return
            }
            if(!this.checkLName()){
                return
            }
            if(!this.checkUserName()){
                return
            }
            if(!this.checkEmail()){
                return
            }
            if (!this.checkEmailExcestance){
                return
            }
            if (!this.checkPassword()){
                return
            }
            if (!this.checkCPassword()){
                return
            }
            if (!this.checkDate()){
                return
            }
            if (!this.checkGender()){
                return
            }
            if (!this.checkPolicy()){
                return
            }
            
            this.codeFieldAppear()
            this.code = this.creatCode()
            this.codeCheck = true
            emailjs.init('K-zngERFQ9nkp9fB5')
            emailjs.send("service_j4cifp3", "template_83bk1g4",{
                email: this.email,
                to_name: this.userData.userName,
                code: this.code
            }).then(() => {
                alert('Sent!');
            },
                (err) => {
                    alert(JSON.stringify(err));
                }
            );
            alert(this.code)
            console.log(this.code)
        },
        submit(){
            if(!this.checkCode()){
                return
            }
            if(this.saveUser()){
                this.$router.push('/Welcome')
            }

        },
        checkFName(){
            if(this.userData.fName == null){
                this.fNameError = "Please type in your first name"
                document.getElementById('firstName').style.borderBottom = "2px solid red"
                document.getElementById('fNameLabel').style.color = "red"
                return false
            }
            else{
                this.fNameError = ""
                document.getElementById('firstName').style.borderBottom = "2px solid white"
                document.getElementById('fNameLabel').style.color = "white"
                return true
            }
        },
        checkLName(){
            if(this.userData.lName == null){
                this.lNameError = "Please type in your last name"
                document.getElementById('lastName').style.borderBottom = "2px solid red"
                document.getElementById('lNameLabel').style.color = "red"
                return false
            }
            else{
                this.lNameError = ""
                document.getElementById('lastName').style.borderBottom = "2px solid white"
                document.getElementById('lNameLabel').style.color = "white"
                return true
            }
        },
        checkUserName(){
            if(this.userData.userName == null){
                this.userNameError = "Please type in your desired username"
                document.getElementById('userName').style.borderBottom = "2px solid red"
                document.getElementById('userNameLabel').style.color = "red"
                return false
            }
            else{
                this.userNameError = ""
                document.getElementById('userName').style.borderBottom = "2px solid white"
                document.getElementById('userNameLabel').style.color = "white"
                return true
            }
        },
        async checkEmail(){
            if(this.userData.email == null){
                this.emailError = "Please type in your desired email"
                document.getElementById('email').style.borderBottom = "2px solid red"
                document.getElementById('emailLabel').style.color = "red"
                return false
            }
            else if(!String(this.userData.email).includes("@gmail.com")){
                this.emailError = "your email must be a valid gmail one"
                document.getElementById('email').style.borderBottom = "2px solid red"
                document.getElementById('emailLabel').style.color = "red"
                return false
            }
            else{
                const jsonFile =  await fetch("https://textchat-159f4-default-rtdb.firebaseio.com/users.json")
                let result= await jsonFile.json()
                for( let message in result ){
                    if (result[message].email == this.userData.email){
                        this.checkEmailExcestance = true
                        break
                    }
                }  
                if (this.checkEmailExcestance){
                    this.emailError = "Email already excests"
                    document.getElementById('email').style.borderBottom = "2px solid red"
                    document.getElementById('emailLabel').style.color = "red"
                    return false
                }
                this.checkEmailExcestance = false
                this.emailError = ""
                document.getElementById('email').style.borderBottom = "2px solid white"
                document.getElementById('emailLabel').style.color = "white"
                return true
            }
        },
        checkPassword(){
            if(this.userData.password == null){
                this.passwordError = "Please type in your desired password"
                document.getElementById('password').style.borderBottom = "2px solid red"
                document.getElementById('passwordLabel').style.color = "red"
                return false
            }
            else if (this.userData.password.length < 8){
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
        checkCPassword(){
            if(this.cPassword == null){
                this.cPasswordError = "Please type in your desired password"
                document.getElementById('confirmP').style.borderBottom = "2px solid red"
                document.getElementById('cPasswordLabel').style.color = "red"
                return false
            }
            else if (this.userData.password !== this.cPassword){
                this.cPasswordError = "this password doesn't match password you have written"
                document.getElementById('confirmP').style.borderBottom = "2px solid red"
                document.getElementById('cPasswordLabel').style.color = "red"
                return false
            }else{
                this.cPasswordError = ""
                document.getElementById('confirmP').style.borderBottom = "2px solid white"
                document.getElementById('cPasswordLabel').style.color = "white"
                return true
            }
        },
        checkDate(){
            if(this.userData.dateOfBirth == null){
                this.dateError = "Please type in your date of birth"
                document.getElementById('birthday').style.borderBottom = "2px solid red"
                document.getElementById('dateLabel').style.color = "red"
                return false
            }
            else{
                const temp = this.userData.dateOfBirth.indexOf('-')
                const enterdYear = Number(this.userData.dateOfBirth.substring(0, temp))
                const currentYear = new Date().getFullYear()
                if (enterdYear > currentYear){
                    this.dateError = "year of birth has't come yet :)"
                    document.getElementById('birthday').style.borderBottom = "2px solid red"
                    document.getElementById('dateLabel').style.color = "red"
                    return false
                }
                else if (currentYear - enterdYear < 6){
                    this.dateError = "To enroll you have to be at least 6 years old"
                    document.getElementById('birthday').style.borderBottom = "2px solid red"
                    document.getElementById('dateLabel').style.color = "red"
                    return false
                }
                this.dateError = ""
                document.getElementById('birthday').style.borderBottom = "2px solid white"
                document.getElementById('dateLabel').style.color = "white"
                return true
            }
        },
        checkGender(){
            if(this.userData.gender == null){
                this.genderError = "Please select your gender"
                document.getElementById('gender').style.borderBottom = "2px solid red"
                document.getElementById('genderLabel').style.color = "red"
                return false
            }
            else{
                this.genderError = ""
                document.getElementById('gender').style.borderBottom = "2px solid white"
                document.getElementById('genderLabel').style.color = "white"
                return true
            }
        },
        checkCode(){
            if(this.codeWritten == null){
                this.codeError = "Please enter code sent to you on the email you enterd"
                document.getElementById('codeField').style.borderBottom = "2px solid red"
                document.getElementById('codeLabel').style.color = "red"
                return false
            }
            else if(this.code !== this.codeWritten){
                this.codeError = "this code doesn't match the code sent to your email"
                document.getElementById('codeField').style.borderBottom = "2px solid red"
                document.getElementById('codeLabel').style.color = "red"
                return false
            }
            else{
                this.codeError = ""
                document.getElementById('codeField').style.borderBottom = "2px solid white"
                document.getElementById('codeLabel').style.color = "white"
                return true
            }
        },
        checkPolicy(){
            if(this.policyCheck == false){
                this.policyError = "Please agree to our conditions"
                document.getElementById('policyL').style.color = "red"
                document.getElementById('policyLabel').style.color = "red"
                return false
            }
            else{
                this.policyError = ""
                document.getElementById('policyL').style.color = "white"
                document.getElementById('policyLabel').style.color = "white"
                return true
            }
        },

    }
}
</script>
<style>
.show {
    opacity: 1;
}

.hide {
    opacity: 0;
}

.sign-Up {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 100vb;
    height: 30%;
    /* color: #f27272; */
}

.Sign-Up-box {
    display: flex;
    position: absolute;
    justify-content: center;
    color: white;
    background-color: transparent;
    box-shadow: 5px 0px 10px rgb(117, 117, 221);
    backdrop-filter: blur(100px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    text-align: center;
    border: 1px solid #fff;
    border-radius: 20px;
    padding: 1%;
    height: fit-content;
    animation-name: slidein2;
    animation-duration: 1.5s;
}

@keyframes slidein2 {
    from {
        margin-top: 50%;
    }

    to {
        margin-top: normal;
    }
}

.inputs {
    margin: 10px;
}

.inputs input[type="date"] {
    cursor: text;
}

.inputs .button input[type="button"] {
    background-color: rgba(102, 51, 153, 0.277);
    width: 100px;
    height: 50px;
    color: #fff;
    border-radius: 25px;
    font-size: 20px;
}

.inputs input[type="button"]:hover {
    background-color: rgb(102, 51, 153);
}

.inputs a {
    color: #c95959;
    font-size: 15px;
}

.inputs a:hover {
    color: #354dd4;
}

.Sign-Up-box legend {
    font-size: 50px;

}

.Sign-Up-box input {
    width: 100%;
    height: 100%;
    padding-inline-start: 10px;
    padding-inline-end: 10px;
    color: #fff;
    background: transparent;
    border-color: transparent;
    outline: none;
    border-bottom: 2px solid #faf7f7;
    margin-top: 10%;
    pointer-events: inherit;
    font-size: 20px;
}

.Sign-Up-box input[type="date"] {
    color: transparent;

}

.Sign-Up-box .inputs {
    display: flex;
}

.Sign-Up-box .inputs label {
    pointer-events: none;
    transform: translate(10%, 100%);
    position: absolute;
    color: #efe7e7c0;
    transition: .5s;
    font-size: 18px;
    font-weight: bold;
}

.Sign-Up-box input:focus~label,
.Sign-Up-box input:valid~label {
    transform: translate(10%, -10%);
    color: #f9f9f9;
}


.Sign-Up-box input:focus,
.Sign-Up-box input:valid {
    color: #fff;
    border-bottom: 2px solid #2525f7;
    background: transparent;

}

.gender {
    display: flex;
    justify-content: space-evenly;

}

.gender .r input {
    width: 15px;
    height: 15px;
    cursor: pointer;
}

.fa-eye {
    position: absolute;
    right: 10%;
    cursor: pointer;
    margin-top: 30px;
}


.button input {
    background-color: #2525f755;
    border-radius: 20px;
    outline: none;
    border-color: transparent;
    margin-top: 1%;
    cursor: pointer;
    font-size: 30px;
}

.button input:hover {
    background-color: #2525f7;

}

.link {
    margin-top: 2%;
}

.link a {
    color: rgb(225, 255, 0);

}

.link a:hover {
    color: rgb(221, 54, 193);
}

.policy {
    align-items: center;
    justify-content: center;
}

.policy a {
    color: rgb(225, 255, 0);
}

.policy a:hover {
    color: rgb(221, 54, 193);
}

.policy input[type="checkbox"] {
    width: 15px;
    height: 15px;
    cursor: pointer;
}

#cookiesBox {
    position: absolute;
    padding: 5%;
    transform: translate(120%, -50%);
    background-color: rgb(203, 176, 219);
    border-radius: 5px;
    border: 1px solid black;
    color: black;
    animation-name: slide;
    animation-duration: 1.5s;
    z-index: -1;
    overflow: hidden;
    box-shadow: 5px 0px 5px rgb(47, 47, 74);
}

@keyframes slide {
    from {
        transform: translate(100%, -50%);;
    }

    to {
        transform: translate(120%, -50%);;
    }
}

a {
    cursor: pointer;
}

</style>