import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import AlertModal from "./AlertModal";

const MakepotModal = (props) => {
  const id = props.id;
  const navigate = useNavigate();
  // const [isShow, setIsShow] = useState(props.show);
  const [timeValue, setTimeValue] = useState("");
  // const [storagePotId, setStoragePotId] = useState(0);
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);

  useEffect(() => {}, [timeValue]);

  const handleTimeChange = (newTimeValue) => {
    setTimeValue(newTimeValue);
  };

  const makeTime = (ridingTime) => {
    const timeArr = ridingTime.split(":");
    var ampm = "오전";
    var hour = timeArr[0];
    var min = timeArr[1];
    //console.log(hour, min);

    if (timeArr[0] >= 12) {
      ampm = "오후";
      if (timeArr[0] > 12) {
        hour = timeArr[0] - 12;
      }
    }
    const string = ampm + "   " + hour + ":" + min;
    //console.log(string);
    return string;
  };

  const handleParticipating = async () => {
    try {
      const time = timeValue.$d; // 데이터에서 시간 정보를 가져옵니다
      const hours = time.getHours(); // 시간을 얻어옵니다
      const minutes = time.getMinutes(); // 분을 얻어옵니다
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      console.log("Formatted time:", formattedTime);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/pot/new`,
        data: {
          departure: id,
          ridingTime: formattedTime,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          if (response.data.data !== 0) {
            localStorage.setItem("@potId", response.data.data);
            localStorage.setItem("@ridingTime", makeTime(formattedTime));
            navigate("/Home/Chatting");
          } else {
            props.onHide();

            setAlreadyModalShow(true);
          }
        })
        .catch(function (error) {
          console.log("err1", error);
        });
    } catch (error) {
      console.log("err2", error);
    }
  };

  return (
    <div>
      <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>새로운 팟을 만들어주세요!</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          {/* <DemoContainer components={["TimePicker"]}>
              <TimePicker
                //label="Controlled picker"
                value={timeValue}
                onChange={handleTimeChange}
              />
            </DemoContainer> */}
          {/* </LocalizationProvider> */}
          <p style={{ marginTop: "10px" }}>
            방에 참여하신 후, 노쇼를 하게 되시면 벌금이 부과될 수 있습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="md" onClick={props.onHide}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#4274FF", borderColor: "#4274FF" }}
            size="md"
            onClick={handleParticipating}
          >
            팟 만들기
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertModal
        show={alreadyModalShow}
        finish="false"
        alertMessage="이미 참여하고 있는 팟이 있습니다."
        onHide={() => setAlreadyModalShow(false)}
      />
    </div>
  );
};

export default MakepotModal;
