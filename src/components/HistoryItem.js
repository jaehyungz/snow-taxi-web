import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

const HistoryItem = (data) => {
    const navigate = useNavigate();
    const gettedData = data.data;

    const goToChatting = () => {
        navigate(`/Home/History/${gettedData.id}`);
    };

  return (
    <div className="historyItemBack" onClick={goToChatting}>
      <div className="historyDate">
        <p>{gettedData.ridingDate}</p>
        <p>{gettedData.ridingTime}</p>
      </div>
      <div className="historyHead">
        {Array(gettedData.headCount).fill(<BsPersonFill style={{marginRight:"2px"}} size="21" color="black" />)}
      </div>
    </div>
  );
};

export default HistoryItem;
