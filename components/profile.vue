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
            <p class="name">{{ userData.firstName }} {{ userData.lastName }}</p>
            <p class="un">username: {{ userData.userName }}</p>
            <p class="un">email: {{ userData.email }}</p>
            <p class="un">Nationality: {{ userData.nationality }}</p>
            <p class="un">birth date:{{ userData.birthDate }}</p>
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
          <v-select
            v-model="newNationality"
            :items="countries"
            class="input-field mt-7"
            label="Your Nationality"
          ></v-select>
          <v-row> </v-row>
          <v-text-field
            v-model="password"
            class="input-field mt-7"
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
import axios from "axios";
export default {
  components: {
    matchDetails,
    TheButton,
  },
  data() {
    return {
      userData: {},
      token: "",
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
      nameRules: [
      (v) => /(\s*|^[A-Za-z\s]+$)/.test(v) || "Please insert a right name",
      ],
      emailRules: [
        (v) => /(\s*|.+@.+\..+)/.test(v) || "E-mail must be valid",
      ],
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor L'Este",
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
    };
  },
  methods: {
    hideMe() {
      this.showDialog = false;
    },
    async update() {
      let password = this.password;
      let nationality = this.newNationality;
      let firstName = this.newFirstName;
      let lastName = this.newLastName;
      let email = this.newEmail;
      await axios
        .put(
          "http://localhost:9090/edit_profile",
          {
            firstName,
            lastName,
            email,
            password,
            nationality,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          // TODO need to reflict this change ? need commit or get user data
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.token = localStorage.getItem("token");
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
