<template>
  <div v-if="joined === false">
    <ul>
      <li v-for="room in rooms" :key="room">
        {{ room }}
        <button @click="joinRoom(room)">Join</button>
      </li>
    </ul>
    <input type="text" v-model="roomID">
    <button @click="createRoom">Create Room</button>
  </div>
  <div v-if="joined === true" class="videos">
    <div>
      
      <video id="webcamVideo" autoplay playsinline></video>
    </div>
    <div>
    
      <video id="remoteVideo" autoplay playsinline></video>
    </div>
    <div class="callButtons">
    <button @click="hangUp">Hung Up</button>
    <button @click="videoCheck">Video</button>
    <button @click="audioCheck">Audio</button>
    </div>
  </div>
</template>

<script>
import db from './firebase/init';
import { setDoc, doc, onSnapshot, collection, getDocs, query, getDoc , deleteDoc} from 'firebase/firestore';

export default {
  
  components: {
  },
  name: 'VC',
  data() {

    return {
      joined: false,
      rooms: [],
      roomID: "",
      stream: "",
      servers: {
        iceServers: [
          {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
          },
        ],
        iceCandidatePoolSize: 10,
      },
      pc: new RTCPeerConnection(this.servers),
      localStream: null,
      remoteStream: null,
      video: true,
      audio: false,
      NM: this.generateRandomString(10),
      offer: "",
    };
  },
  methods: {
    async hangUp() {
      const tracks = document.querySelector('#webcamVideo').srcObject.getTracks();
      tracks.forEach(track => {
        track.stop();
      });

      await deleteDoc(doc(db, this.roomID , this.NM));

      const docSnap = await getDoc(doc(db, 'rooms', this.roomID))

      if(docSnap.exists())
        await deleteDoc(doc(db, 'rooms', this.roomID));

        this.joined = false;
        this.roomID = "";
    },
    async joinRoom(room) {
      this.joined = true;
      this.roomID = room;

      this.stream = await navigator.mediaDevices.getUserMedia(
        { video: this.video, audio: this.audio });

      this.localStream = this.stream;

      document.getElementById("webcamVideo").srcObject = this.localStream;

      this.localStream.getTracks().forEach((track) => {
        this.pc.addTrack(track, this.localStream);
      });


      const querySnap = await getDocs(query(collection(db, this.roomID)));

      querySnap.forEach(async (doc) => {
        let sdp = JSON.parse(doc.data().sdp)
        console.log(doc.data().NM);
        console.log(sdp);
        // await this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
        await this.pc.setRemoteDescription(sdp)
          .then(() => console.log("done"));
      });

      await this.pc.createAnswer().then(a => this.pc.setLocalDescription(a));

    },
    async createRoom() {

      setDoc(doc(db, "rooms", this.roomID), { roomID: this.roomID });
      this.joined = true;
      this.stream = await navigator.mediaDevices.getUserMedia(
        { video: this.video, audio: this.audio });

      this.localStream = this.stream;

      document.getElementById("webcamVideo").srcObject = this.localStream;

      this.localStream.getTracks().forEach((track) => {
        this.pc.addTrack(track, this.localStream);
      });

      this.pc.createOffer().then(o => this.pc.setLocalDescription(o));
      // Pull tracks from remote stream, add to video stream
      this.getOffer();

    },
    generateRandomString(length) {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    async getRooms() {
      const querySnap = await getDocs(query(collection(db, 'rooms')));
      querySnap.forEach(doc => this.rooms.push(doc.data().roomID));
    },
    async getOffer() {
      const docSnap = await getDoc(doc(db, 'rooms', this.roomID))

      if (docSnap.exists()) {
        onSnapshot(collection(db, this.roomID), (snap) => {
          console.log("update Offer");
          snap.forEach(doc => {
            console.log(doc.data().NM, "-", this.NM);
            if (doc.data().NM !== this.NM) {
              let sdp = JSON.parse(doc.data().sdp);
              console.log(doc.data().NM);
              console.log(sdp);
              // this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
              this.pc.setRemoteDescription(sdp)
                .then(() => console.log("done"));
            }
          })
        });
      }

    }
  },
  created() {
    // function () = {
    //   getDocs(query(collection(db, 'rooms'))).forEach(doc => this.rooms.push(doc.data().NM));
    // }

    this.getRooms();

    this.pc.ontrack = (event) => {
      console.log("add tracks");
      this.remoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        console.log(track);
        this.remoteStream.addTrack(track);
      });
      document.getElementById("remoteVideo").srcObject = this.remoteStream;
    };

    //
    this.pc.onicecandidate = async () => {
      // 'users' collection reference
      // data to send
      const dataObj = {
        NM: this.NM,
        sdp: JSON.stringify(this.pc.localDescription),
      }

      // create document and return reference to i
      setDoc(doc(db, this.roomID, this.NM), dataObj);
      // access auto-generated ID with '.id'
      // console.log('Document was created with ID:', NM)
      // console.log("sdp: ",JSON.stringify(pc.localDescription))
      // created = true;
    };

    // this.getOffer();
    // let negotiating = false;
    // this.pc.onnegotiationneeded = async () => {
    //   try {
    //     if (negotiating || this.pc.signalingState != "stable") return;
    //     negotiating = true;
    //     /* Your async/await-using code goes here */
    //   } finally {
    //     negotiating = false;
    //   }
    // }

    onSnapshot(collection(db, "rooms"), (snap) => {
      this.rooms = [];
      console.log("update Offer");
      snap.forEach(doc => {
        console.log(doc.data());
        if (doc.data().roomID !== this.roomID) {
          this.rooms.push(doc.data().roomID);
        }
      })
    });
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



.videos {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  justify-content: space-evenly;

}
#remoteVideo{
  margin-top: 95%;
}
.callButtons{
  padding: 5px;
  margin-top: 247%;
  margin-right: 15%;

}
.callButtons button{
  color:red;
}
.videos video {
    flex: 1;
    height: 45%;
    width: 90%;
    
    margin-left: 20px;
    margin-top: 15px;
}

</style>
