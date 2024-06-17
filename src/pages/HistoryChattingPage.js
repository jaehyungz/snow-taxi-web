import React, { useState, useEffect, userPa } from "react";
import axios from "axios";
import ChattingBubble from "../components/ChattingBubbles";
import { useParams, useNavigate } from "react-router-dom";
import {BsChevronLeft} from "react-icons/bs";

const HistoryChattingPage = () => {

  let { potId } = useParams();
  const [pot, setPot] = useState({});
  const [chatList, setChatList] = useState([]); // 채팅 기록
  let wHeight = window.innerHeight;
  const navigate = useNavigate();
  

  useEffect(() => {
    getChatsAxios();
  }, []);

  const toHistoryPage = () => {
    navigate("/Home/History");
  };


  const getChatsAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/history`,
        params: { roomId: potId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          setChatList(response.data.data.chats);
          setPot(response.data.data.pot);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <div className="fixTop" style={{height:wHeight * (0.1)}}>
            <div className="chatTitle">
                <BsChevronLeft className="backBtn" onClick={toHistoryPage}/>
                <div className="chatTitleFont">
                  {pot.ridingDate} 🚕 {pot.ridingTime}
                </div>
            </div>
        </div>

        <ChattingBubble chatList={chatList} />

    </div>
  );
};

export default HistoryChattingPage;
