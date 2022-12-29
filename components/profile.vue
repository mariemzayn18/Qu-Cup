<template>
  <v-container fluid>
    <!-- <div class="form-container mx-7" > -->
    <v-form
      id="login"
      class="form-container pa-10"
      ref="form"
      v-model="isValid"
      action="/login"
      method="post"
    >
      <v-row>
        <v-col>
          <v-avatar size="120">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <div class="my-5">
            <p class="name">{{userData.firstName}} {{userData.lastName}}</p>
            <p class="un">username: {{userData.username}}</p>
            <p class="un">email: {{userData.email}}</p>
            <p class="un">Nationality: {{userData.nationality}}</p>
            <p class="un">birth date:{{userData.birthDate}}</p>
          </div>
        </v-col>
        <v-col>
          <v-text-field
            v-model="newFirstName"
            class="input-field mt-7"
            :rules="nameRules"
            name="firstName"
            label="First Name"
            autocomplete="off"
          ></v-text-field>

          <v-text-field
            v-model="newLastName"
            class="input-field mt-7"
            :rules="nameRules"
            name="lastName"
            label="Last Name"
            autocomplete="off"
          ></v-text-field>

          <v-text-field
            v-model="newNationality"
            class="input-field mt-7"
            :rules="nameRules"
            name="nationality"
            label="Your Nationality"
            autocomplete="off"
          ></v-text-field>
          <v-row> </v-row>
          <v-text-field
            v-model="password"
            class="input-field mt-7"
            :rules="passwordRules"
            name="password"
            label="password"
            autocomplete="off"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="newEmail"
            class="input-field mt-7"
            :rules="emailRules"
            name="email"
            label="Email"
            autocomplete="off"
            type="email"
          ></v-text-field>
          <v-col> </v-col>
          <TheButton
            @clicked="update"
            text="Update"
            bgColor="#6e1131"
            textColor="#d3d5d5"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import matchDetails from "./MatchDetailsCard.vue";
import TheButton from "./TheButton.vue";
export default {
  components: {
    matchDetails,
    TheButton,
  },
  data() {
    return {
      Name: "",
      firstName: "",
      lastName: "",
      newFirstName: "",
      newLastName: "",
      newNationality: "",
      newEmail: "",
      email: "",
      userName: "",
      password: "",
      nationality: "",
      gender: "",
      role: "",
      birthDate: "",
      isValid: false,
      showProfile: false,
      passwordRules: [
        (v) => v.length <= 15 || "Password must be less than 15 characters",
        (v) => v.length >= 5 || "Password must be at least 5 characters",
      ],
      usernameRules: [
        (v) => v.length <= 15 || "Username must be less than 15 characters",
        (v) => v.length >= 5 || "Username must be at least 5 characters",
      ],
      nameRules: [
        (v) => /^[A-Za-z\s ]+$/.test(v) || "Please insert a right name",
      ],
      emailRules: [
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) => v.length <= 30 || "E-mail must be less than 30 characters",
      ],
      notEmptyRules: [(v) => !!v || "required"],
    };
  },
  methods: {
    hideMe() {
      this.showDialog = false;
    },
    update() {
            let password =this.password
            let nationality =this.newNationality
            let firstName =this.newFirstName
            let lastName =this.newLastName
            let email =this.newEmail
            let role =this.role
            this.$store.dispatch('editProfile',{firstName,lastName, email,password,nationality,email})
  }
},
  computed: {
    userData() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined:deep(fieldset) {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  text-decoration-color: white;
}
.form-container {
  scroll-behavior: smooth;
  border-radius: 2px;
  background-color: #f1f5f6;
  /* box-shadow: 0 0 20px rgba(163, 171, 185, 0.24); */
}
.date {
  z-index: 10;
}
.name {
  font-weight: 700;
  font-size: 20px;
}
.un {
  color: #475050;
}
</style>
