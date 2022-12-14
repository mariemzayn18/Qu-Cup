
<template>
    <div class="btn">
      <NuxtLink :to="route">
        <button :style="buttonColor">
          {{ text }}
        </button>
      </NuxtLink>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      text: String,
      route: {
        type: [String],
        default: "",
      },
      width: String,
      height: String,
    },
    computed: {
      Theme() {
        return this.$store.state.Theme;
      },
  
      buttonColor() {
        return {
          width: this.width,
          height: this.height,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  @media only screen and (max-width: 990px) {
    button {
      width: 150px !important;
      height: 45px !important;
    }
  }
  button {
    width: 120px;
    height: 50px;
    border-radius: 10px;
    color: #6e1131;
    text-decoration: none;
    font-size: 18px;
    line-height: 21.94px;
    background-color:  #d3d5d5;
  }
  </style>
  