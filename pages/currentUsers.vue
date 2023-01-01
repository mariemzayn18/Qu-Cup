<template>
  <v-container class="divv my-11" fluid>
    <v-row>
      <v-col cols="4">
        <div
          class="user"
          v-for="user in users"
          :key="user._id"
          @click="selectUser(user)"
          :class="{ selected: active }"
        >
          <v-icon color="#6e1131">mdi-account</v-icon>
          <p class="userName ma-4">{{ user.firstName }} {{ user.lastName }}</p>
        </div>
      </v-col>
      <v-col cols="1"> <div class="divider"></div></v-col>
      <v-col cols="3" class="my-5">
        <v-alert
          v-show="!selected"
          shaped
          color="#6e1131"
          class="white--text"
          icon="mdi-account white"
          >Select a user</v-alert
        >
        <v-card v-show="selected" class="pt-6 mx-auto" flat max-width="400">
          <v-card-text class="card-r">
            <v-avatar v-if="avatar" size="120">
              <v-img
                :src="`https://avataaars.io/${avatar}`"
                class="mb-6"
              ></v-img>
            </v-avatar>
            <h4 class="text-h5 mb-2">{{ firstName }} {{ lastName }}</h4>
          </v-card-text>
          <v-divider></v-divider>
          <v-row class="text-left align-center" tag="v-card-text">
            <v-col class="text-right mr-4 mb-2 data" tag="strong" cols="5">
              email:
            </v-col>
            <v-col>{{ email }}</v-col>
            <v-col class="text-right mr-4 mb-2 data" tag="strong" cols="5">
              username:
            </v-col>
            <v-col>{{ username }}</v-col>
            <v-col class="text-right mr-4 mb-2 data" tag="strong" cols="5">
              Role:
            </v-col>
            <v-col>{{ role }}</v-col>

            <v-col class="text-right mr-4 mb-2 data" tag="strong" cols="5">
              Birth Date:
            </v-col>
            <v-col>{{ birthDate.substring(0, 10) }}</v-col>
            <v-col>
              <v-alert v-show="showAlert" shaped type="success"
                >user deleted successfully</v-alert
              >
            </v-col>
            <v-col cols="12 " class="text-center">
              <button
                id="btn2"
                class="text-center pa-3 mt-4"
                @click="removeUser(ID)"
              >
                REMOVE USER
              </button>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];

import TheButton from "../components/TheButton.vue";
import axios from "axios";
export default {
  components: {
    TheButton,
  },
  data: () => ({
    selected: false,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    birthDate: "",
    nationality: "",
    role: "",
    ID: "",
    showAlert: false,
    token: "",
    active: [],
    avatar: null,
    open: [],
  }),

  computed: {
    users() {
      return this.$store.state.users;
    },
  },

  methods: {
    async removeUser(userid) {
      await axios
        .delete(`https://fifa-qatar-cmp.onrender.com/admin/${userid}`, {
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

    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
    selectUser(user) {
      this.randomAvatar();
      console.log("selectUser");
      console.log(user);
      this.selected = true;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.role = user.role;
      this.nationality = user.nationality;
      this.birthDate = user.birthDate;
      this.username = user.username;
      this.ID = user.ID;
      console.log(user.ID);
      console.log(this.ID);
    },
  },
  mounted() {
    this.showAlert = false;
    this.token = localStorage.getItem("token");
    console.log("getUsers");
    this.$store.dispatch("getUsers", this.token);
    // item.children.push(this.users)
    console.log("getYYYYYYYYYYYYUsers");
    console.log(this.$store.state.users);
  },
};
</script>

<style scoped>
.divv {
  background-color: white;
  height: max-content;
}
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
.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
  background-color: white;
  width: 100%;
  cursor: pointer;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  cursor: pointer;
}
.userName {
  font-size: 20px;
  font-weight: bold;
  color: #6e1131;
}
.user:hover {
  background-color: #f5f5f5;
}
.divider {
  width: 1px;
  height: 100vh;
  background-color: #6e1131;
  margin: 10px 0;
}
.card-r {
  margin-left: 100px;
}
</style>
