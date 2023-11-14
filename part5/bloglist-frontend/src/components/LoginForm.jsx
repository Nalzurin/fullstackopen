import loginFunc from "../services/login";
import { useState } from "react";
export default function LoginForm({ setUser, setNotification }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const Login = async (event) => {
    event.preventDefault();
    try {
      const result = await loginFunc.loginUser({
        username: login,
        password: password,
      });
      console.log(result);
      setUser(result);
      setLogin("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(result));
      setNotification({ message: "Logged in", failure: false });
      setTimeout(() => {
        setNotification({
          message: null,
          failure: false,
        });
      }, 5000);
    } catch (exception) {
      console.log(exception.message);
      setNotification({ message: `${exception.message}. Wrong login or password`, failure: true });
      setTimeout(() => {
        setNotification({
          message: null,
          failure: false,
        });
      }, 5000);
    }
  };
  return (
    <div>
      <form onSubmit={Login}>
        <div>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            value={login}
            onChange={({ target }) => setLogin(target.value)}
            name="login"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="password"
          ></input>
        </div>
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
}
