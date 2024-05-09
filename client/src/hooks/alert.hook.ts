import { create } from "zustand";

export type useAlertType = {
    message:string;
    isShow:boolean;
    openAlert: (message:string) => void;
    closeAlert: () => void;
}

const useAlert = create<useAlertType>((set) => ({
     message:"",
     isShow:false ,
     openAlert: (message: string) => {
         set({
             message: message ,
             isShow: true 
         });
     },
     closeAlert: () => {
        set({
            isShow:false,
            message:""
        });
     },
}));

export default useAlert;