// Use the webcam
const video = document.getElementById('video');

const startWebcam = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
  }
}

export {
  video,
  startWebcam,
}