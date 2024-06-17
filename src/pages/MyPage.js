import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutModal from "../components/LogoutModal";
import { FiChevronRight } from "react-icons/fi";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
// import ReactRoundedImage from "react-rounded-image";
import { useNavigate } from "react-router-dom";
import CheckModal from "../components/CheckModal";
import { BrowserView, MobileView } from "react-device-detect";
import ChargeModal from "../components/ChargeModal";

const MyPage = () => {
  let wHeight = window.innerHeight;
  let wWidth = window.innerWidth;
  const navigate = useNavigate();
  const [loginNeedModalShow, setLoginNeedModalShow] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [chargeModalShow, setChargeModalShow] = useState(false);
  const [price, setPrice] = useState("");
  const [cash, setCash] = useState("0");
  const images = [profile1, profile2, profile3, profile4];

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const chargeBtn = () => {
    setPrice("");
    localStorage.setItem("@cash", parseInt(cash) + parseInt(price));
    setCash(parseInt(cash) + parseInt(price));
    setChargeModalShow(false);
  };

  const hideCharge = () => {
    setChargeModalShow(false);
  };

  const toLoginPage = () => {
    setLoginNeedModalShow(false);
    navigate("/Login");
  };

  const toHome = () => {
    setLoginNeedModalShow(false);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("@token") === undefined) {
      setLoginNeedModalShow(true);
      //alert(`로그인이 필요한 기능입니다!`);
      //navigate("/Login");
    } else {
      setNickname(localStorage.getItem("@nickname"));
      setCash(localStorage.getItem("@cash"));
      console.log("nickname", nickname);
      const randomIndex = Math.floor(Math.random() * images.length);
      const selectedImage = images[randomIndex];
      setAvatar(selectedImage);
    }
  }, []);

  const gotoHistory = () => {
    navigate("/Home/History");
  };

  return (
    <>
      <BrowserView>
        <div className="page" style={{ padding: "0 400px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginTop: "50px",
                fontSize: "23px",
                fontWeight: "600",
                marginBottom: "40px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              마이페이지
            </div>
            <div style={{ fontSize: "15px", fontWeight: "700" }}>나의정보</div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              {/* <ReactRoundedImage
                image={avatar}
                imageWidth="70"
                imageHeight="70"
                roundedSize="5"
                borderRadius="100"
              /> */}
              <div
                style={{
                  marginLeft: "20px",
                  fontSize: "15px",
                }}
              >
                {nickname} 님, 안녕하세요! 🚖
              </div>
            </div>

            <hr height="30px" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "5px",
                marginBottom: "5px",
              }}
              onClick={gotoHistory}
            >
              <div style={{ fontSize: "15px", fontWeight: "700" }}>참여내역</div>
              <FiChevronRight size="23" color="black" />
            </div>
            <hr height="30px" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: "700" }}>로그아웃</div>
              <FiChevronRight size="23" color="black" onClick={() => setModalShow(true)} />
            </div>
            <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />
            <hr height="30px" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: "700" }}>회원탈퇴</div>
              <FiChevronRight size="23" color="black" />
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <>
          <div className="page" style={{ padding: "0 30px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  marginTop: "40px",
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "40px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                마이페이지
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700" }}>나의 정보</div>
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
                {/* <ReactRoundedImage
                  image={avatar}
                  imageWidth="70"
                  imageHeight="70"
                  roundedSize="5"
                  borderRadius="100"
                /> */}
                <div
                  style={{
                    fontSize: "15px",
                    marginLeft: wWidth - 290,
                  }}
                >
                  {nickname} 님, 안녕하세요! 🍀
                </div>
              </div>
              <hr height="30px" />

              <div className="cashLine">
                <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px" }}>
                  스노우 캐시
                </div>

                <div className="cash" style={{ height: wHeight / 12 }}>
                  <div>{cash}원</div>
                  <div className="chargeBtn" onClick={() => setChargeModalShow(true)}>
                    충전하기
                  </div>
                </div>
              </div>

              <hr height="30px" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                onClick={gotoHistory}
              >
                <div style={{ fontSize: "16px", fontWeight: "700" }}>참여 내역</div>
                <FiChevronRight size="20" color="black" />
              </div>
              <hr height="30px" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "700" }}>로그아웃</div>
                <FiChevronRight size="20" color="black" onClick={() => setModalShow(true)} />
              </div>
              <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />
              <hr height="30px" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "700" }}>회원탈퇴</div>
                <FiChevronRight size="20" color="black" />
              </div>
            </div>
          </div>
        </>
      </MobileView>
      <CheckModal
        show={loginNeedModalShow}
        onHide={toHome}
        main="로그인이 필요한 기능입니다."
        sub="로그인 페이지로 이동하시겠습니까?"
        check="확인"
        okAction={toLoginPage}
      />
      <ChargeModal
        show={chargeModalShow}
        price={price}
        onHide={hideCharge}
        onChangePrice={onChangePrice}
        okAction={chargeBtn}
      />
    </>
  );
};

export default MyPage;
