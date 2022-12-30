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
          <!-- TODO: ADD VACANT SEATS -->
          <matchDetails
            :group_number="count + 1"
            oponent1_flag="argentina.png"
            oponent2_flag="croatia.png"
            :oponent1_name="match.teamOne"
            :oponent2_name="match.teamTwo"
            :date="match.date"
            :stadium="match.matchVenue"
            :mainReferee="match.mainReferee"
            :lineMan1="match.lineMan1"
            :lineMan2="match.lineMan2"
            :ID="match.ID"
            :seats="match.seats"
            :seatsNum="match.seatsNum"
          >
            <!-- :time="match.time" -->
          </matchDetails>
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

  data() {
    return {
      matches: [],
      userData:{},
      token:"",
    };
  },
  created() {
    this.$store.dispatch("matchDetails");
  },
  computed: {
    matchDetails() {
      return this.$store.state.matchDetails;
    },
  },
  mounted(){
    this.userData=JSON.parse(localStorage.getItem("user"));
    this.token=localStorage.getItem("token")

  },

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
</style>
