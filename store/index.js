import axios from 'axios'
export const state = newFunction();
function newFunction() {
  return () => ({
    Theme: {
      color1: "#6e1131", //purple
      color2: "#d3d5d5", // gray
      color3:"#d6e4e5", // white
      titleFontSize: "38px",
      subTitleFontSize: "24px",
      paragraphFontSize: "20px",
    },
    //------------------ user data  ----------------------
    status:"",
    // token: localStorage.getItem("token") || "",
    user: {
      firstName:"",
      lastName:"",
      email: "",
      password: "",
      birthDate: "",
      username: "",
      nationality: "",
      gender: "",
      role: "",
    },
  });
}
//---------------------------------------- ACTIONS ---------------------------------------------------

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  },
  async login({ commit }, user) {
    return new Promise((resolve, reject) => {
       this.commit('auth_request')
       axios.post( '/login',{
         username: user.email,
         password: user.password,
         role: user.role,
       })
       .then((res) => {
         const token = res.data.res.data.token;
         const user = res.data.res.data.user;
       
         // ------------------------ User -------------------------
         this.commit("auth_init",user)
      //    if (typeof window !== 'undefined') {
      //     const token = typeof window !== 'undefined' ?  localStorage.setItem("token", token): null;
      // }
      // if (process.client) {
      //   localStorage.setItem("token", token);
      // }
         axios.defaults.headers.common["Authorization"] = token;
         commit("auth_success", token, user);
         resolve(res);
        
       })
       .catch((err) => {
         alert(err);
         commit("auth_error");
      //    if (typeof window !== 'undefined') {
      //     const token = typeof window !== 'undefined' ? localStorage.removeItem("token") : null;
      // }
      // if (process.client) {
      //   localStorage.removeItem("token");
      // }
         reject(err);
       });
     });
 },
}
//---------------------------------------- MUTATIONS ---------------------------------------------------
export const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  auth_init(state,user) {
    state.user = user;
    state.user.username = user.username;
    state.user.firstName = user.firstName;
    state.user.lastName = user.lastName;
    state.user.password = user.password;
    state.user.email = user.email;
    state.user.birthDate = user.birthDate;
    state.user.nationality = user.nationality;
    state.user.role = user.role;
  },
}
