import React, { useState, useEffect } from "react";
// import ReactRoundedImage from "react-rounded-image";
import * as StompJs from "@stomp/stompjs";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BsSend } from "react-icons/bs";
import ChattingBubble from "../components/ChattingBubbles";
import CheckModal from "../components/CheckModal";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AlertModal from "../components/AlertModal";

const ChattingPage = () => {
  const navigate = useNavigate();
  var moment = require("moment");
  let now = moment().format("yyyy-MM-DD") + " ";
  let me = localStorage.getItem("@nickname");
  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  let participaitngPotId = localStorage.getItem("@potId");
  const [loginNeedModalShow, setLoginNeedModalShow] = useState(false);
  const [outModalShow, setOutModalShow] = useState(false);
  const [finishModalShow, setFinishModalShow] = useState(false);
  const [ridingTime, setRidingTime] = useState("");

  const makeTime = (ridingTime) => {
    var time2 = ridingTime;
    for (var i = 1; i < 10; i++) {
      time2 = time2.replace(" ", "");
    }
    let time = time2.substr(0, 2);
    var hour = time2.substr(2, 2);
    if (time === "오전" || time === "AM") {
      if (hour === "12") {
        hour = "00";
      }
    } else {
      hour = (parseInt(hour) + 12).toString();
    }
    const string = hour + time2.substr(4, 3);
    return string;
  };

  useEffect(() => {
    if (localStorage.getItem("@token") === undefined) {
      setLoginNeedModalShow(true);
      // alert(`로그인이 필요한 기능입니다!`);
      // navigate("/Login");
    } else if (localStorage.getItem("@potId") !== 0) {
      getChatsAxios();
      connect();
    }
    return () => disConnect();
  }, []);

  const toLoginPage = () => {
    setLoginNeedModalShow(false);
    navigate("/Login");
  };

  const toHome = () => {
    setLoginNeedModalShow(false);
    navigate("/");
  };

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록

  const getChatsAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/chatroom`,
        params: { roomId: participaitngPotId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          setChatList(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: `${process.env.REACT_APP_STOMP_URL}/wschat`,
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe("/sub/chatroom/" + participaitngPotId, callback);
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };

  const callback = function (message) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      setChatList((chats) => [...chats, msg]);
    }
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendChat = () => {
    if (chat === "") {
      return;
    }
    client.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        sender: me,
        roomId: participaitngPotId,
        content: chat,
        type: "TALK",
      }),
    });

    setChat("");
  };

  function isBefore() {
    console.log(now);
    console.log(localStorage.getItem("@ridingTime"));
    let str = now + makeTime(localStorage.getItem("@ridingTime")) + ":00";
    console.log("이게 택시 타는 시간임");
    console.log(str);

    let rt = new Date(str);
    let nows = Date.now();
    console.log("타는 시간", rt);
    console.log("오늘 시간", nows);

    if (rt < nows) {
      return false;
    } else {
      return true;
    }
  }

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const finishAxios = async () => {
    try {
      setFinishModalShow(true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot/finish`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          console.log(response.data.message);
          localStorage.setItem("@potId", 0);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const outAxios = async () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/participation`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("@potId", 0);
        setOutModalShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const finishPot = () => {
    setFinishModalShow(false);
    let cash = localStorage.getItem("@cash") - 1200;
    localStorage.setItem("@cash", cash);
  };

  return (
    <div>
      <AlertModal
        show={finishModalShow}
        finish="true"
        alertMessage={"[" + localStorage.getItem("@ridingTime") + "]  택시 팟 탑승을 완료했습니다!"}
        onHide={finishPot}
      />
      <CheckModal
        show={outModalShow}
        onHide={() => setOutModalShow(false)}
        main={"정말  [" + localStorage.getItem("@ridingTime") + "]  팟을 나가시겠습니까?"}
        check="나가기"
        okAction={outAxios}
      />
      <CheckModal
        show={loginNeedModalShow}
        onHide={toHome}
        main="로그인이 필요한 기능입니다."
        sub="로그인 페이지로 이동하시겠습니까?"
        check="확인"
        okAction={toLoginPage}
      />
      {participaitngPotId === 0 || participaitngPotId === undefined ? (
        <div>
          <div className="pageChatTitle" style={{ height: wHeight * 0.13 }}>
            <p>채팅 방</p>
          </div>
          <div className="centerNoMsg">
            <div>
              <img src={logo} style={{ width: "130px", marginBottom: "30px" }} alt="이미지" />
              <div>
                참여 중인 택시 팟이 없습니다.
                <br />
                팟에 참여해 보세요!
              </div>
              <div style={{ height: 70 }}></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="fixTop" style={{ height: wHeight * 0.1 }}>
            <div className="chatTitle">
              {/* <div></div>       */}
              <div className="pageTitle">{localStorage.getItem("@ridingTime") + " 🚕 택시 팟"}</div>

              {/* {isBefore(ridingTime) ? (
                <Button
                  style={{ backgroundColor: "#FF8A48", border: "none", fontSize: "14px" }}
                  size="md"
                  onClick={() => setOutModalShow(true)}
                >
                  팟 나가기
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: "#FF8A48", border: "none", fontSize: "14px" }}
                  size="md"
                  onClick={finishAxios}
                >
                  탑승 완료
                </Button>
              )} */}
            </div>
          </div>

          <ChattingBubble chatList={chatList} />

          <div className="bottomChat">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                className="inputChat"
                style={{ width: wWidth - 70 }}
                type="text"
                value={chat}
                placeholder="채팅을 입력해주세요"
                onChange={onChangeChat}
              />

              <div className="sendBtnn" onClick={sendChat}>
                <BsSend size="20" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChattingPage;
