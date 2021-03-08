<template>
  <div class="myContainer" @click="skipIntro">
    <h1 class="introTitle">welcome</h1>
    <div ref="clip" class="clip"></div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Welcome Page",
  },
  data() {
    return {
      timer: null,
    };
  },
  name: "Home",
  methods: {
    skipIntro() {
      clearTimeout(this.timer);
      this.$router.push({ name: "films" });
    },
    skipIntroByAnyKey(value) {
      console.log(value);
      clearTimeout(this.timer);
      this.$router.push({ name: "films" });
    },
  },
  mounted() {
    const clipImage = require(`@/assets/intro/test.jpg`);
    const clip = this.$refs.clip;
    clip.addEventListener("animationend", () => {
      clip.style.backgroundImage = `url(${clipImage})`;
      setTimeout(() => {
        this.$router.push({ name: "films" });
      }, 2000);
    });
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.myContainer {
  height: 100vh;
  width: 100%;
  position: relative;
  background-image: url("../assets/intro/infinite.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.clip {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation: animate 3s ease-in-out 2s;
}
.introTitle {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 8vw;
  color: #fff;
  text-transform: uppercase;
}
@keyframes animate {
  0% {
    clip-path: circle(0% at 0% 0%);
    background-image: url("../assets/intro/test.jpg");
  }
  100% {
    clip-path: circle(70.7% at 50% 50%);
    background-image: url("../assets/intro/test.jpg");
  }
}
</style>
