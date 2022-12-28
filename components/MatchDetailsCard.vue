<template>
  <div>
    <v-container fluid>
      <h1 class="text-center">Group {{ group_number }}</h1>
      <v-divider light></v-divider>

      <v-row class="pt-5">
        <v-col class="d-flex align-center justify-center" cols="12">
          <p class="teams">
            {{ oponent1_name }} <strong> VS </strong> {{ oponent2_name }}
          </p>
        </v-col>

        <v-col class="d-flex align-center justify-center" cols="12">
          <p><strong> Date: </strong> {{ date }}</p>
        </v-col>
        <!-- <v-col class="d-flex align-center justify-center" cols="12">
          <p><strong> Time: </strong>{{ time }}</p>
        </v-col> -->

        <v-col class="d-flex align-center justify-center" cols="12">
          <p><strong> Stadium: </strong> {{ stadium }}</p>
        </v-col>

        <v-col class="d-flex align-center justify-center" cols="12">
          <p><strong>Main Referee:</strong> {{ mainReferee }}</p>
        </v-col>

        <v-col class="d-flex align-center justify-center" cols="12">
          <p><strong>Lines Men:</strong> {{ lineMan1 }}</p>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="12">
          <p><strong>Lines Men:</strong> {{ lineMan2 }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
    lineMan1: String,
    lineMan2: String,
  },
};
</script>
<style scoped>
h1,
.teams {
  color: #6e1131;
}
</style>
