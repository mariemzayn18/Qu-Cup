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
        <p> Hurry up and choose your seat Now!</p>
      </div>
    </v-row>
    <v-row class="ma-4">
      <!-- TODO neef to show which seats are vacant and reserved -->
      <v-col v-for="i in seatsNum" :key="i" cols="1">
        <!-- <div class="text-center seat" @click="select(i)" :class="{selected:isSelected[i]}">{{i}}</div> -->
        <v-icon class="seat-icon" size="50" color="#6e1131"  @click="select(i)" :class="{selected:isSelected[i]}" >mdi-seat</v-icon>   
      </v-col>
    </v-row>
    <v-row v-show="confirmed">
      <v-col></v-col>
      <v-col cols="7">
        <v-alert
            shaped
            type="success"
            >reservation is done successfully your seat number is {{reservedSeat }}
        </v-alert>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row>
      <button id="btn2" class="text-center pa-3 mt-4" @click="confirm">Confirm</button>
      </v-row>
      <v-row>
      </v-row>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      showDialog: false,
      confirmed:false,
      isSelected:[],
      reservedSeat:-1,
      seatsNum:70,
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
      this.isSelected[i]= !this.isSelected[i];
      console.log("Hh")
      console.log(this.isSelected[i])
      console.log(i)
    },
    confirm(){
      for (let i =0; i < this.seatsNum; i++)
      {
        if (this.isSelected[i])
        {
          this.reservedSeat=i
          break
        }
      }
      this.confirmed=true
      let match ="63ae12727976b791ac2f50ca"
      // TODO REMOVE HARDCODED this.ID
      console.log("@HHHHHHHHHsdddddddddd")
      console.log( this.userData)
      console.log( this.userData.ID)
      let owner= this.userData.ID
      let seats=[this.reservedSeat]
      this.$store.dispatch('reserveMatch',{match, owner,seats })
    }
  },
  created(){
    for (let i =0; i < this.seatsNum; i++)
      this.isSelected[i]= false;
    this.confirmed=false
  },
  computed: {
    userData() {
      return this.$store.state.user;
    },
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
  flex-direction:row;
  color: #6e1131;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  }
  .seat:hover {
    background-color:  #d6e4e5;
    color:#6e1131;
  }
  .seat-icon:hover {
    color:rgb(6, 175, 6) !important;
  }
  .selected {
    background-color:#6e1131 !important;
    color: #d3d5d5  !important;
  }
  /* .selected {
    background-color: #d3d5d5  !important;
    color: #6e1131 !important;
  } */
</style>
