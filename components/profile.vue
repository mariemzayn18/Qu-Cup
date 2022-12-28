<template>
   <v-container fluid  >
        <!-- <div class="form-container mx-7" > -->
        <v-form id="login" class="form-container pa-10" ref="form" v-model="isValid" action="/login" method="post">
            <v-row>
              <v-col>
                <v-avatar size="120">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
              <div class="my-5">
              <p class="name">Marco josif</p> 
              <p class="un">mako7853</p>
              <p class="un">marcdo8@Jffflk.com</p>
              <p class="un">Nationality: Egyptian</p>
              <p class="un">birth date: 26-9-2000</p>
              </div>
              
              </v-col>
            <v-col>
                <v-text-field
                v-model="firstName"
                class="input-field mt-7"
                :rules="nameRules"
                name="firstName"
                label="First Name"
                 autocomplete="off"
                ></v-text-field>
    
                <v-text-field
                v-model="lastName"
                class="input-field mt-7"
                :rules="nameRules"
                name="lastName"
                label="Last Name"
                 autocomplete="off"
                ></v-text-field>

                <v-text-field
                v-model="nationality"
                class="input-field mt-7"
                :rules="nameRules"
                name="nationality"
                label="Your Nationality"
                autocomplete="off"
                ></v-text-field>
                <v-row>
                </v-row>
                <v-text-field
                v-model="password"
                class="input-field mt-7"
                :rules="passwordRules"
                name="password"
                label="password"
                autocomplete="off"
                type="password"
                ></v-text-field>
                
            <v-radio-group v-model="role" :rules="notEmptyRules">
              <v-row>
                <v-col md="3" sm="5" cols="5"> 
                    <v-radio label="fan" value="fan" color="#6e1131"></v-radio>
                </v-col>
                <v-col md="3" sm="7" cols="7"
                ><v-radio label="manager" value="manager" color="#6e1131"></v-radio
                ></v-col>
              </v-row>
            </v-radio-group>
            <v-col>
            </v-col>
            <TheButton @clicked="update" text="Update" bgColor="#6e1131" textColor="#d3d5d5"/>
            </v-col>
     </v-row>
        </v-form>
    </v-container>
  </template>
  <script>
  import matchDetails from "./MatchDetailsCard.vue";
  export default {
    components: {
      matchDetails,
    },
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
    data() {
        return {
        Name:"",
        firstName: '',
        lastName:'',
        email: '',
        userName:'',
        password: '',
        nationality: '',
        gender:'',
        role:'',
        birthDate:'',
        isValid: false,
        showProfile: false,
        passwordRules: [
            (v) => (v.length <= 15 ) || 'Password must be less than 15 characters',
            (v) => (v.length >= 5 ) || 'Password must be at least 5 characters',
        ],
        usernameRules:[
            (v) => (v.length <= 15 ) || 'Username must be less than 15 characters',
            (v) => (v.length >= 5 ) || 'Username must be at least 5 characters',
        ],
        nameRules: [
            (v) => (v.length <= 30) || 'Name must be less than 30 characters',
            (v) => /^[A-Za-z\s]+$/.test(v) || 'Please insert a right name',
        ],
        notEmptyRules: [(v) => !!v || 'required'], 
        }
    },
    methods: {
      hideMe() {
        this.showDialog = false;
      },
      update(){
        console.log("console.log(username)")
       console.log(this.username)
      }
    },
    computed: {
      username() {
      return this.$store.state.user.username
    },}

  };
  </script>
  
  <style scoped>
 .v-text-field--outlined:deep(fieldset) {
border: 1px solid #e5e5e5;
border-radius: 8px;
text-decoration-color: white;
}
.form-container {
scroll-behavior: smooth;
border-radius: 2px;
background-color: #f1f5f6;
/* box-shadow: 0 0 20px rgba(163, 171, 185, 0.24); */
}
.date{
z-index: 10;
}
.name{
    font-weight: 700;
    font-size: 20px;
  }
  .un{
    color: #475050;
  }
  </style>
  