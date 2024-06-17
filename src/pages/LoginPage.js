import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import style from "../modules/login.module.css";
import AlertModal from "../components/AlertModal";
import loginLogo from "../assets/LoginLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);
  const [alert, setAlert] = useState("");
  let wHeight = window.innerHeight;

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const axioshandleLogin = async () => {
    const fullEmail = email + "@sookmyung.ac.kr";

    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth/login`,
        data: {
          email: fullEmail,
          password: password,
        },
      })
        .then((response) => {
          console.log("headers: ", response.headers.get("Authorization"));
          console.log("data: ", response.data.data);
          setAlert(response.data.message);
          setAlreadyModalShow(true);

          if (response.data.code === 200) {
            localStorage.setItem("@token", response.headers.get("Authorization"));
            localStorage.setItem("@potId", response.data.data.potInfo.potId);
            localStorage.setItem("@ridingTime", response.data.data.potInfo.ridingTime);
            localStorage.setItem("@nickname", response.data.data.nickname);
            localStorage.setItem("@cash", "0");
            navigate("/");
          }
        })
        .catch(function (error) {
          if (error.response) {
            setAlert("회원이 아닙니다.");
            setAlreadyModalShow(true);
          }
        });
    } catch (error) {
      console.log("test err", error);
    }
  };

  return (
    <>
      <div className={style["login-wrap"]}>
        <Link to="/">
          <div
            style={{ width: "100%", marginBottom: wHeight / 20, marginTop: wHeight / 20 }}
            align="center"
          >
            <img src={loginLogo} alt="로고" className={style["img"]} />
          </div>
        </Link>
        <div className={style["login-html"]}>
          <input id="tab-1" type="radio" name="tab" className={style["sign-in"]} checked></input>
          <label for="tab-1" className={style["tab"]}>
            로그인
          </label>
          <input id="tab-2" type="radio" name="tab" className={style["sign-up"]}></input>
          <Link to="/Emailcheck">
            <label for="tab-1" className={style["tab"]}>
              회원가입
            </label>
          </Link>
          <div className={style["login-form"]}>
            <div className={style["group"]}>
              <label className={style["label"]}></label>
              <label for="user" className={style["label"]}>
                숙명 이메일
              </label>
              <div className={style["input"]}>
                <input
                  id="user"
                  type="email"
                  className={style["email2"]}
                  value={email}
                  onChange={handleEmailChange}
                ></input>
                <label for="user" className={style["email"]}>
                  @sookmyung.ac.kr
                </label>
              </div>
            </div>
            <div className={style["group"]}>
              <label for="pass" className={style["label"]}>
                비밀번호
              </label>
              <input
                id="pass"
                type="password"
                className={style["input"]}
                data-type="password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className={style["group"]}>
              <label className={style["label"]}></label>
              <label className={style["label"]}></label>
              <input
                type="submit"
                className={style["button"]}
                value="로그인"
                onClick={axioshandleLogin}
              ></input>
            </div>
            <div className={style["hr"]}></div>
            <div className={style["foot-lnk"]}>
              <Link to="/RePassword" style={{ color: "#4274FF", fontSize: "15px" }}>
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AlertModal
        show={alreadyModalShow}
        alertMessage={alert}
        finish="false"
        onHide={() => setAlreadyModalShow(false)}
      />
    </>
  );
};

export default LoginPage;
