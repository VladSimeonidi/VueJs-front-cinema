<template>
  <v-app>
    <div class="homepage" @click="skipIntro">
      <section class="homepage__section">
        <div class="homepage__banner">
          <div
            class="homepage__blocks"
            v-for="(n, index) in 400"
            :key="index"
            ref="blocks"
          ></div>
        </div>
      </section>
    </div>
  </v-app>
</template>

<script>
export default {
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
  },
  mounted() {
    const blocks = this.$refs.blocks;
    blocks.forEach((el) => {
      const duration = Math.random() * 3;
      el.style.animationDuration = 2 + duration + "s";
      el.style.animationDelay = 2 + duration + "s";
    });
    this.timer = setTimeout(() => {
      this.$router.push({ name: "films" });
      console.log("timer");
    }, 8000);
    document.onkeypress = () => {
      clearTimeout(this.timer);
      this.$router.push({ name: "films" });
    };
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
.homepage {
  background-image: url("../assets/filmroll.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;
  &__section {
    position: relative;
    height: 100vh;
    width: 100%;
    transform-style: preserve-3d;
    perspective: 500px;
  }
  &__title {
    position: relative;
    height: 100vh;
    width: 100%;
    line-height: 100vh;
    text-align: center;
    color: white;
    font-size: 9vw;
    font-weight: 700;
  }
  &__banner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    z-index: 100;
  }
  &__blocks {
    background: url("../assets/intro.jpg");
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    display: block;
    width: 5vw;
    height: 5vh;
    animation: animate ease-in-out forwards;
    animation-delay: 3s;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  }
  @keyframes animate {
    0% {
      transform: translateZ(0px);
      background: url("../assets/intro.jpg");
      background-position: center;
      background-size: cover;
      background-attachment: fixed;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
    }
    100% {
      transform: translateZ(2000px);
      background: url("../assets/intro.jpg");
      background-position: center;
      background-size: cover;
      background-attachment: fixed;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0);
    }
  }
}
</style>
