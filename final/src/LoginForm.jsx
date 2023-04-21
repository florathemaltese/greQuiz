import React, { useState } from "react";

function LoginForm({ onLogin, error, setError }) {
    const [username, setUsername] = useState("");

    function onChange(e) {
        setUsername(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (username) {
            onLogin(username);
        } else {
            // Update error state with error message
            setError("Username is required.");
        }
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={onSubmit}>
                <label htmlFor={`login__username_${username}`}>
                    <span>Username:</span>
                    <input
                        className="login__username"
                        id={`login__username_${username}`}
                        name="username"
                        value={username}
                        onChange={onChange}
                    />
                </label>
                <button className="login__button" type="submit">
                    Login
                </button>
                {/* Display error message */}
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default LoginForm;
