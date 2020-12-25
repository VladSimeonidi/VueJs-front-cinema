<template>
  <div>
    <nav class="navigation">
      <router-link :to="{ name: 'home' }" class="floating-button"
        >Домой</router-link
      >
      <router-link :to="{ name: 'films' }" class="floating-button"
        >Трейлеры</router-link
      >
      <router-link
        v-if="this.$route.name !== 'editfilm'"
        :to="{ name: 'editfilm', params: { id: 'new' } }"
        class="floating-button special"
        >Добавить</router-link
      >
    </nav>
    <!-- <YourSidebar /> -->
    <div class="container">
      <router-view />
    </div>
    <!-- <YourFooter /> -->
  </div>
</template>

<script>
export default {
  name: "defaultLayout", // you can enter any name (optional)
};
</script>

<style scoped lang="scss">
.navigation {
  position: fixed;
  z-index: 100;
  width: 100%;
  min-height: 40px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}
.floating-button {
  text-decoration: none;
  outline: none;
  display: inline-block;
  width: 140px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  margin: 10px 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  color: #524f4e;
  background: white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  text-align: center;
}
.floating-button:hover {
  background: #2ee59d;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
.special {
  margin-left: auto;
}
</style>
