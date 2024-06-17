import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserView } from "react-device-detect";

const MyChattingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("@token") === undefined) {
      alert(`로그인이 필요한 기능입니다!`);
      navigate("/Login");
    } else {
    }
  }, []);

  return (
    <>
      <BrowserView>
        <div className="page">
          <div
            style={{
              marginTop: "40px",
              fontSize: "30px",
              fontWeight: "600",
              marginBottom: "40px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            채팅페이지
          </div>
        </div>
      </BrowserView>
    </>
  );
};

export default MyChattingPage;
