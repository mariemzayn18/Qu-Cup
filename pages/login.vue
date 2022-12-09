<template>
<v-container class="container-div">
    <v-row>
        <v-col cols="4">
            <SignUpForm/>
        </v-col>
        <v-col>
            <img src="../assets/imgs/home_bg.jpg" alt="">
        </v-col>
    </v-row>
</v-container>

</template>
  
<script>
import SignUpForm from '../components/SignUpForm.vue'
export default {
    components:{
        SignUpForm
    },
    data() {
        return {
        firstName: '',
        lastName:'',
        email: '',
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
.container-div {
    /* background-image: url('../assets/imgs/home_bg.jpg'); */
    background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
}
img{
    width: 100%;
    height:auto;
}
</style>
  