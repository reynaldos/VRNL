import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from './firebase'

export const log = (msg) => {
  console.log(`${msg}\n`);
}

export const wait = (delayInMS) => {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}


export const stop = (stream) => {
  if (stream){
    stream.getTracks().forEach((track) => track.stop());
  }
}


export const startRecording = (stream, lengthInMS) => {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  // window.addEventListener('stopRecording',()=>{
  //   console.log('stop event')
  //   return data
  //  });

  let recorded = wait(lengthInMS).then(
    () => {
      if (recorder.state === "recording") {
        recorder.stop();
      }
    },
  );

  return Promise.all([
    stopped,
    recorded
  ])
  .then(() => data);

}


export const toggleRecordCycle = (recordBtnText, setRecordBtnText, recordProccess, recordingFinished) =>{
    if(recordBtnText === 'Record'){
      console.log('start record')

      // recordProccess();
      recordProccess();
      setRecordBtnText('Stop');

    }else if(recordBtnText === 'Stop'){
      // console.log('stop record')
      recordingFinished();
      
    }
  }




export const showImageAt = (vidSource, setThumbNails, secs) => {
      var duration;
      const thumbnailCount = 5;

      var video = document.createElement('video');

      video.onloadedmetadata = function() {
        if (video.duration === Infinity) {
            video.currentTime = 1e101;
            video.ontimeupdate = function () {
                this.ontimeupdate = () => {
                  duration = video.duration;
                    getVideoImage(
                        vidSource,
                        duration,
                        secs,
                        function(img, newSecs, event) {
                            if (event.type === 'seeked') {
                                setThumbNails(old=>[...old, img.src]);
                                const count = Math.ceil(duration/thumbnailCount)
                                newSecs += count;
                                if (duration >= newSecs) {
                                    showImageAt(vidSource, setThumbNails, newSecs);
                                };
                            }
                        }
                    );
                    return;
                }
                video.currentTime = 0;
                return;
            }
        }
      };
      video.src = vidSource;

  }


export const getVideoImage = (path, duration, secs, callback) => {
        var me = this, video = document.createElement('video');
        video.onloadedmetadata = function() {
           
            this.currentTime = Math.min(Math.max(0, (secs < 0 ? duration : 0) + secs), duration);
        };
        video.onseeked = function(e) {
            var canvas = document.createElement('canvas');
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            var img = new Image();
            img.src = canvas.toDataURL();
            callback.call(me, img, this.currentTime, e);
        };
        video.onerror = function(e) {
            callback.call(me, undefined, undefined, e);
        };
        video.src = path;
    }

 

export const closePrompt = (promptBubble) => {
    // e.preventDefault();
    promptBubble.classList.replace('slidein', 'fadeout');
    setTimeout(() => {
      promptBubble.remove();
    }, 500);
  }

export const selectThumbnail = (key, setThumbnail, chosenThumbnail) =>{

  if (chosenThumbnail === key){
    setThumbnail(-1);
  } else{
    setThumbnail(key);

  }

}

export const uploadFile = (userId, file, name, urlType) => {
  // Return a promise that will either resolve or emit an error
  return new Promise((resolve, reject) => {

    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${name}`;
    const storageRef = ref(storage, `${urlType}/${userId}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(urlType + ' -- ' + progress)
        // urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
                // An error occurred so inform the caller
                reject(error);
      },

      async() => {
        
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // We 'awaited' the imgURL, now resolve this Promise
        resolve(downloadURL);
      }
    );

   });
};
