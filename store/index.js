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
    token:  "",
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
      role: "",
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
      .post("http://localhost:8888/login", user)
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        const token = res.data.token;

        console.log("tokkkkkkkkkkken");
        console.log(token);
      
        commit("auth_init", { user, token });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async signup({ commit }, user) {
    await axios.post("http://localhost:8888/signup", user);
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
    await axios.put("http://localhost:8888/edit_profile", user, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
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
  //--------------------------- check btb3ty eh f el body? ----------------------------
  async reserveMatch({ commit }, match) {
    await axios
      .post("http://localhost:8888/fan/reservation", match,
      {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getReservations({ commit }, _id) {
    console.log("qqqqqqqqqqq")
    console.log(_id)
    console.log(this.state.token)
    await axios
      .post("http://localhost:8888/fan/allreservation", _id,
      {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      }
      )
      .then((res) => {
        console.log("get reserbationsss")
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async cancelReservation({ commit }, _id) {
    await axios
      .post("http://localhost:8888/fan/cancelreservation", _id,
      {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      }
      )
      .then((res) => {
        console.log(res.data);
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
        commit("match_details", res.data.match);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //----------------------- manager actions ---------------------------
  async addMatch({ commit }, match) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(match);
    console.log(this.state.token);
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWMwMzIxN2IzZDRiMzc2NGM5ZTdiOCIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjcyMzQ4ODI5fQ.MXYN2gSsPZGDZ0EV5UYY2KKHcol-nQMHFnNRmrneeeY
    await axios
      .post("http://localhost:8888/manager/match", 
        match,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }         
      )
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
      .patch(`http://localhost:8888/manager/match/${match.ID}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in edit match");
        console.log(err);
      });
  },
 
  async getMatch({ commit }, matchID) {
    console.log(stad);
    await axios
      .get(`http://localhost:8888/match/${matchID}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in adding stadium");
        console.log(err);
      });
  },
  //------- view seats is in the comp
  //------------------------- admin actions ----------------------------
  async approveUser({ commit }, ID) {
    console.log("approve user");
    await axios
      .post(`http://localhost:8888/admin/approve`, ID,
      {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
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
      .get("http://localhost:8888/admin/allusers", {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
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
      .delete(`http://localhost:8888/admin/${ID}`,
      {headers: {
        Authorization: `Bearer ${this.state.token}`,
      }},)
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
  auth_init(state, obj) {
    state.token = obj.token;
    state.user.username = obj.user.userName;
    state.user.firstName = obj.user.firstName;
    state.user.lastName = obj.user.lastName;
    state.user.password = obj.user.password;
    state.user.email = obj.user.email;
    state.user.birthDate = obj.user.birthDate;
    state.user.nationality = obj.user.nationality;
    state.user.role = obj.user.role;
    state.user.ID = obj.user._id;
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%")
    this.$auth.$storage.setLocalStorage("token",obj.token)
    this.$auth.$storage.setLocalStorage("user",obj.user)
    console.log(this.$auth.$storage.getLocalStorage("user"))
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
    this.$auth.$storage.setLocalStorage("token", token)
    this.$auth.$storage.setLocalStorage("user",user)
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
      match["ID"] = matchDetails[i]._id;
      state.matchDetails.push(match);
    }
  },
};
