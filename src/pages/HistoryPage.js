import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HistoryItem from "../components/HistoryItem";
import logo from "../assets/logo.png";
import { BsChevronLeft } from "react-icons/bs";

const HistoryPage = () => {
  const [historyList, setHistoryList] = useState([]);
  let wHeight = window.innerHeight;
  let wWidth = window.innerWidth;

  useEffect(() => {
    getHistoryAxios();
  }, []);

  const toMyPage = () => {
    navigate("/Home/MyPage");
  };

  const getHistoryAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot/my`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          console.log(response.data.data);
          setHistoryList(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="centerC" style={{ height: wHeight * 0.12 }}>
        <div className="pageTitle">
          <BsChevronLeft className="backBtn" onClick={toMyPage} />
          <p style={{ marginLeft: (wWidth - 140) / 2 }}>참여 내역</p>
        </div>
      </div>
      <div>
        {historyList.length === 0 ? (
          <div className="centerNoMsg">
            <div>
              <img src={logo} style={{ width: "130px", marginBottom: "30px" }} alt="이미지" />
              <div>
                아직 참여한 팟이 없습니다.
                <br />
                팟에 참여해 보세요!
              </div>
              <div style={{ height: 70 }}></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="minTxt">클릭하시면 이전 채팅 내역을 확인하실 수 있습니다.</div>
            {historyList.map((data) => {
              return <HistoryItem data={data} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
