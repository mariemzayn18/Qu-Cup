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
      <v-row> <h3 class="my-4">Edit Match Details</h3></v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-select
                v-model="team1"
                :items="teams"
                label="Team 1"
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="team2"
                :items="teams"
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
                :rules="nameRules"
                name="linesmen2"
                label="Second Linesmen"
                autocomplete="off"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-col>
            <v-alert v-show="showTeamsAlert" shaped type="error"
              >you can't choose the same team as team1 and team2</v-alert
            >
            <v-alert v-show="showSuccessAlert" shaped type="success"
              >Match is updated successfully</v-alert
            >
          </v-col>
          <TheButton
            @clicked="editMatch"
            :disabled="!isValid"
            text="Update"
            bgColor="#6e1131"
            textColor="#d3d5d5"
          />
        </v-col>
        <v-col cols="3">
          <p>Match Date</p>
          <v-date-picker
            v-model="date"
            :min="new Date().toISOString().substr(0, 10)"
            color="#6e1131 lighten-1"
            header-color="#6e1131"
          ></v-date-picker>
        </v-col>
        <v-col cols="3">
          <p>Match Time</p>
          <v-time-picker v-model="time" color="#6e1131"></v-time-picker>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import TheButton from "./TheButton.vue";
import axios from "axios";
export default {
  components: {
    TheButton,
  },
  props: {
    ID: String,
  },
  data() {
    return {
      userData: {},
      token: "",
      teams: ["ahly", "zamalek", "esmaaley"],
      venues: ["stad1", "cairo stad", "m3addy"],
      team1: "",
      team2: "",
      venue: "",
      mainReferee: "",
      linesmen1: "",
      linesmen2: "",
      time: "",
      date: "",
      venue: "",
      isValid: false,
      showTeamsAlert: false,
      showSuccessAlert: false,
      // TODO make it possible to be empty
      nameRules: [
        (v) => /(\s*|^[A-Za-z\s]+$)/.test(v) || "Please insert a right name",
      ],
    };
  },
  methods: {
    editMatch() {
      console.log("new match");
      if (this.team1 == this.team2) {
        this.showTeamsAlert = true;
        this.showSuccessAlert = false;
        return;
      }
      this.showTeamsAlert = false;
      let teamOne = this.team1;
      let teamTwo = this.team2;
      let matchVenue = this.venue;
      let mainReferee = this.mainReferee;
      let lineMan1 = this.linesmen1;
      let lineMan2 = this.linesmen2;
      let date = this.date + "T" + this.time;
      // TODO send id ad params
      let ID = this.ID;
      this.editMatchAction(
        { teamOne, teamTwo, matchVenue, date, mainReferee, lineMan1, lineMan2 },
        ID
      );
      this.showAlert = true;
    },
    async editMatchAction(match, ID) {
      console.log("%%%%%%#############################3");
      console.log(this.token);
      await axios
        .patch(`http://localhost:8000/manager/match/${ID}`, match, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Error in edit match");
          console.log(err);
        });
    },
  },
  created() {
    this.showSuccessAlert = false;
  },
  mounted(){
    this.userData=JSON.parse(localStorage.getItem("user"));
    this.token=localStorage.getItem("token")

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
.date {
  width: 60px;
  height: 40px;
  color: white;
  border-radius: 5px;
  background-color: #6e1131;
  text-align: center;
  font-size: 18px;
}
h3 {
  color: #6e1131;
}
</style>
