<template>
  <v-card class="card">
    <v-card-text>
      <v-row>
        <v-col>
          <p class="text-left date">Group {{ group_number }}</p> </v-col
        ><v-col
          ><p class="text-right date">{{ date }}</p>
        </v-col>
      </v-row>
      <v-divider light></v-divider>

      <v-row class="pt-5">
        <v-col class="d-flex align-center">
          <p class="teams">{{ oponent1_name }}</p>
        </v-col>
        <v-col>
          <img
            class="flag"
            :src="require(`~/assets/icons/${oponent1_flag}`)"
            alt="oponent 1"
        /></v-col> </v-row
      ><v-row>
        <v-col class="d-flex align-center">
          <p class="teams">{{ oponent2_name }}</p>
        </v-col>
        <v-col
          ><img
            class="flag"
            :src="require(`~/assets/icons/${oponent2_flag}`)"
            alt="oponent 1"
        /></v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex justify-center py-4">
      <v-btn id="btn" class="text-center" @click="showDialog = true">
        VIEW DETAILS</v-btn
      >
    </v-card-actions>
    <v-dialog 
      v-model="showDialog"
      transition="dialog-bottom-transition"
      scrollable
      height="max-content"
      width="1000"
    >
      <v-card class="round py-5 px-2">
        <matchDetails
          :group_number="group_number"
          :oponent1_flag="oponent1_flag"
          :oponent2_flag="oponent2_flag"
          :oponent1_name="oponent1_name"
          :oponent2_name="oponent2_name"
          :date="date"
          :time="time"
          :stadium="stadium"
          :mainReferee="mainReferee"
          :linesMen="linesMen"
        ></matchDetails>
        <button
          @click="ticketReservation"
          id="btn2"
          class="text-center pa-3"
          v-if="!reserveTicket"
        >
          RESERVE TICKET
        </button>
        <reservationForm class="pt-6" v-show="reserveTicket"> </reservationForm>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import matchDetails from "./MatchDetailsCard.vue";
import reservationForm from "./ReservationForm.vue";
export default {
  components: {
    matchDetails,
    reservationForm,
  },
  props: {
    group_number: Number,
    oponent1_flag: String,
    oponent2_flag: String,
    oponent1_name: String,
    oponent2_name: String,
    date: String,
    time: String,
    stadium: String,
    mainReferee: String,
    linesMen: String,
  },
  data() {
    return {
      showDialog: false,
      reserveTicket: false,
    };
  },
  methods: {
    ticketReservation() {
      this.reserveTicket = true;
    },
    hideMe() {
      // this.showDialog = false;
    },
  },
};
</script>

<style scoped>
#btn,
#btn2 {
  text-transform: unset !important;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  color: white;
  background-color: #98224b;
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
