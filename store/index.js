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
      role: "",
      approved: false,
    },
    matchDetails: {
      teamOne: "",
      teamTwo: "",
      matchVenue: "",
      date: "",
      mainReferee: "",
      lineMan1: "",
      lineMan2: "",
    },
  });
}
//---------------------------------------- ACTIONS ---------------------------------------------------

export const actions = {
  async login({ commit }, user) {
    await axios
      .post("http://localhost:8888/users/login", user)
      .then((res) => {
        console.log(res.data.user);
        commit("auth_init", state, user, token);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async matchDetails({ commit }) {
    await axios
      .get("http://localhost:8888/fan/allmatches")
      .then((res) => {
        // console.log(res.data.match);
        commit("match_details", state, res.data.match);
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

  match_details(state, matchDetails) {
    console.log("hereeeeeeeeeeeeeeeeeeeeeee");
    console.log(matchDetails);
    state.teamOne = matchDetails.teamOne;
    state.teamTwo = matchDetails.teamTwo;
    state.matchVenue = matchDetails.matchVenue;
    state.date = matchDetails.date;
    state.mainReferee = matchDetails.mainReferee;
    state.lineMan1 = matchDetails.lineMan1;
    state.lineMan2 = matchDetails.lineMan2;
  },
};
