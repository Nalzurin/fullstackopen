import loginFunc from "../services/login";
import { useState } from "react";
export default function LoginForm({ setUser }) {
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
    } catch (exception) {
      console.log(`${exception.message}. Bad Credentials`);
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
