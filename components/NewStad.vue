<template>
  <v-container class="new-stad">
    <v-form
      class="form-container pa-10"
      ref="form"
      v-model="isValid"
      action="/login"
      method="post"
    >
      <v-row> <h3 class="my-4">New Stadium</h3></v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            name="name"
            label="Stadium Name"
            autocomplete="off"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="rowsNum"
            :rules="numRules"
            name="rowsNum"
            label="Rows Number"
            autocomplete="off"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="seatsNum"
            :rules="numRules"
            name="seatsNum"
            label="Seats Number per row"
            autocomplete="off"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <h4 class="mx-11">Preview</h4>
    </v-row>
    <v-row v-for="i in rowsNum" :key="i">
      <v-col></v-col>
      <v-col v-for="k in seatsNum" :key="k">
        <v-icon class="seat-icon" size="35" color="#6e1131">mdi-seat</v-icon>
      </v-col>
      <v-col></v-col>
    </v-row>
    <!-- <v-row v-for="j in rowsNum" :key="j">
      <v-col>
            <v-row class="ma-4">
          <v-col v-for="i in seatsNum" :key="i">
            <v-icon class="seat-icon" size="35" color="#6e1131">mdi-seat</v-icon>
          </v-col>
        </v-row>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col></v-col>
      <v-col>
        <v-alert v-show="confirmed" shaped type="success">
          Stadium is added successfully
        </v-alert>
        <v-alert v-show="alert" shaped type="error">{{ alertMsg }} </v-alert>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row class="align-center">
      <v-col>
        <TheButton
          @clicked="addStadium"
          text="Add"
          :disabled="!isValid"
          bgColor="#6e1131"
          textColor="#d3d5d5"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      token: "",
      name: "",
      isValid: false,
      isReserved: [],
      seatsNum: "",
      rowsNum: "",
      alert: false,
      alertMsg: "",
      confirmed: false,
      numRules: [
        (v) => !!v || "required",
        (v) => /^[\d\s ]+$/.test(v) || "Please insert a right number",
      ],
      nameRules: [
        (v) => !!v || "required",
        (v) => /^[A-Za-z\s ]+$/.test(v) || "Please insert a right name",
      ],
    };
  },
  methods: {
    async addStadium() {
      if (this.seatsNum > 19) {
        this.alertMsg = "max number of seats per row is 19";
        this.confirmed = false;
        this.alert = true;
        return;
      }
      if (this.rowsNum > 200) {
        this.alertMsg = "max number of rows is 200";
        this.confirmed = false;
        this.alert = true;
        return;
      }
      if (this.rowsNum == 0 || this.seatsNum == 0) {
        this.alertMsg = "number can't be zero!";
        this.confirmed = false;
        this.alert = true;
        return;
      }
      this.alert = false;
      let name = this.name;
      let VIPSeatsPerRow = this.seatsNum;
      let VIPRows = this.rowsNum;
      await axios
        .post(
          "http://localhost:8080/manager/stadium",
          { name, VIPRows, VIPSeatsPerRow },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log("Error in adding stadium");
          console.log(err);
        });
      this.confirmed = true;
    },
  },
  created() {
    for (let i = 0; i < this.seatsNum; i++) this.isReserved[i] = false;
    for (let i = 2; i < this.seatsNum; i += 3) this.isReserved[i] = true;
    this.confirmed = false;
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>
<style>
h3,
h4 {
  color: #6e1131;
}
.new-stad {
  background-color: white !important;
  height: max-content;
}
</style>
