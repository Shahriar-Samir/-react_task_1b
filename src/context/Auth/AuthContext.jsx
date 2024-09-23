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
  switch (action.type) {
    case "LOGIN":{
     const status = await sdk.check('admin')
     if(!status.error){
      console.log('Authenticated')
      return {
        ...state,
        isAuthenticated: true,
        role:'admin'
      };
     }
      return state
    }
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
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
   const checkAuthentication = async()=>{
    try{
      const status = await sdk.check('admin')
       if(!status.error){
         console.log('Authenticated')
         return dispatch({isAuthenticated: true,
           role: admin,})
        }
        console.log('not Authenticated')
         return dispatch(initialState)
     }
     catch(err){
       return err
     }
   }
   checkAuthentication()
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
