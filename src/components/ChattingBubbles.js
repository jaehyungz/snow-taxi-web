import React from "react";

const ChattingBubble = (props) => {
  const gettedData = props.chatList;
  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  let me = localStorage.getItem("@nickname");

  const msgBox = gettedData.map((item, idx) => {
    if (item.type !== "TALK") {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="inOutMsg">{item.content}</div>
        </div>
      );
    } else {
      if (item.sender === me) {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <div style={{ fontSize: "10px", marginRight: wWidth / 100 }}>{item.sentTime}</div>

            <div
              style={{
                width: "max-content",
                maxWidth: wWidth / 1.6,
                wordBreak: "break-all",
                backgroundColor: "#5E79EB",
                color: "white",
                fontSize: "13px",
                borderTopLeftRadius: "14px",
                borderBottomRightRadius: "14px",
                borderBottomLeftRadius: "14px",
                marginRight: wWidth / 30,
                padding: "10px",
              }}
            >
              {item.content}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginLeft: wWidth / 100,
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              {item.sender}
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-start" }}>
              <div
                style={{
                  width: "max-content",
                  maxWidth: wWidth / 1.6,
                  wordBreak: "break-all",
                  backgroundColor: "#EDF1FF",
                  fontSize: "13px",
                  borderTopRightRadius: "14px",
                  borderBottomRightRadius: "14px",
                  borderBottomLeftRadius: "14px",
                  marginLeft: wWidth / 30,
                  padding: "10px",
                }}
              >
                {item.content}
              </div>

              <div style={{ fontSize: "10px", marginLeft: wWidth / 100 }}>{item.sentTime}</div>
            </div>
          </div>
        );
      }
    }
  });

  return (
    <div
      style={{
        width: wWidth,
        minHeight: wHeight * 0.9 - 70,
        paddingBottom: "80px",
        paddingTop: "10px",
      }}
    >
      {msgBox}
    </div>
  );
};

export default ChattingBubble;
