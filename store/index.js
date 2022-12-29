import axios from "axios";
export const state = newFunction();
function newFunction() {
  return () => ({
    Theme: {
      color1: "#6e1131", //purple
      color2: "#d3d5d5", // gray
      color3: "#d6e4e5", // white
      titleFontSize: "38px",
      subTitleFontSize: "24px",
      paragraphFontSize: "20px",
    },
    //------------------ user data  ----------------------
    status: "",
    baseUrl: "https://localhost:8888",
    token: "44",
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      username: "",
      nationality: "",
      gender: "",
      role: "manager",
      approved: false,
    },
    matchDetails: [],
  });
}
//---------------------------------------- ACTIONS ---------------------------------------------------

export const actions = {
  //------------------------------- user actions --------------------------------
  async login({ commit }, user) {
    await axios
      .post("http://localhost:8888/users/login", user)
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        const token = res.data.token;
        commit("auth_init", user, token);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async signup({ commit }, user) {
    await axios
      .post("http://localhost:8888/users/signup", user)
      console.log(user)
      .then((res) => {
        console.log(res) 
            console.log(res.data)
            const user = res.data.user;
              const token = res.data.token
              commit('sign_up',user,token)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //------------------------- match actions ----------------------------
  async matchDetails({ commit }) {
    await axios
      .get("http://localhost:8888/fan/allmatches")
      .then((res) => {
        // console.log(res.data.match);
        commit("match_details", res.data.match);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //----------------------- manager actions ---------------------------
  async addMatch({ commit }, match) {
    console.log(match)
    await axios
      .post("http://localhost:8888/match", match)
      .then((res) => {
        console.log(res.data);
        const user = res.data.user;
        const token = res.data.token;
        // commit("auth_init", user, token);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async addStad({ commit }, stad) {
    console.log(stad)
    await axios
      .post("http://localhost:8888/stadium", stad)
      .then((res) => {
        console.log(res.data);
        // commit("auth_init", user, token);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
//---------------------------------------- MUTATIONS ---------------------------------------------------
export const mutations = {
  auth_init(state, user, token) {
    state.token = token;
    state.user.username = user.userName;
    state.user.firstName = user.firstName;
    state.user.lastName = user.lastName;
    state.user.password = user.password;
    state.user.email = user.email;
    state.user.birthDate = user.birthDate;
    state.user.nationality = user.nationality;
    state.user.role = user.role;
  },
  sign_up(state, token) {
    console.log("mutation signup")
    state.token = token;
    state.user.username = user.userName;
    state.user.firstName = user.firstName;
    state.user.lastName = user.lastName;
    state.user.password = user.password;
    state.user.email = user.email;
    state.user.birthDate = user.birthDate;
    state.user.nationality = user.nationality;
    state.user.role = user.role;
  },

  match_details(state, matchDetails) {
    for (var i = 0; i < matchDetails.length; i++) {
      var match = {};
      match["teamOne"] = matchDetails[i].teamOne;
      match["teamTwo"] = matchDetails[i].teamTwo;
      match["matchVenue"] = matchDetails[i].matchVenue;
      match["date"] = matchDetails[i].date;
      match["mainReferee"] = matchDetails[i].mainReferee;
      match["lineMan1"] = matchDetails[i].lineMan1;
      match["lineMan2"] = matchDetails[i].lineMan2;
      state.matchDetails.push(match);
    }
  },
};
