import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PotItemButton from "../components/PotItemButton";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MakepotModal from "../components/MakepotModal";
import sookmyung from "../assets/map_sookmyung.png";
import hyochang from "../assets/map_hyochang.png";
import seoul from "../assets/map_seoul.png";
import namyoung from "../assets/map_namyoung.png";
import axios from "axios";
import CheckModal from "../components/CheckModal";
import { BrowserView, MobileView } from "react-device-detect";
import { BsChevronLeft } from "react-icons/bs";

const TaxiPotListPage = () => {
  const navigate = useNavigate();
  const [makePotModalShow, setMakePotModalShow] = useState(false);
  const [length, setLength] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  const { state } = useLocation();
  const [loginNeedModalShow, setLoginNeedModalShow] = useState(false);
  let wHeight = window.innerHeight;
  let wWidth = window.innerWidth;

  const id = state.id;

  const toHomePage = () => {
    setLoginNeedModalShow(false);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("@token") === undefined) {
      noMemberAxios();
    } else {
      memberAxios();
    }
  }, [makePotModalShow]);

  // 생성하기,참여하기 버튼은 로그인됐을때만 가능
  const handleCreatePot = () => {
    if (localStorage.getItem("@token") === undefined) {
      setLoginNeedModalShow(true);
    } else {
      setMakePotModalShow(true);
    }
  };

  const toLoginPage = () => {
    setLoginNeedModalShow(false);
    navigate("/Login");
  };

  const noMemberAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot/default`,
        params: { departure: id },
      })
        .then((response) => {
          setDataArray(response.data.data);
          setLength(response.data.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const mapPic = () => {
    if (id === "숙대입구역") {
      return sookmyung;
    } else if (id === "효창공원역") {
      return hyochang;
    } else if (id === "서울역") {
      return seoul;
    } else {
      return namyoung;
    }
  };

  const memberAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot/valid`,
        params: { departure: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          setDataArray(response.data.data);
          setLength(response.data.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handledropDown = (eventKey) => {
    console.log(eventKey);
    window.location.reload();
  };

  const currentdate = new Date();
  const year = currentdate.getFullYear();
  const month = currentdate.getMonth() + 1;
  const date = currentdate.getDate();
  let day;
  let week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  for (let i = 0; i <= 6; i++) {
    if (currentdate.getDay() === i) {
      day = week[i];
    }
  }
  const today = `${year}.${month}.${date} ${day}`;

  return (
    <>
      <BrowserView>
        <div className="page" style={{ padding: "0 400px", paddingBottom: "200px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "20px",
                fontWeight: "700",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {id} → 후문
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={mapPic()} alt="지도" style={{ width: "100%", height: "200px" }} />
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginTop: "100px",
                marginBottom: "5px",
                textDecoration: "underline",
                textDecorationColor: "#80A1FF",
                textDecorationThickness: "3px",
              }}
            >
              {today}
            </div>
            <div
              style={{
                fontSize: "13px",
                marginBottom: "10px",
              }}
            >
              오늘 탈 택시 팟에만 참여할 수 있어요.
              <br />
              모든 정산 금액은 기본 요금인 4800원입니다.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <div>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic-button"
                  title="정렬"
                  onSelect={handledropDown}
                  size="sm"
                >
                  <Dropdown.Item eventKey="item1">마감순</Dropdown.Item>
                </DropdownButton>
              </div>
              <div>
                <Button variant="outline-primary" size="sm" onClick={handleCreatePot}>
                  + 팟 생성하기
                </Button>

                <MakepotModal
                  show={makePotModalShow}
                  onHide={() => setMakePotModalShow(false)}
                  id={id}
                />
              </div>
            </div>
            {length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "100px",
                }}
              >
                아직 모집 중인 팟이 없습니다.
                <br />
                팟을 만들어보세요!
              </div>
            ) : (
              dataArray.map((data) => {
                return (
                  ///unique key prop 해결안됨
                  <div key={data.id}>
                    <PotItemButton data={data} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div style={{ paddingBottom: "70px" }}>
          <div className="centerC" style={{ height: wHeight * 0.09 }}>
            <div className="pageTitle">
              <BsChevronLeft className="backBtn" onClick={toHomePage} />
              <p style={{ marginLeft: (wWidth - 120 - 20 * id.length) / 2 }}>{id} → 후문</p>
            </div>
          </div>

          <img src={mapPic()} alt="지도" style={{ width: "100%" }} />

          <div style={{ padding: wWidth / 28 }}>
            <div className="blueUnderLine">{today}</div>

            <div className="minTxt2" style={{ marginTop: "5px" }}>
              오늘 탈 택시 팟을 생성하거나
              <br />
              오늘 생성된 택시 팟에 참여해보세요.
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: wHeight / 33,
                marginBottom: wHeight / 40,
              }}
            >
              <div>
                <DropdownButton
                  variant="outline-secondary"
                  id="dropdown-basic-button"
                  title="정렬"
                  size="sm"
                  onSelect={handledropDown}
                >
                  <Dropdown.Item eventKey="item1">마감순</Dropdown.Item>
                </DropdownButton>
              </div>

              <div>
                <Button variant="outline-primary" size="sm" onClick={handleCreatePot}>
                  + 팟 생성하기
                </Button>

                <MakepotModal
                  show={makePotModalShow}
                  onHide={() => setMakePotModalShow(false)}
                  id={id}
                />
              </div>
            </div>

            {length === 0 ? (
              <div
                className="centerR"
                style={{
                  fontSize: "13px",
                  marginTop: wHeight / 8,
                  textAlign: "center",
                }}
              >
                아직 모집 중인 팟이 없습니다.
                <br />
                팟을 만들어보세요!
              </div>
            ) : (
              dataArray.map((data) => {
                return (
                  ///unique key prop 해결안됨
                  <div key={data.id}>
                    <PotItemButton data={data} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </MobileView>
      <CheckModal
        show={loginNeedModalShow}
        onHide={toHomePage}
        main="로그인이 필요한 기능입니다."
        sub="로그인 페이지로 이동하시겠습니까?"
        check="확인"
        okAction={toLoginPage}
      />
    </>
  );
};

export default TaxiPotListPage;
