import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sookmyung from "../assets/sookmyung.png";
import hyochang from "../assets/hyochang.png";
import seoul from "../assets/seoul.png";
import namyoung from "../assets/namyoung.png";
import HomeLogo from "../assets/HomeLogo.png";
import { BrowserView, MobileView } from "react-device-detect";

const TaxiRouteListPage = () => {
  const navigate = useNavigate();
  let wHeight = window.innerHeight;

  const handleRouteClick = (e, message) => {
    navigate("/Home/TaxiPotList", { state: { id: message } });
  };

  return (
    <>
      <BrowserView>
        <div className="page">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={HomeLogo} style={{ width: "180px", marginTop: "50px" }} />
            {/* <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          출발지
        </div> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "30px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  textDecoration: "underline",
                  textDecorationColor: "#80A1FF",
                  textDecorationThickness: "3px",
                }}
              >
                출발지를 선택해주세요.
              </div>
              <div style={{ fontSize: "15px" }}>도착지는 숙대입구 후문입니다.</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "30px",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div style={{ marginTop: "40px" }}>
              <img
                src={sookmyung}
                alt="숙명"
                onClick={(e) => handleRouteClick(e, "숙대입구역")}
                style={{ width: "200px" }}
              />
            </div>
            <div style={{ marginTop: "40px" }}>
              <img
                src={hyochang}
                alt="효창"
                onClick={(e) => handleRouteClick(e, "효창공원역")}
                style={{ width: "200px" }}
              />
            </div>
            <div style={{ marginTop: "40px" }}>
              <img
                src={seoul}
                alt="서울"
                onClick={(e) => handleRouteClick(e, "서울역")}
                style={{ width: "200px" }}
              />
            </div>
            <div style={{ marginTop: "40px" }}>
              <img
                src={namyoung}
                alt="남영"
                onClick={(e) => handleRouteClick(e, "남영역")}
                style={{ width: "200px" }}
              />
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <>
          <div className="page">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={HomeLogo} style={{ width: "155px", marginTop: wHeight / 10 }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: wHeight / 25,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: wHeight / 47,
                    fontWeight: "700",
                    textDecoration: "underline",
                    textDecorationColor: "#9EB9FF",
                    textDecorationThickness: wHeight / 190,
                  }}
                >
                  출발지를 선택해주세요.
                </div>
                <div style={{ fontSize: wHeight / 60, marginTop: "4px" }}>
                  도착지는 숙명여대 후문입니다.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // marginTop: "30px",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div style={{ marginTop: wHeight / 13 }}>
                <img
                  src={sookmyung}
                  alt="숙명"
                  onClick={(e) => handleRouteClick(e, "숙대입구역")}
                  style={{ width: "200px" }}
                />
              </div>
              <div style={{ marginTop: "40px" }}>
                <img
                  src={hyochang}
                  alt="효창"
                  onClick={(e) => handleRouteClick(e, "효창공원역")}
                  style={{ width: "200px" }}
                />
              </div>
              <div style={{ marginTop: "40px" }}>
                <img
                  src={seoul}
                  alt="서울"
                  onClick={(e) => handleRouteClick(e, "서울역")}
                  style={{ width: "200px" }}
                />
              </div>
              <div style={{ marginTop: "40px" }}>
                <img
                  src={namyoung}
                  alt="남영"
                  onClick={(e) => handleRouteClick(e, "남영역")}
                  style={{ width: "200px" }}
                />
              </div>
            </div>
          </div>
        </>
      </MobileView>
    </>
  );
};

export default TaxiRouteListPage;
