import React, { useReducer } from "react";
import MkdSDK from "Utils/MkdSDK";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

export const AuthContext = React.createContext(initialState);

const reducer =async (state, action) => {
  const stateRes = await state
  switch (action.type) {
    case "LOGIN":{
     const status = await sdk.check('admin')
     if(!status.error){
      return {
        ...stateRes,
        isAuthenticated: true,
        role:'admin'
      };
     }
      return stateRes
    }
    case "LOGOUT":
      localStorage.clear()
      return {
        ...stateRes,
        isAuthenticated: false,
        user: null,
    };
    default:
      return stateRes;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);



  React.useEffect(() => {
        dispatch({type: 'LOGIN'})
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
