<template>
  <div>
    <div class="text-center ma-16">
      <v-menu down offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Dropdown
          </v-btn>
        </template>

        <v-list>
          <transition-group name="slide-fade">
            <v-list-item
              v-for="(request, index) in requests"
              :key="index"
              class="pt-4"
            >
              <v-row>
                <v-col cols="6">
                  <p class="text-left pt-2">{{ request.username }}</p>
                </v-col>
                <v-col cols="2"
                  ><v-btn
                    class="mx-1 mx-md-4"
                    fab
                    dark
                    small
                    color="green"
                    @click="approveUser(request.id)"
                  >
                    <v-icon dark> mdi-account-check-outline </v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    class="mx-1 mx-md-4"
                    fab
                    dark
                    small
                    color="red"
                    @click="disapproveUser(request.id)"
                  >
                    <v-icon dark> mdi-account-remove-outline </v-icon>
                  </v-btn></v-col
                >
              </v-row>
            </v-list-item>
          </transition-group>
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
    ],
  }),

  methods: {
    approveUser(id) {
      this.requests.splice(id, 1);
      console.log(this.requests);
    },
    disapproveUser(id) {
      this.requests.splice(id, 1);
    },
  },
};
</script>

<style scoped>
p {
  color: #6e1131;
  font-weight: 500;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
