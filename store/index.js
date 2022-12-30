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
    baseUrl: "https://localhost:8080",
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
      .post("http://localhost:8080/login", user)
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
    await axios.post("http://localhost:8080/signup", user);
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
    await axios.put("http://localhost:8080/edit_profile", user, {
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

  //------------------------- match actions ----------------------------
  async matchDetails({ commit }) {
    await axios
      .get("http://localhost:8080/fan/allmatches")
      .then((res) => {
        commit("match_details", res.data.match);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //----------------------- manager actions --------------------------

  async getMatch({ commit }, matchID) {
    console.log(stad);
    await axios
      .get(`http://localhost:8080/match/${matchID}`)
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
      .post(`http://localhost:8080/admin/approve`, ID, {
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
  async getUsers({ commit },token) {
    console.log("get userrrr");
    await axios
      .get("http://localhost:8080/admin/allusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("get users showwwwwwwwwwwwwwwwwww");
        console.log(res.data);
        commit("all_users", res.data.users);
      })
      .catch((err) => {
        console.log("Error in get user");
        console.log(err);
      });
  },
  async deleteUser({ commit }, ID) {
    console.log("delete user");
    await axios
      .delete(`http://localhost:8080/admin/${ID}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
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
    state.token = obj.token;
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    // store user object in local storage for page refresh
    localStorage.setItem("user", JSON.stringify(obj.user));
    localStorage.setItem("token", obj.token);
   
    console.log(obj);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("user"));

    // this.$auth.$storage.setUniversal("token", obj.token);
    // this.$auth.$storage.setUniversal("user", obj.user);

    // this.$store.state.localStorage.token = obj.token;
    // console.log(this.$store.state.localStorage.token);
  },
  sign_up(state, obj) {
    console.log("mutation signup");
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
    
    localStorage.setItem("user", JSON.stringify(obj.user));
    localStorage.setItem("token", obj.token);
  },

  match_details(state, matchDetails) {
    state.matchDetails = [];
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
      match["seats"] = matchDetails[i].seats;
      match["seatsNum"] = matchDetails[i].seats.length;
      state.matchDetails.push(match);
    }
  },
  all_users(state, users) {
    state.users = [];
    for (var i = 0; i < users.length; i++) {
      var user = {};
      user["username"] = users[i].userName;
      user["firstName"] = users[i].firstName;
      user["lastName"] = users[i].lastName;
      user["password"] = users[i].password;
      user["email"] = users[i].email;
      user["birthDate"] = users[i].birthDate;
      user["role"] = users[i].role;
      user["ID"] = users[i]._id;
      state.users.push(user);
    }
  },
};
