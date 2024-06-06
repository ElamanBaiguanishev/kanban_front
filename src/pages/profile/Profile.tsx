import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api/axios.api";
import "./Profile.css"; // Подключаем файл со стилями

const Profile: FC = () => {
    const { userId } = useParams<{ userId: string }>()
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Выполняем GET запрос для получения данных пользователя
                const response = await instance.get(`/user/${userId}`)
                // Обновляем состояние данных пользователя
                setUserData(response.data)
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        };

        fetchUserData();
    }, [userId])

    return (
        <div className="profile-container">
            {userData ? (
                <div className="profile-info">
                    <h2>User Profile</h2>
                    <img src={`http://localhost:3000/${userData.image}`} alt="User Image" className="profile-image" />
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    {/* Другие данные о пользователе */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
