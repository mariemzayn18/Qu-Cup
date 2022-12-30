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
        /></v-col> 
        </v-row
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
      <v-btn id="btn" class="text-center" @click="viewDetails">
        VIEW DETAILS</v-btn
      >
      <v-btn v-if='userData.role == "manager"'  id="btn" class="text-center" @click="showEdit = true">
        EDIT MATCH</v-btn
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
          :stadium="stadium"
          :mainReferee="mainReferee"
          :lineMan1="lineMan1"
          :lineMan2="lineMan2"
          :ID="ID"
        ></matchDetails>
        <!-- :time="time" -->

        <button
          @click="ticketReservation"
          id="btn2"
          class="text-center pa-3"
          v-if='userData.role == "fan"' 
        >
          RESERVE TICKET
        </button>
        <reservationForm class="pt-6" v-show="reserveTicket" :ID="ID" :seatsNum="seatsNum" :seats="seats"> </reservationForm>
        
        <button
          v-if='userData.role == "manager"' 
          @click="viewSeats"
          id="btn2"
          class="text-center pa-3"
        >
          SEATS STATUS
        </button>
        <v-container v-show="showSeats">
        <v-row class="ma-4">
            <v-col v-for="i in VIPSeats.length" :key="i" cols="1">
                <v-icon class="seat-icon" size="30" color="#6e1131" :class="{reserved:VIPSeats[i]}" >mdi-seat</v-icon>   
            </v-col>
        </v-row>
    </v-container>
        
      </v-card>
    </v-dialog>
    <v-dialog
          v-model="showEdit"
          transition="dialog-bottom-transition"
          scrollable
          width="1300"
        >
            <EditMatch 
            v-show="showEdit"
            :ID="ID"
             />
        </v-dialog>
  </v-card>
</template>
<script>
import reservationForm from "./ReservationForm.vue";
import EditMatch from "./EditMatch.vue"
import axios from "axios";
import matchDetails from "./MatchDetailsCard.vue";

export default {
  components: {
    matchDetails,
    reservationForm,
    EditMatch,
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
    lineMan1: String,
    lineMan2: String,
    ID:String,
    seats:Array,
    seatsNum:Number
  },
  data() {
    return {
      showDialog: false,
      reserveTicket: false,
      showEdit:false,
      showSeats:false,
      VIPSeats:[]
    };
  },
  methods: {
    ticketReservation() {
      this.reserveTicket = true;
    },
    viewDetails() {
      this.showDialog = true
      // // TODO get id from props
      // this.ID="63ac638c8a2242b48201c541"
      // this.$store.dispatch("getMatch", this.ID);

    },
    // viewSeats(){
    //   this.showSeats= ! this.showSeats
    //    // // TODO get id from props
    //   this.ID="63ac638c8a2242b48201c541"
    //   let ID= this.ID
    //   this.$store.dispatch('viewSeats',{ID})

    // },
    async viewSeats() {
    //TODO need to set this id
    this.showSeats= ! this.showSeats
       // // TODO get id from props
      let ID= this.ID
      console.log("VIEW SEATS")
      console.log(this.token)
    await axios
      .get(`http://localhost:8888/manager/match/viewseats/${ID}`,
      {
        headers: {
          Authorization:  `Bearer ${this.token}`,
        },
      } 
      )
      .then((res) => {
        // TODO reflect the vacant seats
        console.log("$######### showwwwwwwwwwwwwwwwwww");
       
        this.VIPSeats=res.data.VIPSeats
        console.log(this.VIPSeats);

      })
      .catch((err) => {
        console.log("Error in edit match");
        console.log(err);
      });
  },
  },
  computed: {
    userData() {
      return this.$auth.$storage.getLocalStorage("user") || "";
    },
    token() {
      return this.$auth.$storage.getLocalStorage("token") || "";
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
.reserved{
    color:gray !important;
}
</style>
