<template>
  <UploadContainer :files = "files"></UploadContainer>
  <div class="frame-wrapper">
  <FrameContainer class="frame-container" :files = "files"></FrameContainer>
  </div>
</template>

<script>
import FrameContainer from './FrameContainer.vue'
import UploadContainer from './UploadContainer.vue'


export default {
  name: 'App',
  data(){
    return{
        files: [],
    }
  },
  components: {
    UploadContainer,
    FrameContainer,
  },
  
}
</script>

<style>
     body, html {
      height: 100%;
      margin: 0;
      display: flex;
      flex-direction: column;
    }  
     #library {
      width: 100%;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
    }
    
    .frame-wrapper {
      width: 100%;
      margin: 5px;
    }

   
    .frame-container iframe,.frame-container img,.frame-container video {
      width: 420px;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      /* object-fit: contain; */
    }
    .button {
      /* padding: 8px 16px; */
      border: none;
      background-color: #008CBA;
      color: white;
      cursor: pointer;
      margin: 10px;
    }
    .button:hover {
      background-color: #4055cc;
    }

</style>
