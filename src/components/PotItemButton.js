import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import PotModal from "./PotModal";
import AlertModal from "./AlertModal";
import CheckModal from "./CheckModal";

const PotItemButton = (data) => {
  const gettedData = data.data;
  //console.log("gettedData: ", gettedData);
  const [ridingTime, setRidingTime] = useState("");
  const [headCount, setHeadCount] = useState(0);
  const [participating, setParticipating] = useState(false);
  // const [storagePotId, setStoragePotId] = useState(0);
  const [potId, setPotId] = useState(0);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  let wWidth = window.innerWidth;

  const [participateModalshow, setParticipateModalshow] = useState(false);
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);
  const [loginNeedModalShow, setLoginNeedModalShow] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem("@potId") != undefined) {
    //   setStoragePotId(localStorage.getItem("@potId"));
    // }
    setPotId(gettedData.id);
    setRidingTime(gettedData.ridingTime);
    setHeadCount(gettedData.headCount);
    setParticipating(gettedData.participating);
  }, []);

  const handleParticipating = () => {
    navigate("/Home/Chatting");
  };

  const toLoginPage = () => {
    setLoginNeedModalShow(false);
    navigate("/Login");
  };

  const participate = async () => {
    try {
      setModalShow(false);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/participation`,
        params: { potId: potId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          console.log("data: ", response.data.data); //참여가능 true,아니면 false
          if (response.data.data) {
            localStorage.setItem("@potId", potId);
            localStorage.setItem("@ridingTime", ridingTime);
            navigate("/Home/Chatting");
          } else {
            setAlreadyModalShow(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleParticipate = async () => {
    if (localStorage.getItem("@token") === undefined) {
      setLoginNeedModalShow(true);
    } else {
      if (headCount === 4) {
        alert(`이미 모집이 완료된 팟입니다.`);
      } else if (localStorage.getItem("@potId") !== 0) {
        setAlreadyModalShow(true);
      } else {
        setModalShow(true);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F0F1F3",
        borderRadius: "13px",
        border: "none",
        paddingRight: "2%",
        paddingLeft: "5%",
        paddingTop: "3%",
        paddingBottom: "4%",
        // height: "80px",
        marginTop: "12px",
        // marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold", marginInlineStart: "3px" }}>
            {ridingTime}
          </div>

          <div style={{ marginTop: "7px" }}>
            {Array(headCount).fill(
              <BsPersonFill style={{ marginRight: "2px" }} size="20" color="black" />
            )}
            {Array(4 - headCount).fill(
              <BsPersonFill style={{ marginRight: "2px" }} size="20" color="#D7D7D7" />
            )}
          </div>
        </div>
        <div className="centerC">
          {participating ? (
            <Button
              style={{ backgroundColor: "#AEB2B7", borderColor: "#AEB2B7" }}
              size="sm"
              onClick={handleParticipating}
            >
              참여중
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#4274FF", borderColor: "#4274FF" }}
              size="sm"
              onClick={handleParticipate}
            >
              참여하기
            </Button>
          )}
          <CheckModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            main={ridingTime + " 택시 팟에 참여하시겠습니까?"}
            sub="탑승 시간 3분 전까지만 팟에서 나갈 수 있습니다."
            check="참여하기"
            okAction={participate}
          />
          <CheckModal
            show={loginNeedModalShow}
            onHide={() => setLoginNeedModalShow(false)}
            main="로그인이 필요한 기능입니다."
            sub="로그인 페이지로 이동하시겠습니까?"
            check="확인"
            okAction={toLoginPage}
          />
          <AlertModal
            show={alreadyModalShow}
            finish="false"
            alertMessage="이미 참여하고 있는 팟이 있습니다."
            onHide={() => setAlreadyModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default PotItemButton;
