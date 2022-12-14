<template>
    <!-- <MobNavBarVue v-if="$vuetify.breakpoint.smAndDown" /> -->
    <v-container fluid>
      <v-row class="nav-bar  justify-center align-center">
        <v-col cols="2">
          <nuxt-link to="/">
            <img src="~assets/icons/ball.png" alt="" />
          </nuxt-link>
        </v-col>

        <v-col cols="7">
          <v-tabs
            grow
            align-with-title
            background-color="transparent"
            color="#d3d5d5"
          >
            <v-tab
              v-for="tab in tabs"
              :key="tab.route"
              :to="tab.route"
              :nuxt="true"
              class="title ss"
              >{{ tab.name }}</v-tab
            >
          </v-tabs>
        </v-col>
        <v-col>
           <TheButton route="/login" text="Log in"/>
        </v-col>
        <v-col>
           <TheButton route="/signup" text="Sign Up"/>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
//   import MobNavBarVue from "./MobNavBar.vue";
import TheButton from './TheButton.vue'
  export default {
    components: {
        TheButton
    //   MobNavBarVue,
    },
    data() {
      return {
        tabs: [
          { name: "Dashboard", route: "/" },
          { name: "Tickets", route: "/tickets" },
          { name: "profile", route: "/profile" },
        ],
      };
    },
  };
  </script>
  <style scoped>
  a {
    text-decoration: none;
  }
  .v-tab {
    text-transform: none !important;
    color: #d3d5d5 !important;
  }
  .nav-bar {
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 75px;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  }
  .v-tab--exact--active v-tab {
    font-size: 20px !important;
  }
  .ss:hover {
    color: #d3d5d5 !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    background: transparent !important;
    background-color: transparent !important;
  }
  img{
    width: 60px;
    height: 60px;
  }
  
  </style>
  