<template>
  <v-container>
    <v-form ref="form" v-model="isValid" action="/" method="post" id="form">
      <v-row>
        <v-col>
          <v-text-field
            v-model="creditCard"
            name="creditCard"
            class="mx-4"
            :rules="creditCardRules"
            label="Credit Card*"
            outlined
            color="black"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="pinNumber"
            name="pinNumber"
            class="mx-4"
            :rules="pinNumberRules"
            type="password"
            label="Pin Number*"
            outlined
            color="black"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <div class="tickets">
        <p>{{ ticketsToBeReserved }}</p>
        <button @click="addTickets()" class="circle1">
          <v-icon color="white" large>mdi-plus</v-icon>
        </button>
        <button @click="removeTickets()" class="circle2">
          <v-icon color="white" large>mdi-minus</v-icon>
        </button>
      </div> -->
    </v-form>
    <v-row>
      <div class="text-center head">
        <p>Hurry up and choose your seat Now!</p>
      </div>
    </v-row>
    <v-row class="ma-4">
      <!-- TODO neef to show which seats are vacant and reserved -->
      <v-col v-for="i in this.seats.length" :key="i" cols="1">
        <!-- <div class="text-center seat" @click="select(i)" :class="{selected:isSelected[i]}">{{i}}</div> -->
        <v-btn
          :disabled="seats[i]"
          class="seat-icon"
          color="#6e1131"
          icon
          @click="select(i)"
          :class="{ selected: isSelected[i] }"
        >
          <v-icon size="40">mdi-seat</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-show="confirmed">
      <v-col></v-col>
      <v-col cols="7">
        <v-alert shaped type="success"
          >reservation is done successfully your seat/s number:
          {{ reservedSeats }}
        </v-alert>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row>
      <button id="btn2" class="text-center pa-3 mt-4" @click="confirm">
        Confirm
      </button>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: {
    ID: String,
    seats: Array,
    seatsNum: Number,
  },
  data() {
    return {
      userData: {},
      token: "",
      isValid: false,
      showDialog: false,
      reserved: false,
      confirmed: false,
      isSelected: [],
      reservedSeats: [],
      // seatsNum:70,
      pinNumber: "",
      creditCard: "",
      ticketsToBeReserved: "0",
      creditCardRules: [
        (v) => !!v || "This field is required",
        (v) => /^\+?[0-9]+\s*$/.test(v) || "Invalid Credit Card Number",
        (v) =>
          (v && v.length == 15) ||
          v.length == 16 ||
          "Invalid Credit Card Number",
      ],
      pinNumberRules: [
        (v) => !!v || "This field is required",
        (v) => /^\+?[0-9]+\s*$/.test(v) || "Invalid Pin Number",
        (v) => (v && v.length == 4) || "Invalid Pin Number",
      ],
    };
  },

  methods: {
    addTickets() {
      this.ticketsToBeReserved++;
    },
    removeTickets() {
      if (this.ticketsToBeReserved > 0) this.ticketsToBeReserved--;
    },
    select(i) {
      console.log("SESL");
      console.log(this.isSelected[i]);
      this.isSelected[i] = !this.isSelected[i];
      console.log(this.isSelected[i]);
    },
    confirm() {
      for (let i = 0; i < this.seats.length; i++) {
        if (this.isSelected[i]) {
          this.reservedSeats.push(i);
        }
      }
      this.confirmed = true;
      let match = this.ID;
      console.log("@HHHHHHHHHsdddddddddd");
      console.log(this.userData);
      console.log(this.userData._id);
      console.log(this.reservedSeats);
      console.log(match);
      let owner = this.userData._id;
      let seats = this.reservedSeats;
      this.reserveMatch({ match, owner, seats });
    },
    async reserveMatch(match) {
      await axios
        .post("http://localhost:9090/fan/reservation", match, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    for (let i = 0; i < this.seats.length; i++) {
      this.isSelected.push(false) 
    }
    this.confirmed = false;
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.token = localStorage.getItem("token");
  },
};
</script>

<style scoped>
#btn2 {
  text-transform: unset !important;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  color: white;
  background-color: rgb(6, 175, 6);
  margin: auto;
  padding: auto;
}

.circle1,
.circle2 {
  border-radius: 50%;
}

.circle1 {
  background-color: green;
}

.circle2 {
  background-color: red;
}

p {
  font-size: 30px;
}
.seat {
  background-color: #6e1131;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  text-align: center !important;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.head {
  display: flex;
  flex-direction: row;
  color: #6e1131;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  align-content: space-between;
}
.seat-icon:hover {
  color: rgb(6, 175, 6) !important;
}
.selected {
  background-color: #6e1131 !important;
  color: #d6e4e5 !important;
}
</style>
