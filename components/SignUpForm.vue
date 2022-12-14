<template>
    <!-- <v-container fluid class="form-container mx-7" > -->
        <div class="form-container mx-7" >
        <v-form id="login" ref="form" v-model="isValid" action="/login" method="post">
            <!-- <v-row>
            <v-col> -->
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
                <v-icon @click="showDatePicker=!showDatePicker"  color="white">mdi-phone</v-icon>
                <v-date-picker
                v-show="showDatePicker"
                v-model="birthDate"
                color="red lighten-1"
                header-color="green"
                class="date red-text"
                ></v-date-picker>

    
                <v-text-field
                v-model="email"
                class="input-field mt-7"
                :rules="nameRules"
                name="email"
                label="Your Email"
                autocomplete="off"
                color="rgba(0, 0, 0, 0.6)"
                ></v-text-field>

                <v-text-field
                v-model="userName"
                class="input-field mt-7"
                :rules="nameRules"
                name="userName"
                label="username"
                autocomplete="off"
                ></v-text-field>

                <v-text-field
                v-model="password"
                class="input-field mt-7"
                :rules="nameRules"
                name="password"
                label="password"
                autocomplete="off"
                type="password"
                ></v-text-field>
                <v-radio-group v-model="gender" :rules="notEmptyRules">
              <v-row>
                <v-col md="3" sm="5" cols="5"> 
                    <v-radio label="female" value="female" color="#3E9E99"></v-radio>
                </v-col>
                <v-col md="3" sm="7" cols="7"
                ><v-radio label="male" value="male" color="#3E9E99"></v-radio
                ></v-col>
              </v-row>
            </v-radio-group>

               
                
            <v-radio-group v-model="role" :rules="notEmptyRules">
              <v-row>
                <v-col md="3" sm="5" cols="5"> 
                    <v-radio label="fan" value="fan" color="#3E9E99"></v-radio>
                </v-col>
                <v-col md="3" sm="7" cols="7"
                ><v-radio label="manager" value="manager" color="#3E9E99"></v-radio
                ></v-col>
              </v-row>
            </v-radio-group>
            <!-- </v-col> -->
        <!-- </v-row> -->
        </v-form>
    <!-- </v-container> -->
</div>
    </template>
      
    <script>
    export default {
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
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: auto;
  height: auto;
  align-items: center;
  position: relative;
  margin-bottom: 25px;
  background-color: #d3d5d5;
  box-shadow: 0 0 20px rgba(163, 171, 185, 0.24);
}
.date{
    z-index: 10;
}
    </style>
      