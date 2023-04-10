const { useState } = require("react");

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");

    function onChange(e) {
        setUsername(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        onLogin(username);
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
            </form>
        </div>
    );
}

export default LoginForm;
