import { createApp } from 'vue'
import Chat from './Chat.vue'
import Library from './components/Library.vue'
import Timer from './components/Timer.vue'
import ToDoList from './components/ToDoList.vue'
import Notifications from './Notifications.vue'
import VC from './components/VC.vue'
// localStorage.clear()

// let result = prompt("Enter Username ")
localStorage.setItem('admin', "samer@mail.com")
// localStorage.setItem('email', "samer@mail.com")
// localStorage.setItem('userName', "samer")

while( localStorage.getItem('name') === "null" || localStorage.getItem('name') === "" ){
    let result = prompt("Please Enter Username ")
    localStorage.setItem('name', result)
}

createApp(Chat).mount('#chat');
createApp(Library).mount('#library');
createApp(Timer).mount('#timer');
createApp(ToDoList).mount('#todo');
createApp(Notifications).mount('#notifications');