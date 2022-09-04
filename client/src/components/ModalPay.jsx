import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalCart({ showTrans, close }) {
  return (
    <Modal className="transbg" show={showTrans} onHide={close}>
      <div className="transtext">
        <p>Thank you for order please wait to verify your order</p>
      </div>
    </Modal>
  );
}
