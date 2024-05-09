import { useParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth, { useAuthType } from "../../hooks/auth.hook";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { key } = useParams();

    const { token } = useAuth() as useAuthType;

    useEffect(()=>{
        // if(!key && token) {
        //     navigate("/");
        // }
        // if(!key && !token) {
        //     navigate("/auth/login");
        // } 
    },[key]);

    return (
        <section className="w-full flex  py-20 sm:py-10 justify-center">
            <div className="w-[450px]">
                 <h3 className="text-xl font-bold">Verify Your Email to Get Started</h3>
            </div>
        </section>
    )
}

export default VerifyEmail;