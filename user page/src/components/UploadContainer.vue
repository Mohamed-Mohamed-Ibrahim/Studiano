<template>
    <label for="file-upload" class="upload-btn">Choose PDF File</label>
    <input id="file-upload" type="file" class="upload-input" accept=".pdf" @click="resetFileInput" @change="handleFileUpload">
</template>

<script>
export default{
    name: 'Upload-Container',
    props: ['files'],
    methods:{
        resetFileInput(event) {
          // Reset file input if it's not a PDF file
          if (event.target.files && event.target.files[0] && event.target.files[0].type !== 'application/pdf') {
            event.target.value = '';
            alert('Please select a PDF file.');
          }
        },
        handleFileUpload(event) {
          const selectedFileList = event.target.files;
          for (let i = 0; i < selectedFileList.length; i++) {
            const file = selectedFileList[i];
            if (file.type === 'application/pdf') {
              this.files.push({
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file), // Use createObjectURL instead of Data URL
                showFrame: false,
              });
            } else {
              event.target.value = ''; // Reset input if file is not PDF
              alert('Please select a PDF file.');
            }
          }
        }
    }
}
</script>

<style>
    .upload-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .upload-input {
      margin-bottom: 10px;
      display: none;
    }
    .upload-btn {
      padding: 8px 16px;
      border: none;
      background-color: rgb(58, 135, 194);
      color: white;
      cursor: pointer;
    }
    .upload-btn:hover {
      background-color: rgb(119, 165, 199);
    }
</style>