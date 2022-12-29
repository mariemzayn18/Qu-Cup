<template>
    <v-container>
        <v-row class="ma-4">
            <v-col v-for="i in seatsNum" :key="i" cols="1">
                <v-icon class="seat-icon" size="30" color="#6e1131" :class="{reserved:isReserved[i]}" >mdi-seat</v-icon>   
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            isReserved:[],
            seatsNum:80
        }
    },
    created(){
        for (let i =0; i < this.seatsNum; i++)
      this.isReserved[i]= false;
    for (let i =2; i < this.seatsNum ; i+=3)
      this.isReserved[i]= true;
  }
    

}
</script>
<style>
.reserved{
    color:black !important;
}
</style>