import { FC, useState } from "react";
import "./Profile.css"; // Подключаем файл со стилями
import { instance } from "../../api/axios.api";
import React from "react";

const ProfileSettings: FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await instance.put("user/updatePhoto", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Photo updated successfully:", response.data);
        } catch (error) {
            console.error("Failed to update photo:", error);
        }
    };

    return (
        <div className="profile-container">
            <label htmlFor="file">Поменять фото: </label>
            <input name="file" type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ProfileSettings;