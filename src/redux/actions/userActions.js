import * as actionTypes from "../types/userTypes";
import instance from "../../utility/axios";

export const register = (newUser) => async (dispatch) => {
  try {
    const res = await instance.post("/api/user/register", newUser);
    console.log("newUser", res.data);
    dispatch({
      type: actionTypes.AUTHENTICATED,
      payload: res.data.results,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.NOT_AUTHENTICATED,
      payload: err.response.data,
    });
  }
};

export const login = (user) => async (dispatch) => {
  try {
    const res = await instance.post("/api/user/login", user);
    console.log("userLogin", res.data);
    localStorage.setItem("token", res.data.Token);
    dispatch({
      type: actionTypes.AUTHENTICATED,
      payload: res.data.results,
    });
  } catch (err) {
    console.log("errAction", err);
    dispatch({
      type: actionTypes.NOT_AUTHENTICATED,
      payload: err.response.data,
    });
  }
};

/* export const logout = (id) => async(dispatch) => {
	try{

	}catch(err){
		console.log(err)
	}
}
 */
