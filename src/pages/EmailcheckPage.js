import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import style from "../modules/login.module.css";
import AlertModal from "../components/AlertModal";
import loginLogo from "../assets/LoginLogo.png";

const EmailcheckPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isNextBtn, setIsNextBtn] = useState(false);
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);
  const [alert, setAlert] = useState("");
  const [mailsend, setmailsend] = useState(false);
  let wHeight = window.innerHeight;

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handleToNext = () => {
    const fullEmail = email + "@sookmyung.ac.kr";
    navigate("/Signup", { state: { email: fullEmail } });
  };

  const axiosCertificateEmail = async () => {
    setmailsend(true);
    const fullEmail = email + "@sookmyung.ac.kr";
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/email/auth`,
        params: { mail: fullEmail },
      }).then((response) => {
        console.log(response.data.data);
        console.log(response.data.code);
        setAlert(response.data.message);
        setAlreadyModalShow(true);

        if (response.data.code === 200) {
          setCertificateNumber(response.data.data);
        }
      });
    } catch (error) {
      console.log("fail get", error);
    }
  };

  const handleCertificateNumber = () => {
    if (inputNumber && certificateNumber === inputNumber) {
      setIsNextBtn(true);
      setAlert("인증 성공");
      setAlreadyModalShow(true);
    } else {
      setIsNextBtn(false);
      setAlert("인증 실패");
      setAlreadyModalShow(true);
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
            <div className={style["group"]}>
              <label className={style["label"]}></label>
              <label for="user" className={style["label"]}>
                숙명 이메일로 인증
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
              <div align="right" className={style["button3"]} style={{ marginTop: "5px" }}>
                {!mailsend ? (
                  <Button className={style["button2"]} onClick={axiosCertificateEmail}>
                    인증번호 발송
                  </Button>
                ) : (
                  <Button className={style["button22"]} onClick={axiosCertificateEmail}>
                    인증번호 재발송
                  </Button>
                )}
              </div>
            </div>

            <div className={style["group"]}>
              <input
                id="pass"
                type="password"
                className={style["input"]}
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                placeholder="인증번호를 입력하세요"
              ></input>
              <div align="right" className={style["button3"]} style={{ marginTop: "5px" }}>
                {!isNextBtn ? (
                  <Button className={style["button2"]} onClick={handleCertificateNumber}>
                    인증번호 확인
                  </Button>
                ) : (
                  <Button className={style["button22"]}>인증번호 확인</Button>
                )}
              </div>
            </div>
            <div className={style["group"]}>
              <label className={style["label"]}></label>
              {!isNextBtn ? (
                <input
                  type="submit"
                  className={style["buttongray"]}
                  value="다음"
                  onClick={() => {
                    setAlert("인증번호를 확인해주세요.");
                    setAlreadyModalShow(true);
                  }}
                ></input>
              ) : (
                <input
                  type="submit"
                  className={style["button"]}
                  value="다음"
                  onClick={handleToNext}
                ></input>
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
      <AlertModal
        show={alreadyModalShow}
        alertMessage={alert}
        finish="false"
        onHide={() => setAlreadyModalShow(false)}
      />
    </>
  );
};

export default EmailcheckPage;
