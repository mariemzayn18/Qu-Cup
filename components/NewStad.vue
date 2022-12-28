<template>
    <v-container class="new-stad">
            <v-form
            class="form-container pa-10"
            ref="form"
            v-model="isValid"
            action="/login"
            method="post"
            >
            <v-row> <h3 class="my-4">New Stadium</h3></v-row>

                <v-row>
                <v-col>
                    <v-text-field
                    v-model="rowsNum"
                    class="input-field mt-7"
                    :rules="numRules"
                    name="rowsNum"
                    label="Rows Number"
                    autocomplete="off"
                    outlined
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!-- TODO check max number -->
                    <v-text-field
                    v-model="seatsNum"
                    class="input-field mt-7"
                    :rules="numRules"
                    name="seatsNum"
                    label="Seats Number per row"
                    autocomplete="off"
                    outlined
                    ></v-text-field>
                </v-col>
            </v-row>
      </v-form>
        <v-row>
            <h4 class="mx-11">Preview</h4>

        </v-row>      
        <v-row class="ma-4">
            <v-col v-for="i in (rowsNum*seatsNum)" :key="i" >
                <v-icon class="seat-icon" size="50" color="#6e1131">mdi-seat</v-icon>   
            </v-col>  
        </v-row>
        <v-row class="align-center">
            <v-col>
                <TheButton
              :clicked="addStadium"
              text="Add"
              :disabled="!isValid" 
              bgColor="#6e1131"
              textColor="#d3d5d5"
            />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            isValid:false,
            isReserved:[],
            seatsNum:"",
            rowsNum:"",
            numRules:[
            (v) => !!v || "required",
            (v) => /^[\d\s ]+$/.test(v) || "Please insert a right number",
            ]
        }
    },
    methods:{ 
        addStadium(){
            console.log("add new stadium")
        }
    },
    created(){
        for (let i =0; i < this.seatsNum; i++)
      this.isReserved[i]= false;
    for (let i =2; i < this.seatsNum ; i+=3)
      this.isReserved[i]= true;
  },
}
</script>
<style>
h3, h4 {
    color:#6e1131;
}
.new-stad {
  background-color: white !important;  
  height: max-content;
}
</style>