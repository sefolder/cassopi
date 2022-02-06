import { useEffect, useState } from "react";
import styled from "styled-components";

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
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </ModalHeader>
        {title && <div>{title}</div>}
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </ModalOverlay>
  ) : null;

  return <>{modalContent}</>;
};

const ModalBody = styled.div`
  padding-top: 10px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const ModalContainer = styled.div`
  background: white;
  width: 500px;
  height: 300px;
  border-radius: 15px;
  padding: 15px;
`;
const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
