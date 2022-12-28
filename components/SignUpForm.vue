<template>
    <v-container fluid  >
        <!-- <div class="form-container mx-7" > -->
        <v-form id="login" class="form-container pa-6" ref="form" v-model="isValid" action="/login" method="post">
            <v-row>
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
                
                    <v-col>
                        <v-radio-group v-model="gender" :rules="notEmptyRules">
              <v-row>
                <v-col > 
                    <v-radio label="female" value="female" color="#6e1131"></v-radio>
                </v-col>
                <v-col 
                ><v-radio label="male" value="male" color="#6e1131"></v-radio
                ></v-col>
              </v-row>
            </v-radio-group>

                    </v-col>
                </v-row>
            

                

    
                <v-text-field
                v-model="email"
                class="input-field mt-7"
                :rules="emailRules"
                name="email"
                label="Your Email"
                autocomplete="off"
                color="rgba(0, 0, 0, 0.6)"
                ></v-text-field>

                <v-text-field
                v-model="userName"
                class="input-field mt-7"
                name="userName"
                label="username"
                :rules="usernameRules"
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
            <div>
                <v-icon @click="showDatePicker=!showDatePicker"  color="#6e1131">select your birth date</v-icon>
                <v-date-picker
                v-show="showDatePicker"
                v-model="birthDate"
                color="#6e1131 lighten-1"
                header-color="#6e1131"
                class="date"
                ></v-date-picker>

            </div>
            </v-col>
            <TheButton @clicked="onRegister" route="/" :disabled="!isValid" class="align-center" text="Register" bgColor="#6e1131" textColor="#d3d5d5"/>
            </v-col> 

            
            
     </v-row>
        </v-form>
    </v-container>
<!-- </div> -->
    </template>
      
<script>
import TheButton from './TheButton.vue'

export default {
    components:{
        TheButton  
    },
    data() {
        return {
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
        showDialog: false,
        showDatePicker:false,
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) =>
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(
                v
            ) || 'Invalid Email',
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
        nameRules: [
            (v) => !!v || 'Name is required',
            (v) => (v && v.length <= 30) || 'Name must be less than 30 characters',
            (v) => /^[A-Za-z\s]+$/.test(v) || 'Please insert a right name',
        ],
        phoneNumberRules: [
            (v) => !!v || 'This field is required',
            (v) => /^\+?[0-9]+\s*$/.test(v) || 'Invalid Phone Number',
            (v) => (v && v.length >= 6 && v.length <= 1) || 'Invalid Phone Number',
        ],
        notEmptyRules: [(v) => !!v || 'required'],
        }
    },
    methods:{
        onRegister(){
            console.log("register")
            console.log(this.birthDate)
        }
    }

};
</script>
<style scoped>

.v-text-field--outlined:deep(fieldset) {
border: 1px solid #e5e5e5;
border-radius: 8px;
text-decoration-color: white;
}
.form-container {

border-radius: 20px;
background-color: #d3d5d5;
/* box-shadow: 0 0 20px rgba(163, 171, 185, 0.24); */
}
.date{
z-index: 10;
}
</style>
    