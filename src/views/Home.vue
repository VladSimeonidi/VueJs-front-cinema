<template>
  <v-app>
    <v-container class="homeContainer" fluid ref="homeContainer">
      <!-- <h1 class="homeTitle">Добро пожаловать на хостинг трейлеров</h1> -->
      <router-link :to="{ name: 'films' }" class="button"
        >Перейти к трейлерам</router-link
      >
    </v-container>
  </v-app>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "Home",
  components: {},
  methods: {
    animatesircles() {
      anime({
        targets: ".block",
        translateX: function() {
          return anime.random(-700, 700);
        },
        translateY: function() {
          return anime.random(-500, 500);
        },
        scale: function() {
          return anime.random(1, 5);
        },
        easing: "linear",
        duration: 3000,
        delay: anime.stagger(10),
        complete: this.animatesircles,
      });
    },
  },
  mounted() {
    const container = this.$refs.homeContainer;
    for (let i = 0; i < 100; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.style.height = "100px";
      block.style.width = "50px";
      block.style.background = "#43a047";
      block.style.position = "absolute";
      block.style.boxShadow = "10px 10px 50px rgba(0, 0, 0, 0.2)";

      container.appendChild(block);
    }
    this.animatesircles();
    console.log("1111");
    // setTimeout(() => {
    //   console.log("ggggg");
    //   this.$router.push({ name: "films" });
    // }, 10000);

    // const targets = ".block";
    // this.$anime.timeline().add({
    //   targets,
    //   translateX: function() {
    //     return Math.random() * (700 + 700) - 700;
    //   },
    //   translateY: function() {
    //     return Math.random() * (500 + 500) - 500;
    //   },
    //   easing: "linear",
    //   loop: true,
    //   duration: 3000,
    //   rotate: "1turn",
    // });
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Marck+Script&display=swap");
body {
  margin: 0;
  padding: 0;
}
.homeContainer {
  position: relative;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #43a047;
}
.homeTitle {
  font-family: "Marck Script";
  font-weight: 400;
  font-size: 5vw;
  // background-color: rgba(255, 255, 255, 0.1);
  user-select: none;
}
.block {
  position: absolute;
  width: 50px;
  height: 100px;
  background-color: #43a047;
  box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.2);
}
.button {
  position: absolute;
  z-index: 1000;
  font-family: "Arial", sans-serif;
  box-shadow: 0px 10px 14px -7px #347327;
  background: linear-gradient(to bottom, #59b36e 5%, #409940 100%);
  background-color: #59b36e;
  border-radius: 8px;
  border: 0;
  outline: none;
  user-select: none;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  padding: 13px 32px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #578a3e;
}
.button:hover {
  background: linear-gradient(to bottom, #409940 5%, #59b36e 100%);
  background-color: #409940;
}
.button:active {
  position: relative;
  top: 1px;
}
</style>
