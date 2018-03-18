// Get the video
const video = document.getElementById('video');

const startVideo = () => {
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
  startVideo,
}