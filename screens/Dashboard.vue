<template>
  <div class="home px-6 px-md-10 my-16">
    <v-container fluid>
      <v-row class="text-center">
        <v-col
          v-for="(match, count) in matches"
          :key="count"
          cols="12"
          sm="6"
          md="3"
          class="d-flex align-center justify-center"
        >
          <!-- TODO: ADD VACANT SEATS -->
          <matchDetails
            :group_number="count + 1"
            :oponent1_flag="match.oponent1_flag"
            :oponent2_flag="match.oponent2_flag"
            :oponent1_name="match.oponent1_name"
            :oponent2_name="match.oponent2_name"
            :date="match.date"
            :time="match.time"
            :stadium="match.stadium"
            :mainReferee="match.mainReferee"
            :linesMen="match.linesMen"
          >
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
      matches: [
        {
          oponent1_flag: "argentina.png",
          oponent2_flag: "croatia.png",
          oponent1_name: "Argentina",
          oponent2_name: "Croatia",
          date: "Nov 22",
          time: "9:00pm",
          stadium: "Qatar",
          mainReferee: "Mohamed Ali",
          linesMen: "Ahmed Omar",
        },
        {
          oponent1_flag: "argentina.png",
          oponent2_flag: "croatia.png",
          oponent1_name: "Argentina",
          oponent2_name: "Croatia",
          date: "Nov 23",
          time: "9:00pm",
          stadium: "Qatar",
          mainReferee: "Mohamed Ali",
          linesMen: "Ahmed Omar",
        },
        {
          oponent1_flag: "argentina.png",
          oponent2_flag: "croatia.png",
          oponent1_name: "Argentina",
          oponent2_name: "Croatia",
          date: "Nov 23",
          time: "9:00pm",
          stadium: "Qatar",
          mainReferee: "Mohamed Ali",
          linesMen: "Ahmed Omar",
        },
        {
          oponent1_flag: "argentina.png",
          oponent2_flag: "croatia.png",
          oponent1_name: "Argentina",
          oponent2_name: "Croatia",
          date: "Nov 23",
          time: "9:00pm",
          stadium: "Qatar",
          mainReferee: "Mohamed Ali",
          linesMen: "Ahmed Omar",
        },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  /* background-color: #eff5f5; */
  /* height: 100%; */
}
.card {
  border-radius: 20px;
  /* max-width: 700px; */
  height: auto;
  background-color: white;
  box-shadow: 0 0 20px #d6e4e5;
}
</style>
