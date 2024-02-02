<template>
    <div v-for="(file, index) in files" :key="index">
          <p>{{ file.name }}</p>
          <button class="libraryCrlBtn" @click="deleteFile(index)">Delete</button>
          <button class="libraryCrlBtn" @click="toggleFrame(index)">
            <span v-if="file.showFrame">Hide PDF</span>
            <span v-if="!file.showFrame">Show PDF</span>
            
          </button>
          
          <div v-if="file.showFrame" class="frame-container">
            <iframe v-bind:src="file.url"></iframe>
          </div>
          
    </div>
</template>

<script>
export default{
    name: 'Frame-Container',
    props: ['files'],
    methods:{
        toggleFrame(index) {
          this.files[index].showFrame = !this.files[index].showFrame;
          
        },
        deleteFile(index) {
          URL.revokeObjectURL(this.files[index].url); // Revoke the object URL
          this.files.splice(index, 1);
        },
    }
}
</script>

<style>
p{
  color: rgb(93, 93, 93);
}
::-webkit-scrollbar {
    width: 5px;
    height: 0px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #170404;
    border-radius: 2.5px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(14, 184, 222);
    
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(194, 58, 192);
    
  }

  .libraryCrlBtn{
    background-color: rgb(58, 194, 92);
    border-radius: 15px;
    margin: 5px;
    
  }

  .libraryCrlBtn:hover{
    background-color: rgb(233, 168, 232)
  }
.frame-container {
      width: 105%;
      height: calc(100vh - 40px);
    }
</style>