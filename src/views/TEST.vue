<template>
  <v-main>
    <div>111</div>
    <div id="face">
      <video
        ref="vid"
        id="video"
        width="720"
        height="560"
        autoplay
        muted
      ></video>
    </div>
  </v-main>
</template>

<script>
import * as faceapi from "face-api.js";
export default {
  methods: {
    async test() {
      const wrapper = document.getElementById("face");
      const video = document.getElementById("video");
      console.log(video);

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models"),
      ]).then(startVideo);

      function startVideo() {
        navigator.mediaDevices
          .getUserMedia({ video: {} })
          .then(function(mediaStream) {
            video.srcObject = mediaStream;
            video.onloadedmetadata = function() {
              video.play();
              video.addEventListener("play", () => {
                const canvas = faceapi.createCanvasFromMedia(video);
                wrapper.append(canvas);
                const displaySize = {
                  width: video.width,
                  height: video.height,
                };
                faceapi.matchDimensions(canvas, displaySize);
                setInterval(async () => {
                  const detections = await faceapi
                    .detectAllFaces(
                      video,
                      new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions();
                  const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                  );
                  let test = Object.values(detections[0].expressions);
                  // console.log(test);
                  const needle = 1;
                  const closest = test.reduce((a, b) => {
                    return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
                  });
                  // console.log(closest);
                  console.log(
                    Object.keys(detections[0].expressions).find(
                      (key) => detections[0].expressions[key] === closest
                    )
                  );
                  canvas
                    .getContext("2d")
                    .clearRect(0, 0, canvas.width, canvas.height);
                  faceapi.draw.drawDetections(canvas, resizedDetections);
                  faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                  faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                }, 1000);
              });
            };
          })
          .catch(function(err) {
            console.log(err.name + ": " + err.message);
          });
      }
    },
  },
  mounted() {
    console.log("faceapi");
    console.log(faceapi);
    this.test();
  },
};
</script>
<style lang="scss">
#face {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  position: absolute;
}
</style>
