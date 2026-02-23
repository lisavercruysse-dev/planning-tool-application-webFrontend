// gebruiken wanneer api call er is

// // src/contexts/Auth.context.jsx
// import useSWRMutation from "swr/mutation";
// import * as api from "../api";
// import useSWR from "swr";
// import { JWT_TOKEN_KEY, AuthContext } from "./auth";
// import { jwtDecode } from "jwt-decode";

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));

//   const hasRole = useCallback(
//     (role = "") => {
//       if (token) {
//         const decoded = jwtDecode < JwtPayload > token;
//         return decoded.roles.includes(role) || !role;
//       }
//       return false;
//     },
//     [token],
//   ); // only changes when token changes

//   const {
//     data: user,
//     isLoading: userLoading,
//     error: userError,
//   } = useSWR(token ? "users/me" : null, api.getById);

//   const {
//     trigger: doLogin,
//     isMutating: loginLoading,
//     error: loginError,
//   } = useSWRMutation("sessions", api.post);

//   const {
//     isMutating: registerLoading,
//     error: registerError,
//     trigger: doRegister,
//   } = useSWRMutation("users", api.post);

//   const setSession = useCallback((token) => {
//     setToken(token);
//     localStorage.setItem(JWT_TOKEN_KEY, token);
//   }, []);

//   const login = useCallback(
//     async (data) => {
//       try {
//         const { token } = await doLogin(data);

//         setSession(token);

//         return true;
//       } catch (error) {
//         console.error(error);
//         return false;
//       }
//     },
//     [doLogin, setSession],
//   );

//   const register = useCallback(
//     async (data) => {
//       try {
//         const { token } = await doRegister(data);
//         setSession(token);
//         return true;
//       } catch (error) {
//         console.error(error);
//         return false;
//       }
//     },
//     [doRegister, setSession],
//   );

//   const logout = useCallback(() => {
//     setToken(null);

//     localStorage.removeItem(JWT_TOKEN_KEY);
//   }, []);

//   const value = useMemo(
//     () => ({
//       token,
//       user,
//       error: loginError || userError || registerError,
//       loading: loginLoading || userLoading || registerLoading,
//       isAuthed: Boolean(token),
//       ready: !userLoading,
//       login,
//       logout,
//       register,
//       hasRole,
//     }),
//     [
//       token,
//       user,
//       loginError,
//       loginLoading,
//       userError,
//       userLoading,
//       registerError,
//       registerLoading,
//       login,
//       logout,
//       register,
//       hasRole,
//     ],
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
