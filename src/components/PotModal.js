import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";

const PotModal = (props) => {
  const navigate = useNavigate();

  const handleParticipating = () => {
    navigate("/Home/Chatting");
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>자, 함께 출발해볼까요?</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>✔️ 주의사항</h5>
        <p style={{ marginTop: "10px" }}>
          방에 참여하신 후, 노쇼를 하게 되시면 벌금이 부과될 수 있습니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="md" onClick={handleParticipating}>
          지금 참여하기
        </Button>
        <Button variant="secondary" size="md" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PotModal;
