<template>
  <div class="d-flex justify-center">
    <v-card class="ma-16 px-16 py-10" width="max-content">
      <v-row
        class="pa-4"
        justify="space-between"
        align-content="center"
        v-for="request in requests"
        :key="request.id"
      >
        <p class="align-center">{{ request.username }}</p>
        <v-btn class="mx-2" fab dark small color="green">
          <v-icon dark> mdi-account-check-outline </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="red">
          <v-icon dark> mdi-account-remove-outline </v-icon>
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    requests: [{ username: "mariemzayn", email: "mz@gmail.com" }],
  }),
};
</script>

<style scoped></style>
