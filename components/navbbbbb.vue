
<template>
    <!-- <MobNavBarVue v-if="$vuetify.breakpoint.smAndDown" /> -->
    <v-container fluid class="navbar">
      <v-row class="nav-bar justify-center align-center">
        <v-col cols="2">
          <nuxt-link to="/">
            <img src="~assets/icons/ball.png" alt="" />
          </nuxt-link>
        </v-col>
  
        <v-col cols="5">
          <v-tabs
            grow
            align-with-title
            background-color="transparent"
            color="#d3d5d5"
            v-if="token && 
            userData.role == 'fan'"
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
  
          <v-tabs
            grow
            align-with-title
            background-color="transparent"
            color="#6e1131"
            v-if="token &&!userData.role == 'admin'"        >
            <v-tab
              v-for="tab in adminTabs"
              :key="tab.route"
              :to="tab.route"
              :nuxt="true"
              class="title ss"
              >{{ tab.name }}</v-tab
            >
          </v-tabs>
        </v-col>
        <v-col v-if="token && userData.role == 'admin'">
          <userRequests />
        </v-col>
        <v-col v-if="token && !(userData.role == 'admin')">
          <TheButton
            @clicked="showDropdownList = !showDropdownList"
            text="Profile"
          />
          <transition name="fade">
            <div v-if="showDropdownList">
              <div class="dd-list ma-4">
                <v-avatar size="120">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
                <p class="name">{{userData.firstName}}  {{userData.lastName}}</p>
                <p class="un">{{userData.userName}}</p>
                <TheButton
                  @clicked="showProfile = !showProfile"
                  text="edit profile"
                  bgColor="#6e1131"
                  textColor="#d3d5d5"
                />
                <v-dialog
                  v-model="showProfile"
                  transition="dialog-bottom-transition"
                  scrollable
                  width="700"
                >
                  <profile v-show="showProfile" />
                </v-dialog>
              </div>
            </div>
          </transition>
        </v-col>
         <!-------------------  Guest ---------------------->
        <v-col v-if="!token">
          <TheButton route="/login" text="Log in" />
        </v-col>
        <v-col v-if="!token">
          <TheButton route="/signup" text="Sign Up" />
        </v-col>
        <v-col v-if="token">
          <TheButton @clicked="logOut" text="Log out" />
        </v-col>
            <!-------------------  Manager ---------------------->
        <v-col v-if="userData.role == 'manager' && token">
          <TheButton
            @clicked="showAddMatch = !showAddMatch"
            text="New match"
          />
          <v-dialog
            v-model="showAddMatch"
            transition="dialog-bottom-transition"
            scrollable
            width="1300"
          >
              <AddMatch v-show="showAddMatch" />
          </v-dialog>
        </v-col>
        <v-col v-if="userData.role == 'manager' && token">
          <TheButton
            @clicked="showNewStadium = !showNewStadium"
            text="New stadium"
          />
          <v-dialog
            v-model="showNewStadium"
            scrollable
            width="1300"
          >
           <NewStad v-show="showNewStadium" /> 
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  // import MobNavBarVue from "./MobNavBar.vue";
  import userRequests from "./UserRequests.vue";
  import TheButton from "./TheButton.vue";
  import profile from "./profile.vue";
  import AddMatch from "./AddMatch.vue"
  export default {
    components: {
      TheButton,
      profile,
      userRequests,
      AddMatch
      //   MobNavBarVue,
    },
    data() {
      return {
        showDropdownList: false,
        showProfile: false,
        showAddMatch:false,
        showNewStadium:false,
        token:true,
        tabs: [
          { name: "Dashboard", route: "/" },
          { name: "Reservations", route: "/reservations" },
        ],
        adminTabs: [
          { name: "Users", route: "/currentUsers" },
          // { name: "Requests", route: "/usersRequests" },
        ],
      };
    },
    computed: {
      userData() {
        return  this.$auth.$storage.getLocalStorage("user") || "";
      },
      // token() {
      //   return  this.$auth.$storage.getLocalStorage("token") || "";
      // },
    },
    methods:{
      logOut(){
        console.log("LOG OUT")
        this.$auth.$storage.setLocalStorage('token','')
        this.$auth.$storage.setLocalStorage('user','')
        window.location.reload(true)  
        }
      ,
      res(){
        // let _id=this.userData._id;
        //    this.$store.dispatch('getReservations',{_id})
        // this.$store.dispatch("getUsers");
        // this.$auth.$storage.setLocalStorage("token", "666")
        // console.log("YARAAAAAAAAAAAAAAAAB")
        // console.log(this.$auth.$storage.getLocalStorage("token"))
  
  
      }
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
    -webkit-backdrop-filter: blur(11px);
    backdrop-filter: blur(11px);
    background-color: #d3d5d590;
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
  img {
    width: 60px;
    height: 60px;
  }
  .dd-list {
    background-color: #d3d5d5;
    width: 200px;
    height: 270px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    position: absolute;
  }
  .name {
    font-weight: 700;
    font-size: 20px;
  }
  .un {
    color: #475050;
  }
  
  </style>
  