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
    <!-- <v-divider light></v-divider> -->
    <v-card-actions class="d-flex justify-center py-4">
      <v-btn id="btn" class="text-center"> VIEW DETAILS</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
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
};
</script>

<style scoped>
#btn {
  text-transform: unset !important;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  color: white;
  background-color: #eb6440;
  
}

.flag {
  width: max(80px, 20%);
}
.teams {
  color: #497174;
  font-size: 20px;
  font-weight: 400;
}

.date {
  color: #eb6440;
}

.card {
  width: max-content;
  background-color: #eb644020 !important;
  border-radius: 2px !important;
}
</style>
