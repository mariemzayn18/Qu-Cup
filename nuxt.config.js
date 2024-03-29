import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Fifa World Cup",
    title: "Fifa World Cup",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/global.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // TODO dy kant gwa e ana kargtha brar el []w el 7aga fdlt sha8ala
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
  ],
  axios: {
    baseURL: "http://localhost:9090",
    credentials: true,
  },
  auth: {
    token: {
      prefix: "_token.",
      global: true,
    },
  },
  // proxy: {
  //   '/api/': { target: 'http://localhost:9090', pathRewrite: {'^/api/': ''}, changeOrigin: true }
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
  },

  loading: {
    color: "#492293",
    height: "3px",
    throttle: 0,
    duration: 6000,
  },
};
