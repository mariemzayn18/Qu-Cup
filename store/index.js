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
    baseUrl: "https://localhost:8000",
    token: "",
    user: {
      firstName: "",
      lastName: "",
      ID: "",
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
    //------------------------ admin data ----------------------
    users: [],
  });
}
//---------------------------------------- ACTIONS ---------------------------------------------------

export const actions = {
  //------------------------------- user actions --------------------------------
  async login({ commit }, user) {
    await axios
      .post("http://localhost:8000/login", user)
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
    await axios.post("http://localhost:8000/signup", user);
    console
      .log(user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        const user = res.data.user;
        const token = res.data.token;
        commit("sign_up", user, token);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async editProfile({ commit }, user) {
    console.log("edit profile");
    console.log(this.state.token);
    await axios.put("http://localhost:8000/edit_profile", user, {
      headers: {
        Authorization: `Basic ${this.state.token}`,
      },
    });
    console
      .log(user)
      .then((res) => {
        console.log(res);
        // TODO need to reflict this change ? need commit or get user data
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //------------------------- match actions ----------------------------
  async matchDetails({ commit }) {
    await axios
      .get("http://localhost:8000/fan/allmatches")
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
    console.log(match);
    await axios
      .post("http://localhost:8000/manager/match", match)
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
  async editMatch({ commit }, match) {
    console.log(match);
    await axios
      .patch(`http://localhost:8000/manager/match/${match.ID}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in edit match");
        console.log(err);
      });
  },
  async addStad({ commit }, stad) {
    console.log(stad);
    await axios
      .post("http://localhost:8000/manager/stadium", stad)
      .then((res) => {})
      .catch((err) => {
        console.log("Error in adding stadium");
        console.log(err);
      });
  },
  async getMatch({ commit }, matchID) {
    console.log(stad);
    await axios
      .get(`http://localhost:8000/match/${matchID}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in adding stadium");
        console.log(err);
      });
  },
  async viewSeats({ commit }, match) {
    console.log(match);
    await axios
      .get(`http://localhost:8000/manager/match/viewseats/${match.ID}`)
      .then((res) => {
        console.log("showwwwwwwwwwwwwwwwwww");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in edit match");
        console.log(err);
      });
  },
  //------------------------- admin actions ----------------------------
  async approveUser({ commit }, ID) {
    console.log("approve user");
    await axios
      .post(`http://localhost:8000/admin/approve`, ID)
      .then((res) => {
        console.log("approve user showwwwwwwwwwwwwwwwwww");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in approve user");
        console.log(err);
      });
  },
  async getUsers({ commit }) {
    console.log("get userrrr");
    await axios
      .get(`http://localhost:8000/admin/allusers`)
      .then((res) => {
        console.log("get users showwwwwwwwwwwwwwwwwww");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in get user");
        console.log(err);
      });
  },
  async deleteUser({ commit }, ID) {
    console.log("delete user");
    await axios
      .delete(`http://localhost:8000/admin/${ID}`)
      .then((res) => {
        console.log("delete user showwwwwwwwwwwwwwwwwww");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in delete user");
        console.log(err);
      });
  },
};
//---------------------------------------- MUTATIONS ---------------------------------------------------
export const mutations = {
  auth_init(state, user, token) {
    state.token = token;
    console.log("mutation login");
    console.log(state.token);
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
    console.log("mutation signup");
    state.token = token;
    state.user.username = user.userName;
    state.user.firstName = user.firstName;
    state.user.lastName = user.lastName;
    state.user.password = user.password;
    state.user.email = user.email;
    state.user.birthDate = user.birthDate;
    state.user.nationality = user.nationality;
    state.user.role = user.role;
    state.user.ID = user._id;
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
