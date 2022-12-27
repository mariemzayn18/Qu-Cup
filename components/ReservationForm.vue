<template>
  <v-form ref="form" v-model="isValid" action="/" method="post" id="form">
    <v-text-field
      v-model="creditCard"
      name="creditCard"
      class="mx-4"
      :rules="creditCardRules"
      label="Credit Card*"
      outlined
      color="black"
    ></v-text-field>
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
    <!-- <div class="tickets">
      <p>{{ ticketsToBeReserved }}</p>
      <button @click="addTickets()" class="circle1">
        <v-icon color="white" large>mdi-plus</v-icon>
      </button>
      <button @click="removeTickets()" class="circle2">
        <v-icon color="white" large>mdi-minus</v-icon>
      </button>
    </div> -->
    <v-row>
      <button id="btn2" class="text-center pa-3 mt-4">RESERVE TICKET</button>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      showDialog: false,
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
  background-color: #98224b;
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
</style>
