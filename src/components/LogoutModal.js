import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LogoutModal = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/auth/logout`,
      }).then((response) => {
        if (response.data.code === 200) {
          localStorage.clear();
          navigate("/");
        }
      });
    } catch (error) {
      console.log("fail get", error);
    }
  };
  return (
    <Modal {...props} size="sm" centered style={{ padding: "10px" }}>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <br />
          <h4>로그아웃</h4>
          <p>로그아웃 하시면 메인 화면으로 이동합니다.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="md" onClick={props.onHide}>
          취소
        </Button>
        <Button
          style={{ backgroundColor: "#FF8642", borderColor: "#FF8642" }}
          size="md"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
