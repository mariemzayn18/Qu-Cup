<template>
  <div>
    <div class="text-center ma-16">
      <v-menu down offset-y :close-on-content-click="false" :maxHeight="250">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Dropdown
          </v-btn>
        </template>

        <v-list v-if="requests.length > 0">
          <v-list-item
            v-for="(request, index) in requests"
            :key="index"
            class="pt-4 px-0"
          >
            <v-row class="pa-0 ma-0">
              <v-col cols="6">
                <p class="text-left px-2">{{ request.username }}</p>
              </v-col>
              <v-col cols="2"
                ><v-btn
                  class="mx-1 mx-md-3"
                  fab
                  dark
                  small
                  color="green"
                  @click="approveUser(index)"
                >
                  <v-icon dark> mdi-account-check-outline </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="mx-1 mx-md-3"
                  fab
                  dark
                  small
                  color="red"
                  @click="disapproveUser(index)"
                >
                  <v-icon dark> mdi-account-remove-outline </v-icon>
                </v-btn></v-col
              >
            </v-row>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item-content>
            <p class="pa-16">No new requests yet</p></v-list-item-content
          >
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    requests: [
      { username: "mariemzayn", email: "mz@gmail.com", id: "0" },
      { username: "mariemzayn21", email: "mz@gmail.com", id: "1" },
      { username: "mariemzayn1", email: "mz@gmail.com", id: "2" },
      { username: "mariemzayn4", email: "mz@gmail.com", id: "3" },
      { username: "mariemzayn", email: "mz@gmail.com", id: "0" },
      { username: "mariemzayn21", email: "mz@gmail.com", id: "1" },
      { username: "mariemzayn1", email: "mz@gmail.com", id: "2" },
      { username: "mariemzayn4", email: "mz@gmail.com", id: "3" },
      { username: "mariemzayn", email: "mz@gmail.com", id: "0" },
      { username: "mariemzayn21", email: "mz@gmail.com", id: "1" },
      { username: "mariemzayn1", email: "mz@gmail.com", id: "2" },
      { username: "mariemzayn4", email: "mz@gmail.com", id: "3" },
    ],
  }),

  methods: {
    approveUser(id) {
      if (this.requests.length > 1) this.requests.splice(id, 1);
      else this.requests = [];
    },
    disapproveUser(id) {
      if (this.requests.length > 1) this.requests.splice(id, 1);
      else this.requests = [];
    },
  },
};
</script>

<style scoped>
p {
  color: #6e1131;
  font-weight: 500;
}
</style>
