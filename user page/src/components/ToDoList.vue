<template>
    <div class="cnt">
      <input id="taskText" type="text" placeholder="Enter your note ... " v-model="newTask" @keyup.enter="addTask">
      <button @click="addTask">Add</button>
      <div id="trash" @click="clearTasks"> <i class="fa-solid fa-trash"></i></div>
    </div>
    <ul class="todoTasks">
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" v-model="task.checked">
        <label>{{ task.text }}</label>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: 'ToDoList',
    data() {
      return {
        tasks: [],
        newTask: ''
      };
    },
    methods: {
      addTask() {
        if (this.newTask.trim() !== '') {
          this.tasks.push({ text: this.newTask.trim(), checked: false });
          this.newTask = '';
        }
      },
      clearTasks() {
        this.tasks = this.tasks.filter(task => !task.checked);
      }
    }
  };
  </script>

<style>
li{
    display: flex;
    justify-content: flex-start;
    align-items:center;
    /* box-shadow: 0px 0px 2px rgb(113, 110, 110); */
    /* border: 1px solid rgba(245, 245, 245, 0.361); */
    background-color: rgba(55, 123, 226, 0.37);
    transform: translate(-10%, 0%);
    font-family: cursive;
    margin: 2.5px;
    max-width: 100%;
    border-radius: 10px;
    padding: 5px;
}
li:hover{
    background-color: rgb(146, 204, 252);
}
li input{
    color: black;
    cursor: pointer;
    width:20px;
    height: 20px;
    border-radius: 80%;
    background-color: transparent;
    border: 1px solid rgb(252, 146, 146);
}

li input:checked{
    accent-color: black;
}
li input:checked~label{
    text-decoration: line-through;
}
li label{
    display: inline-block;
    padding-left: 5px;
    font-size: 20px;
    
}

.todo{
    width: 300px;
  height: 200px;
  background-image: linear-gradient(to right top, rgb(185, 185, 185,.45), rgba(104, 104, 104, 0.6), rgba(237, 237, 237, 0.73)) ;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transform: translate(395%,60%);
  position: fixed;
  padding: 10px;
  
  justify-content: space-evenly;
  animation-name: noteSlide;
  animation-duration: 1s; 
}
#todoText::placeholder {
  color:black;
  
}
#Text {
  border-color: rgb(149, 197, 38); /* Change the input border color to blue */
}
.todoTasks{
    height: 150px;
    overflow-y: auto;
}

.todo button{
  background-image: linear-gradient(to right top, rgb(185, 185, 185,.45), rgba(104, 104, 104, 0.6), rgba(237, 237, 237, 0.73)) ;
    border: 1px solid;
    transform: translate(20%, -5%);
    height: 30px;
    border-radius: 15px;
}

.todo button:hover{
  background-image: linear-gradient(to right top, rgba(237, 237, 237, 0.73), rgba(104, 104, 104, 0.6),rgb(185, 185, 185,.45) ) ;
}
</style>