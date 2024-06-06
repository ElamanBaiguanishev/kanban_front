import { FC, useState } from "react"
import { AuthService } from "../../services/auth.service"
import { setTokenToLocalStorage } from "../../helpers/localstorage.helper"
import { useAppDispatch } from "../../store/hooks"
import { login } from "../../store/user/userSlice"
import { useNavigate } from "react-router-dom"
import './auth.css' // Import the CSS file


const Auth: FC = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({ email, password })

            if (data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))

                navigate('/')

                window.location.reload();
            }
        } catch (err: any) {
            const error = err.response?.data.message
            console.log(error.toString())
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({ name, email, password })

            if (data) {
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            console.log(error.toString())
        }
    }

    return <div className="auth-container">
        <h1 style={{ marginTop: 0 }}>
            {
                isLogin ? 'Форма входа' : 'Регистрация'
            }
        </h1>

        <form
            className="auth-form"
            onSubmit={isLogin ? loginHandler : registrationHandler}>
            {
                isLogin ? '' : <input type="text" placeholder="Name"
                    onChange={(e) => setName(e.target.value)} />
            }
            <input type="text" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            <button>
                Submit
            </button>
        </form>

        <div className="toggle-auth-mode">
            {
                isLogin ? (
                    <button onClick={() => setIsLogin(!isLogin)}>
                        Регистрация
                    </button>
                ) : (
                    <button onClick={() => setIsLogin(!isLogin)}>
                        Войти
                    </button>
                )
            }
        </div>
    </div>
}

export default Auth
