<template>
  <div class="btn">
    <NuxtLink :to="route">
      <button :style="buttonColor" :disabled="disabled" @click="buttonClicked">
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
    bgColor: {
      type: [String],
      default: "#d3d5d5",
    },
    textColor: {
      type: [String],
      default: "#6e1131",
    },
    disabled: {
      type: [Boolean],
      default: false,
    },
  },
  computed: {
    Theme() {
      return this.$store.state.Theme;
    },

    buttonColor() {
      return {
        width: this.width,
        height: this.height,
        "color": this.textColor,
        "background-color": this.bgColor,
      };
    },
  },

  methods: {
    buttonClicked() {
      this.$emit("clicked");
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

  text-decoration: none;
  font-size: 18px;
  line-height: 21.94px;
}
</style>
