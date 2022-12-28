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
       <v-row> <h3 class="my-4">New Match</h3></v-row>
        <v-row>
          <v-col>
            <v-row>
                <v-col>
                    <v-select
                    v-model="team1"
                    :items="teams"
                    label="Team 1"
                    :rules="notEmptyRules"
                    outlined
                    ></v-select>
                </v-col>
                <v-col>
                    <v-select
                    v-model="team2"
                    :items="teams"
                    :rules="notEmptyRules"
                    label="Team 2"
                    outlined
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select
                    v-model="venue"
                    :items="venues"
                    :rules="notEmptyRules"
                    label="Venue"
                    outlined
                    ></v-select>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="mainReferee"
                    :rules="nameRules"
                    name="mainReferee"
                    label="Main Referee"
                    autocomplete="off"
                    outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="linesmen1"
                    class="input-field mt-7"
                    :rules="nameRules"
                    name="linesmen1"
                    label="First Linesmen"
                    autocomplete="off"
                    outlined
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="linesmen2"
                    class="input-field mt-7"
                    :rules="nameRules"
                    name="linesmen2"
                    label="Second Linesmen"
                    autocomplete="off"
                    outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            <TheButton
              @clicked="addMatch"
              text="Add"
              :disabled="!isValid" 
              bgColor="#6e1131"
              textColor="#d3d5d5"
            />
          </v-col>
          <v-col cols="3"> 
                <p>Match Date</p>
                <v-date-picker
                v-model="date"
                color="#6e1131 lighten-1"
                header-color="#6e1131"
                ></v-date-picker>
            </v-col>
            <v-col cols="3">
                <p>Match Time</p>
                <v-time-picker
                v-model="time"
                color="#6e1131"
                ampm-in-title
                ></v-time-picker>
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
        teams:["ahly","zamalek","esmaaley"],
        venues:["stad1","cairo stad","m3addy"],
        team1:"",
        team2:"",
        venue:"",
        mainReferee:"",
        linesmen1:"",
        linesmen2:"",
        time:"",
        date: "",
        team1:"",
        team2:"",
        venue:"",
        isValid: false,

        nameRules: [
          (v) => !!v || "required",
          (v) => v.length <= 30 || "Name must be less than 30 characters",
          (v) => /^[A-Za-z\s]+$/.test(v) || "Please insert a right name",
        ],
        notEmptyRules: [(v) => !!v || "required"],
      };
    },
    methods: {
      addMatch() {
        console.log("new match");
      },
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
  .date{
    width: 60px;
    height:40px;
    color:white;
    border-radius:5px ;
    background-color: #6e1131 ;
    text-align: center;
    font-size: 18px;
  }
  h3 {
    color:#6e1131;
  }
  </style>
  