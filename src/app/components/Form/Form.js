import React, { useState } from "react";
import "./Form.scss";
import { signUp, signIn } from "../../../../public/utils/firebase";

const Form = ({ type }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeName(e) {
    setName(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }

  function handleSignUp(e) {
    e.preventDefault();
    signUp(email, password, name);
  }

  function handleSignIn(e) {
    e.preventDefault();
    signIn(email, password);
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
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Form;
