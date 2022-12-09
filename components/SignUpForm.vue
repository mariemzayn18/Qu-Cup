<template>
    <v-container fluid>
        <v-form id="login" ref="form" v-model="isValid" class="form-container" action="/login" method="post">
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

                <v-text-field
                v-model="nationality"
                class="input-field mt-7"
                :rules="nameRules"
                name="nationality"
                label="Your Nationality"
                autocomplete="off"
                ></v-text-field>

                <v-text-field
                v-model="birthDate"
                class="input-field mt-7"
                :rules="nameRules"
                name="birthDate"
                label="birthDate"
                autocomplete="off"
                ></v-text-field>

                <v-text-field
                v-model="nationality"
                class="input-field mt-7"
                :rules="nameRules"
                name="nationality"
                label="Your ROLLLE"
                autocomplete="off"
                ></v-text-field>
                <v-radio-group v-model="gender" :rules="notEmptyRules">
              <v-row>
                <v-col md="3" sm="5" cols="5"> 
                    <v-radio label="female" value="female" color="#3E9E99"></v-radio>
                </v-col>
                <v-col md="3" sm="7" cols="7"
                ><v-radio label="male" value="male" color="#3E9E99"></v-radio
                ></v-col>
                <!-- <v-date-picker
      v-model="picker"
      color="green lighten-1"
    ></v-date-picker> -->
              </v-row>
            </v-radio-group>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
    
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
            birthDate:'',
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
    </style>
      