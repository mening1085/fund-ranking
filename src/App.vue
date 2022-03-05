<template>
  <v-app>
    <v-app-bar dark color="#000" app style="z-index: 99">
      <v-container class="d-flex align-center justify-center">
        <v-img
          aspect-ratio="1"
          max-width="35"
          src="../src/assets/icon.png"
        ></v-img>
        <a href="/" class="d-flex">
          <span class="logo text-center text-uppercase font-20">
            Fund Ranking
          </span>
        </a>
      </v-container>
    </v-app-bar>

    <v-main class="pb-12 pt-6">
      <v-content>
        <router-view />
      </v-content>
    </v-main>

    <!-- Me -->
    <div class="me mb-2">
      <v-btn icon absolute color="#000" bottom right @click="me">
        <i class="fa-solid fa-user-secret font-20"></i>
      </v-btn>
    </div>
    <div class="me_say mb-12 mr-12 font-10">Hi, It's Me</div>

    <v-footer color="#000" dark class="d-flex justify-center font-12">
      © 2022 FUND RANKING
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    me() {
      window.open("https://xmmeenn.com/");
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Shadows+Into+Light&display=swap");

#app {
  font-family: "Prompt", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.logo {
  color: #fff;
  font-weight: 500;
  letter-spacing: 3px;
}
.me {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  -webkit-animation: 3s ease 0s normal forwards 1 fadein;
  animation: 3s ease 0s normal forwards 1 fadein;
}
.me_say {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  -webkit-animation: 4s ease 0s normal forwards 1 fadein;
  animation: 4s ease 0s normal forwards 1 fadein;
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  0% {
    opacity: 0;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
