

export const log = (msg) => {
  console.log(`${msg}\n`);
}

export const wait = (delayInMS) => {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

export const startRecording = async (stream, lengthInMS) => {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();

  log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });


  let recorded = await wait(lengthInMS);
  if (recorder.state === "recording") {
    recorder.stop();
    console.log('recording max reached')

  }

  return await Promise.all([stopped, recorded]);
}


export const stop = (stream) => {
  if (stream){
    stream.getTracks().forEach((track) => track.stop());
  }
}
