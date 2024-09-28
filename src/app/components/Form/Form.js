import React, { useState } from "react";
import "./Form.scss";
import { signUp, signIn } from "../../../../public/utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../contexts/AuthContext";
import { getAuth } from "firebase/auth";

const Form = ({ type }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = getAuth();

  function changeName(e) {
    setName(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await signUp(email, password, name);
    } catch (error) {
      console.error("Erro ao se registrar", error);
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao logar", error);
    }
  }

  return type === "login" ? (
    <form onSubmit={handleSignIn} className="form-container">
      <div className="form-container__inputs">
        <input
          className="form-container__input"
          type="email"
          name="email"
          placeholder="jonaschagasweb@gmail.com"
          onChange={changeEmail}
          value={email}
        />
        <input
          className="form-container__input"
          type="password"
          name="password"
          placeholder="*********"
          onChange={changePassword}
          value={password}
        />
      </div>

      <div className="form-container__buttons">
        <button className="form-container__button" type="submit">
          Login
        </button>
        <span className="form-container__inner-text">
          No account? Sign up now!
        </span>
        <button
          className="form-container__button form-container__button--secondary"
          type="button"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </button>
      </div>
    </form>
  ) : (
    <form onSubmit={handleSignUp} className="form-container">
      <div className="form-container__inputs">
        <input
          className="form-container__input"
          type="name"
          name="name"
          placeholder="Jonas Chagas"
          onChange={changeName}
          value={name}
        />
        <input
          className="form-container__input"
          type="email"
          name="email"
          placeholder="jonaschagasweb@gmail.com"
          onChange={changeEmail}
          value={email}
        />
        <input
          className="form-container__input"
          type="password"
          name="password"
          placeholder="*********"
          onChange={changePassword}
          value={password}
        />
      </div>
      <div className="form-container__buttons">
        <button className="form-container__button" type="submit">
          Sign up
        </button>
        <span className="form-container__inner-text">
          Do you have an account?
        </span>
        <button
          className="form-container__button form-container__button--secondary"
          type="button"
          onClick={() => router.push("/")}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Form;
