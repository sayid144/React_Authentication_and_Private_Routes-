
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import Register from "./user/Register";
import Login from "./user/Login";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Profile from "./user/Profile";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {

  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    window.Location.reload();
    navigate('/login');
  }


  return (
    <div className="bg-slate-50">

      <nav className="h-full bg-white py-5 px-2">

        <div className="container mx-auto flex justify-between items-center shadow-lg py-5 px-10">
          <h3 className="text-3xl font-bold text-blue-500">Gabi school</h3>
          <ul className="md:static md:flex md:gap-2 md:w-auto w-[80%] md:h-auto h-[100vh] absolute top[70px] right-0 bg-red-300
                        md:bg-white md:!text-slate-800 text-white z-10">
            <li><Link to="/" className="bg-red-500 px-2 py-2 rounded-3xl text-white">Notes</Link></li>

            {isAuthenticated && (
              <>
                <li><Link to="/notes/addNote" className="bg-red-500 px-2 py-2 rounded-3xl text-white">Add Note</Link></li>
                <li><Link to="/profile" className="bg-red-500 px-2 py-2 rounded-3xl text-white">Profile</Link></li>
                <li> <Link onClick={() => handleLogout()} className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white">Logout</Link></li>

              </>
            )}

            {!isAuthenticated && (
              <>
                <li><Link to="/register" className="bg-red-500 px-2 py-2 rounded-3xl text-white">Register</Link></li>
                <li><Link to="/login" className="bg-red-500 px-2 py-2 rounded-3xl text-white">Login</Link></li>
              </>
            )}

          </ul>

        </div>
      </nav>


      <Routes>
        <Route path="/notes/edit_note/:id" element={<EditNote />} />
        <Route path="/notes/addNote" element={<PrivateRoute />}>
          <Route path="/notes/addNote" element={<AddNote />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>



        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Notes />} />
      </Routes>
    </div>
  );
}

export default App;