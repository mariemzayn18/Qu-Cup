<template>
  <div class="home px-6 px-md-10 my-16">
    <v-container fluid>
      <v-row class="text-center">
        <v-col
          v-for="(match, count) in matchDetails"
          :key="count"
          cols="12"
          sm="6"
          md="3"
          class="d-flex align-center justify-center"
        >
          <v-card class="card">
            <v-card-text>
              <v-row>
                <v-col
                  ><p class="text-left date">{{ match.date }}</p>
                </v-col>
                <!-- <v-col>
                  <p class="text-right date">{{ match.time }}</p>
                </v-col> -->
              </v-row>
              <v-divider light></v-divider>

              <v-row class="pt-5">
                <v-col class="d-flex align-center">
                  <p class="teams">{{ match.teamOne }}</p>
                </v-col>
                <!-- <v-col>
                  <img
                    class="flag"
                    :src="require(`~/assets/icons/${match.oponent1_flag}`)"
                    alt="oponent 1"
                /></v-col> --> </v-row
              ><v-row>
                <v-col class="d-flex align-center">
                  <p class="teams">{{ match.teamTwo }}</p>
                </v-col>
                <!-- <v-col
                  ><img
                    class="flag"
                    :src="require(`~/assets/icons/${match.oponent2_flag}`)"
                    alt="oponent 1"
                />
              </v-col> -->
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-center py-4">
              <v-btn id="btn" class="text-center" @click="cancelReservation">
                CANCEL RESERVATION</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import matchDetails from "../components/MatchDetails";
export default {
  components: {
    matchDetails,
  },
  computed: {
    matchDetails() {
      return this.$store.state.matchDetails;
    },
    // data() {
    //   return {
    //     matches: [
    //       {
    //         oponent1_flag: "argentina.png",
    //         oponent2_flag: "croatia.png",
    //         oponent1_name: "Argentina",
    //         oponent2_name: "Croatia",
    //         date: "Nov 22",
    //         time: "9:00pm",
    //         stadium: "Qatar",
    //         mainReferee: "",
    //         linesMen: "",
    //       },
    //       {
    //         oponent1_flag: "argentina.png",
    //         oponent2_flag: "croatia.png",
    //         oponent1_name: "Argentina",
    //         oponent2_name: "Croatia",
    //         date: "Nov 23",
    //         time: "9:00pm",
    //         stadium: "Qatar",
    //         mainReferee: "",
    //         linesMen: "",
    //       },
    //       {
    //         oponent1_flag: "argentina.png",
    //         oponent2_flag: "croatia.png",
    //         oponent1_name: "Argentina",
    //         oponent2_name: "Croatia",
    //         date: "Nov 23",
    //         time: "9:00pm",
    //         stadium: "Qatar",
    //         mainReferee: "",
    //         linesMen: "",
    //       },
    //       {
    //         oponent1_flag: "argentina.png",
    //         oponent2_flag: "croatia.png",
    //         oponent1_name: "Argentina",
    //         oponent2_name: "Croatia",
    //         date: "Nov 23",
    //         time: "9:00pm",
    //         stadium: "Qatar",
    //         mainReferee: "",
    //         linesMen: "",
    //       },
    //     ],
    //   };
    // },
    userData() {
        return  this.$auth.$storage.getLocalStorage("user") || "";
    },
  },
  methods: {
      cancelReservation(){
        let _id=this.userData._id;
        this.$store.dispatch('cancelReservation',{_id})
      },
    },
   created(){
        let _id=this.userData._id;
        this.$store.dispatch('getReservations',{_id})
   }
};
</script>

<style scoped>
.card {
  border-radius: 20px;
  /* max-width: 700px; */
  height: auto;
  background-color: white;
  box-shadow: 0 0 20px #d6e4e5;
}

#btn,
#btn2 {
  text-transform: unset !important;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  color: white;
  background-color: red;
}

#btn2 {
  width: max-content !important;
  margin: auto;
  padding: auto;
}

.flag {
  width: max(80px, 20%);
}
.teams {
  color: black;
  font-size: 20px;
  font-weight: 400;
}

.date {
  color: #6e1131;
  font-weight: 700;
}

.v-card {
  height: max-content;
  border-radius: 2px !important;
}
</style>
