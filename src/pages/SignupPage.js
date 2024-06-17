import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { validPassword } from "../components/RegEx";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import loginLogo from "../assets/LoginLogo.png";
// import ReactRoundedImage from "react-rounded-image";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import style from "../modules/login.module.css";
import AlertModal from "../components/AlertModal";

const SignupPage = () => {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);
  const images = [profile1, profile2, profile3, profile4];
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);
  const [alert, setAlert] = useState("");
  let wHeight = window.innerHeight;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    setAvatar(selectedImage);
  }, []);

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setIsPasswordValid(validPassword.test(inputPassword));
  };

  const handleCheckPasswordChange = (e) => {
    const inputCheckPassword = e.target.value;
    setCheckPassword(inputCheckPassword);
  };

  useEffect(() => {
    setIsPasswordMatch(password === checkPassword);
  }, [password, checkPassword]);

  const handleNicknameCheck = (e) => {
    //중복체크 메서드
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth/nicknameCheck`,
        params: { nickname: nickname },
      })
        .then((response) => {
          console.log(response.data.data);
          console.log(response.data.code);
          setAlert(response.data.message);
          setAlreadyModalShow(true);
          if (response.data.code === 200) {
            setIsNicknameCheck(true);
          }
        })
        .catch(function (error) {
          if (error.response) {
            setAlert(error.response);
            setAlreadyModalShow(true);
          }
        });
    } catch (error) {
      console.log("fail get", error);
    }
  };

  const axioshandleSignup = async () => {
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth/signUp`,
        data: {
          nickname: nickname,
          email: email,
          password: password,
        },
      })
        .then(function (response) {
          setAlert(response.data.message);
          setAlreadyModalShow(true);
          if (response.data.code === 200) {
            navigate("/Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("signup err", error);
    }
  };

  return (
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
        <input id="tab-1" type="radio" name="tab" className={style["sign-in"]}></input>
        <Link to="/Login">
          <label for="tab-1" className={style["tab"]}>
            로그인
          </label>
        </Link>
        <input id="tab-2" type="radio" name="tab" className={style["sign-up"]} checked></input>
        <label for="tab-1" className={style["tab"]}>
          회원가입
        </label>
        <div className={style["login-form"]}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            {/* <ReactRoundedImage
              image={avatar}
              roundedColor="#4274FF"
              imageWidth="120"
              imageHeight="120"
              roundedSize="5"
              borderRadius="100"
            /> */}
          </div>
          <div className={style["group"]}>
            <label for="pass" className={style["label"]}>
              닉네임
            </label>
            <input
              id="pass"
              type="email"
              className={style["input"]}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></input>
            {isNicknameCheck && (
              <label
                align="right"
                for="pass"
                style={{ color: "#4274FF" }}
                className={style["label"]}
              >
                사용가능한 닉네임입니다.
              </label>
            )}
            <div align="right" className={style["button3"]}>
              {!isNicknameCheck ? (
                <Button className={style["button2"]} onClick={handleNicknameCheck}>
                  중복 체크
                </Button>
              ) : (
                <Button className={style["button22"]} onClick={handleNicknameCheck}>
                  중복 체크
                </Button>
              )}
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
              placeholder="알파벳과 숫자를 포함한 8글자 이상"
              onChange={handlePasswordChange}
            ></input>
            {!isPasswordValid && (
              <label
                align="right"
                style={{ color: "#ff8642" }}
                for="pass"
                className={style["label"]}
              >
                유효한 비밀번호를 입력하세요.
              </label>
            )}
          </div>
          <div className={style["group"]}>
            <label for="pass" className={style["label"]}>
              비밀번호 확인
            </label>
            <input
              id="pass"
              type="password"
              className={style["input"]}
              data-type="password"
              value={checkPassword}
              onChange={handleCheckPasswordChange}
            ></input>
            {!isPasswordMatch && (
              <label
                align="right"
                for="pass"
                style={{ color: "#FF8642" }}
                className={style["label"]}
              >
                다시 확인해 주세요.
              </label>
            )}
          </div>

          <div className={style["group"]}>
            <label className={style["label"]}></label>
            {isNicknameCheck && isPasswordValid && isPasswordMatch && password ? (
              <input
                type="submit"
                className={style["button"]}
                value="회원가입"
                onClick={axioshandleSignup}
              />
            ) : (
              <input type="submit" className={style["buttongray"]} value="회원가입"></input>
            )}
          </div>
          <div className={style["hr"]}></div>
          <div className={style["foot-lnk"]}>
            <Link to="/Login" style={{ color: "#4274FF", fontSize: "15px" }}>
              이미 회원이신가요?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
