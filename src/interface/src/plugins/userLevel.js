import axios from "axios";
import { host } from "@/config/global";

const userLevel = {
  install(Vue) {
    Vue.prototype.$userLevel = async function(token) {
      var level;
      if (this.$store.state.token != "") {
        try {
          let userInfo = await axios.get(`${host}/users/${token}/token`, {
            headers: {
              Authorization: `token ${token}`
            }
          });
          level = userInfo.data.level;
        } catch (e) {
          level = 0;
        }
      } else {
        level = 0;
      }
      return level;
    };
  }
};

export default userLevel;
