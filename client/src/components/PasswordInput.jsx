import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function PasswordInput({ value, placeholder, name, onChange, required }) {
    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibilty() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="password-input-container">
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                placeholder={placeholder}
                required={required}
                name={name}
                onChange={onChange}
            />
            <span onClick={togglePasswordVisibilty} className="eye-icon">{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
        </div>
    );
}