import React, { useState } from "react";
import "./Form.scss";

const Form = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("deu submit");
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
      {type === "login" ? (
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
      ) : (
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
      )}
    </form>
  );
};

export default Form;
