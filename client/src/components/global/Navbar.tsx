import { Link } from "react-router-dom";
import useAuth, { useAuthType } from "../../hooks/auth.hook";
import companyLogo from "../../assets/images/image 3.png";

const Navbar = () => {
    const { token,logout } = useAuth() as useAuthType;

    return (
        <nav className="w-full sm:px-5 px-16 py-3 bg-white">
            <div className="flex justify-between items-center">
                 <img src={companyLogo} alt="Trello"/>
                 {token ? (
                     <button onClick={()=>logout()} className="bg-primary font-medium py-[6px] px-[10px] text-sm rounded-[5px] text-white">Sign Out</button>                    
                 ) : (
                   <div className="flex items-center gap-x-2 xs:hidden">
                    <Link to="/auth/login">
                       <button className="font-medium py-2 px-2 text-sm">Log In</button>
                    </Link>
                    <Link to="/auth/register">
                       <button className="bg-primary font-medium py-[6px] px-[10px] text-sm rounded-[5px] text-white">Sign Up</button>
                    </Link>
                  </div>
                 )}
            </div>
        </nav>
    )
}

export default Navbar;