

export const log = (msg) => {
  console.log(`${msg}\n`);
}

export const wait = (delayInMS) => {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
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


export const stop = (stream) => {

  if (stream){
    stream.getTracks().forEach((track) => track.stop());}

}
