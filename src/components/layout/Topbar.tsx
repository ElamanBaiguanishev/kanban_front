import { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { IoSettingsOutline } from "react-icons/io5";
import './header.css'
import { FaSignOutAlt } from "react-icons/fa";

const Topbar: FC = () => {
  const isAuth = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userName = useAppSelector((state) => state.user.user!)

  const logoutHandler = () => {
    dispatch(logout())
    removeTokenFromLocalStorage('token')
    navigate('/auth')
  }

  return (
    <header>
      <div className="header-container">
        <h1>ВКР</h1>
        {
          isAuth ? (
            <div className="header-links">
              <Link to={"/settings"}><IoSettingsOutline /></Link>
              <Link to={`/profile/${userName.id}`} className="header-username">{userName.name}</Link>
              <button onClick={logoutHandler}>
                <span>Log Out</span>
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to={"/auth"}>Log In / Sign In</Link>
          )
        }
      </div>
    </header>
  );
};

export default Topbar;