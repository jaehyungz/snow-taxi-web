import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const CheckModal = (props) => {
  const navigate = useNavigate();

  return (
    <Modal {...props} size="sm" centered style={{ padding: "0px" }}>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <br />
          <div style={{ fontSize: "19px", fontWeight: "bold", marginBottom: "10px" }}>
            {props.main}
          </div>
          <div style={{ fontSize: "14px", fontWeight: "light", marginBottom: "20px" }}>
            {props.sub}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          // style={{ backgroundColor: "#757575", borderColor: "#757575" }}
          size="md"
          onClick={props.onHide}
        >
          취소
        </Button>
        <Button
          style={{ backgroundColor: "#FF8642", borderColor: "#FF8642" }}
          size="md"
          onClick={props.okAction}
        >
          {props.check}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckModal;
