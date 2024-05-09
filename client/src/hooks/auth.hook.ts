import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const userToken = JSON.parse(localStorage.getItem('auth:token') || 'null') || null;

export type useAuthType = {
    user: {
        name:string;
        email:string;
        exp:number;
    } | null,
    token:string | null;
    logout: () => void;
    login: (token:string) => void
}

const useAuth = create<useAuthType>((set) => ({
      token: userToken,
      user: userToken ? jwtDecode(userToken) : null,
      login: (token: string) => {
         localStorage.setItem('auth:token' , JSON.stringify(token));

          set({
             user: jwtDecode(token),
             token
         })
      },
      logout: () => {
           localStorage.setItem('auth:token' ,JSON.stringify(null));
           
           set({
              user:null,
              token:null
          });
      }
}));


export default useAuth;