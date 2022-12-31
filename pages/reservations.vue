<template>
  <div class="home px-6 px-md-10 my-16">
    <v-container fluid>
      <v-row class="text-center">
        <v-col v-if="tickets.length == 0">
          <v-alert shaped color="white" icon="mdi-heart">
            you don't have any tickets yet! hurry up and catch your
            ticket</v-alert
          >
        </v-col>
        <v-col
          v-else
          v-for="(ticket, count) in tickets"
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
                  ><p class="text-left date">
                    ticket number: {{ ticket.ticketNumber }}
                  </p>
                </v-col>
                <!-- <v-col>
                  <p class="text-right date">{{ match.time }}</p>
                </v-col> -->
              </v-row>
              <v-divider light></v-divider>
              <v-row>
                <v-col
                  ><img
                    class="flag"
                    :src="require(`~/assets/icons/${flag1}`)"
                    alt="oponent 1"
                  />
                </v-col>
                <v-col
                  ><img
                    class="flag"
                    :src="require(`~/assets/icons/${flag2}`)"
                    alt="oponent 1"
                  />
                </v-col>
              </v-row>

              <v-row class="pt-5">
                <v-col class="d-flex align-center">
                  <p class="teams">{{ ticket.match[0].teamOne }}</p>
                </v-col>
                <v-col class="d-flex align-center">
                  <p class="teams">VS</p>
                </v-col>
                <v-col class="d-flex align-center">
                  <p class="teams">{{ ticket.match[0].teamTwo }}</p>
                </v-col>
              </v-row>
              <!-- time -->
              <v-row>
                <v-col cols="2">
                  <v-icon size="20" class="d-flex align-center" color="#6e1131"
                    >mdi-clock</v-icon
                  >
                </v-col>
                <v-col class="d-flex align-center">
                  <p class="time">
                    {{ ticket.match[0].date.substring(12, 16) }} ,
                  </p>
                </v-col>
                <v-col class="d-flex align-center">
                  <p class="time">
                    {{ ticket.match[0].date.substring(0, 10) }}
                  </p>
                </v-col>
              </v-row>
              <!-- seats -->
              <v-row>
                <v-col cols="2">
                  <v-icon size="20" class="d-flex align-center" color="#6e1131"
                    >mdi-seat</v-icon
                  >
                </v-col>
                <v-col class="d-flex align-center">
                  <p class="time">your seats: {{ ticket.seats }}</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-center py-4">
              <v-btn id="btn" class="text-center" @click="cancelReservation(ticket._id)">
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
import axios from "axios";
import matchDetails from "../components/MatchDetails";
export default {
  data() {
    return {
      tickets: [],
      userData: {},
      token: "",
      flag1: "",
      flag2: "",
      flags: ["argentina.png", "croatia.png"],
    };
  },
  components: {
    matchDetails,
  },
  computed: {
    matchDetails() {
      return this.$store.state.matchDetails;
    },
  },
  async mounted() {
    this.randomFlags();
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.token = localStorage.getItem("token");
    console.log(" reservation");
    console.log(this.token);
    let _id = this.userData._id;
    await axios
      .post(
        "http://localhost:8080/fan/allreservation",
        { _id },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .then((res) => {
        console.log("get reserbationsss");
        console.log(res.data);
        this.tickets = res.data;
        console.log(this.tickets[0].match[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async cancelReservation(id) {
      let _id = id;
      console.log("cancel reservation");
      console.log(_id);
      await axios
        .post(
          "http://localhost:8080/fan/cancelreservation",
          { _id },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    randomFlags() {
      this.flag1 = this.flags[Math.floor(Math.random() * this.flags.length)];
      this.flag2 = this.flags[Math.floor(Math.random() * this.flags.length)];
    },
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
  font-size: 15px;
}
.time {
  color: #6e1131;
  font-weight: 500;
  font-size: 15px;
}

.v-card {
  height: max-content;
  border-radius: 2px !important;
}
.rowt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
