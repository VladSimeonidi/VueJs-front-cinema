<template>
  <div v-cloak class="wrapper" v-scroll="handleScroll">
    <section>
      <img class="bg" src="../assets/images/about/bg.jpg" ref="bg" alt="bg" />
      <img
        class="moon"
        src="../assets/images/about/moon.png"
        ref="moon"
        alt="moon"
      />
      <img
        class="mountain"
        src="../assets/images/about/mountain.png"
        ref="mountain"
        alt="mountain"
      />
      <img
        class="road"
        src="../assets/images/about/road.png"
        ref="road"
        alt="road"
      />
      <h2 class="text" ref="text">About Us</h2>
    </section>
    <p class="about-text">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ipsam
      commodi doloribus minima nemo earum numquam, voluptas unde aliquid
      exercitationem reiciendis! Consequuntur eius laboriosam accusamus officia
      cum, neque quibusdam dicta enim, ipsa in possimus commodi inventore nemo
      adipisci hic alias provident laudantium dignissimos beatae quod a ex
      voluptas. Laborum corporis quisquam perferendis harum quaerat est qui, id
      ratione recusandae blanditiis eius odio, reiciendis possimus eaque soluta
      dolorem, sint doloribus minus aspernatur iste. Pariatur repellat modi
      explicabo ducimus ratione, corporis at tempora sunt obcaecati accusantium
      eveniet asperiores beatae illo eius.
    </p>
    <div class="back-arrow">
      <img
        @click="goBack"
        class="back-arrow__img"
        src="../assets/images/about/left-arrow.svg"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleScroll() {
      let bg = this.$refs.bg;
      let moon = this.$refs.moon;
      let mountain = this.$refs.mountain;
      let road = this.$refs.road;
      let text = this.$refs.text;
      let value = window.scrollY;
      bg.style.top = value * 0.5 + "px";
      moon.style.left = -value * 0.5 + "px";
      mountain.style.top = -value * 0.15 + "px";
      road.style.top = value * 0.15 + "px";
      text.style.top = value + "px";
    },
  },
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
@import url("https://fonts.googleapis.com/css2?family=Caveat&display=swap");
.wrapper {
  background-color: #0a2a43;
  min-height: 1300px;
}
section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
section::before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
  background: linear-gradient(to top, #0a2a43, transparent);
  z-index: 10000;
}
section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #0a2a43;
  z-index: 10000;
  mix-blend-mode: color;
}
section img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.text {
  position: relative;
  font-size: 10vw;
  color: #fff;
  z-index: 1;
}
.road {
  z-index: 2;
}
.about-text {
  font-family: "Caveat", cursive;
  font-size: 2em;
  line-height: 3rem;
  letter-spacing: 0.2rem;
  color: #fff;
  padding: 40px 2rem 0 2rem;
}
.back-arrow {
  margin-top: 50px;
  text-align: center;
  &__img {
    height: 25vh;
    z-index: 100;
    transform: translateX(50%);
    animation: move-sides 3s ease-in-out infinite;
    cursor: pointer;
  }
}
@keyframes move-sides {
  0%,
  100% {
    transform: translateX(50%);
  }
  50% {
    transform: translateX(-50%);
  }
}
</style>
