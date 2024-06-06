import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useEffect } from "react";
import { login, logout } from "./store/user/userSlice";
import { AuthService } from "./services/auth.service";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch()

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if (token) {
        const data = await AuthService.getProfile()

        if (data) {
          dispatch(login(data))
        } else {
          dispatch(logout())
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return <RouterProvider router={router} />
}

export default App;
