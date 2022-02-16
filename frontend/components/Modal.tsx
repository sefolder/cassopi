import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalBody = styled.div`
  padding-top: 10px;
  overflow-y: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 15px;
  overflow-y: hidden;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Modal = ({
  show,
  onClose,
  children,
  title,
}: {
  show: boolean;
  onClose: () => void;
  children?: JSX.Element | JSX.Element[];
  title: string;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          {title && <div>{title}</div>}
          <a href="#" onClick={handleCloseClick}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </ModalOverlay>
  ) : null;

  return <>{modalContent}</>;
};

export default Modal;
