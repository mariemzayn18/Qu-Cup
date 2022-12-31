<template>
<v-container fluid class="container-div my-8">
    <v-row>
        <v-col cols="2"></v-col>
        <v-col class="my-5" cols="4">
            <v-form id="login" class="form-container pa-6" ref="form" v-model="isValid" method="post">
            <v-row>
            <v-col>

                <v-text-field
                v-model="username"
                class="input-field mt-7"
                :rules="usernameRules"
                name="username"
                label="username"
                autocomplete="off"
                ></v-text-field>

                <v-text-field
                v-model="password"
                class="input-field mt-7"
                :rules="passwordRules"
                name="password"
                label="password"
                autocomplete="off"
                type="password"
                ></v-text-field>
            <!-- <v-radio-group v-model="role" :rules="notEmptyRules">
              <v-row>
                <v-col md="3" sm="5" cols="5"> 
                    <v-radio label="fan" value="fan" color="#6e1131"></v-radio>
                </v-col>
                <v-col md="3" sm="7" cols="7"
                ><v-radio label="manager" value="manager" color="#6e1131"></v-radio
                ></v-col>
              </v-row>
            </v-radio-group> -->
            <TheButton @clicked="login" route="/" :disabled="!isValid" text="Log in" bgColor="#6e1131" textColor="#d3d5d5"/>
            </v-col>  
      </v-row>
        </v-form>
        </v-col>
        <v-col  >
         </v-col>
       
    </v-row>
</v-container>

</template>
  
<script>
import TheButton from '../components/TheButton.vue'

export default {
    components:{
        TheButton
    },
    data() {
        return {
        password: '',
        username:'',
        isValid: false,
        showDialog: false,
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) =>
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(
                v
            ) || 'Invalid Email',
        ],
        nameRules: [
            (v) => !!v || 'Name is required',
            (v) => (v && v.length <= 30) || 'Name must be less than 30 characters',
            (v) => /^[A-Za-z\s]+$/.test(v) || 'Please insert a right name',
        ],
        passwordRules: [
            (v) => !!v || ' Password is required',
            (v) => (v && v.length <= 15 ) || 'Password must be less than 15 characters',
            (v) => (v && v.length >= 5 ) || 'Password must be at least 5 characters',
        ],
        usernameRules:[
            (v) => !!v || ' Username is required',
            (v) => (v && v.length <= 15 ) || 'Username must be less than 15 characters',
            (v) => (v && v.length >= 5 ) || 'Username must be at least 5 characters',
        ],
        notEmptyRules: [(v) => !!v || 'required'],
        }
    },
    methods:{
        login(){
            console.log("login")
            console.log(this.username)
            console.log(this.password)
            let username= this.username
            let password =this.password
            this.$store.dispatch('login',{username,password})
            // this.$router.push({path:'/'})
            // window.location.reload(true)  
        
        }
    }

};
</script>
<style scoped>
.container-div {
    background-image: url('../assets/imgs/bg_right.jpg');
    background-size: cover; /* or contain depending on what you want */
    background-position: center center;
    background-repeat: no-repeat;
    width:100%;
    height: 100vh;
}
.v-text-field--outlined:deep(fieldset) {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  text-decoration-color: white;
}
.form-container {
  height: 500px;
  widows: 30%;
  border-radius: 20px;
  background-color: #d3d5d5;
}

</style>
