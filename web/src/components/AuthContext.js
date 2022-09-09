import React, { useReducer, useEffect, createContext } from "react";
import axios from "axios";
import LoginPage from "./../pages/LoginPage";
//* um context e um componente que tem componentes filhos
//* pode nao ser um context pode ser apenas um componente global

let AuthContext = createContext();

//O context só dá render da App quando tiver guardado o token no State
const AuthReducer = (action, state = {}) => {
    const token = localStorage.getItem("Authorization");
    if (token === null || token === undefined) {
        return <LoginPage />;
    }

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                status: "LOGIN",
                userToken: token,
            };
        case "CHECKAUTHSTATE":
            if (token) {
                axios.defaults.headers.common["Authorization"] = token;
            }
            return {
                ...state,
                status: "CHECKINGAUTHSTATE",
                userToken: token,
            };

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                status: "LOGOUT",
                userToken: null,
            };
        default:
            return {
                ...state,
                status: "default",
                userToken: token,
            };
    }
};
const Initialstate = {
    //* Initialstate:
    status: "InitalState",
    userToken: null,
};

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, Initialstate);
    let value = { state, dispatch };
    useEffect(() => {
        dispatch({ type: "CHECKAUTHSTATE" });
    }, [state.token]);
    return (
        <AuthContext.Provider value={value}>
            {!state.loading && props.children}
        </AuthContext.Provider>
    );
};

export { AuthContextProvider, AuthContext };