<template>
    <v-container fluid class="container-div my-10">
        <v-row>
            <v-col class="mx-5" cols="4">
                <SignUpForm/>
            </v-col>
            <v-col>
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
    
    </style>
      