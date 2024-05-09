import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth, { useAuthType } from "../../hooks/auth.hook";

const Home = () => {
    const navigate = useNavigate();
    const { token } = useAuth() as useAuthType;

    useEffect(() => {
        if(!token) {
            navigate('/auth/login');
        }
    },[token])

    return (
        <section className="w-full flex justify-center mt-20"> 
             <div className="max-w-[460px]">
               <h3 className="text-2xl sm:text-[16px] font-bold">Dashboard</h3>
               <div className="w-full bg-white p-4 rounded-md mt-5">
                 <p className="text-sm text-secondary">Welcome to your dashboard! Explore and manage your account effortlessly.</p>
               </div>
            </div>
        </section>
    )
}

export default Home;