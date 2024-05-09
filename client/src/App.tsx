import { 
  Home,
  Login,
  Register,
  VerifyEmail 
} from "./pages"
import { Route,Routes } from "react-router-dom"
import { Navbar } from "./components"
import useAuth, { useAuthType } from "./hooks/auth.hook"
  

const App = () => {
  const { user,logout } = useAuth() as useAuthType;

  if(user && user.exp < (new Date().getTime() + 1) / 1000) {
     logout();
  }

  return (
    <main className="w-full min-h-screen bg-bgContainer">
        <Navbar/>
        <div className="sm:px-5">
          <Routes>
              <Route index element={<Home/>} />
              <Route path="/auth/login" element={<Login/>}/>
              <Route path="/auth/register" element={<Register/>}/>
              <Route path="/auth/verify-email/:key" element={<VerifyEmail/>}/>
          </Routes>
        </div>
    </main>
  )
}

export default App
