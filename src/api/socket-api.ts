import { Socket, io } from "socket.io-client";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export class SocketApi {
    static socket: null | Socket = null

    static createConnection() {
        this.socket = io('http://localhost:3000/', {
            auth: {
                token: getTokenFromLocalStorage() // Передаем токен как аутентификационные данные
            }
        });

        this.socket.on('connect', () => {
            console.log('connected')
        })

        this.socket.on('disconnect', (e) => {
            console.log('disconnected', e)
        })
    }
}

export default SocketApi