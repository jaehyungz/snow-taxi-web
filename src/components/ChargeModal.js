import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

const ChargeModal = (props) => {

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                >
                    <input
                        className="inputPrice"
                        type="number"
                        value={props.price}
                        placeholder="충전 금액을 입력해주세요."
                        onChange={props.onChangePrice}
                    />
                    
                    <div className="chargeModalBtn">
                        <Button
                            variant="secondary"
                            style={{ backgroundColor: "#FF8642", borderColor: "#FF8642", marginRight: '10px'}}
                            size="md"
                            onClick={props.onHide}
                        >
                            취소
                        </Button>
                        <Button
                            style={{ backgroundColor: "#5E79EB", borderColor: "#5E79EB" }}
                            size="md"
                            onClick={props.okAction}
                        >
                            충전하기
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ChargeModal;
