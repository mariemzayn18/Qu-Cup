<template>
  <v-card class="ma-16">
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview
          :active.sync="active"
          :items="items"
          :load-children="fetchUsers"
          :open.sync="open"
          activatable
          color="#6e1131"
          open-on-click
          transition
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children"> mdi-account </v-icon>
          </template>
        </v-treeview>
      </v-col>
      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center"
          >
            Select a User
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar v-if="avatar" size="88">
                <v-img
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <h3 class="text-h5 mb-2">
                {{ selected.firstName }} {{ selected.lastName}}
              </h3>
              <div class="mb-2 colors">
                {{ selected.email }}
              </div>
              <div class="subheading font-weight-bold colors">
                {{ selected.username }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Nationality:
              </v-col>
              <v-col>{{ selected.nationality }}</v-col>

              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Birth Date:
              </v-col>
              <v-col>{{ selected.birthDate }}</v-col>
              <v-col>
            <v-alert v-show="showAlert" shaped type="success">user deleted successfully</v-alert>
       
          </v-col>
              <v-col cols="12 " class="text-center">
                <button
                  id="btn2"
                  class="text-center pa-3 mt-4"
                  @click="removeUser(selected.ID)"
                >
                  REMOVE USER
                </button>
              </v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];

//   const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

import TheButton from "../components/TheButton.vue";
import axios from "axios";
export default {
  components: {
    TheButton,
  },
  data: () => ({
    showAlert: false,
    token:"",
    active: [],
    avatar: null,
    open: [],
  }),

  computed: {
    users() {
      return this.$store.state.users;
    },
    items() {
      return [
        {
          name: "Users",
          children: this.users,
        },
      ];
    },
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      return this.users.find((user) => user.id === id);
    },
  },

  watch: {
    selected: "randomAvatar",
  },

  methods: {
   async removeUser( userid ) {
    
      await axios
      .delete(`http://localhost:8080/admin/${userid}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        this.showAlert = true;
      })
      .catch((err) => {
        console.log("Error in delete user");
        console.log(err);
      });
    },
     fetchUsers(item) {
      console.log("getUsers");
      this.$store.dispatch("getUsers" ,this.token);
      console.log("getYYYYYYYYYYYYUsers");
      console.log(this.$store.state.users);
    },
    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
  },
  mounted(){
    
   this.token=localStorage.getItem("token");
  }
};
</script>

<style scoped>
.colors {
  color: #6e1131;
}

#btn2 {
  text-transform: unset !important;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  color: white;
  background-color: red;
  margin: auto;
  padding: auto;
}
</style>
