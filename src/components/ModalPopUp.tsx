import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackButton } from "../pages/AnimeDetail";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalBox = styled.div`
  background: #111;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ModalActions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

interface ModalPopUpProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalPopUp: React.FC<ModalPopUpProps> = ({ setShow }) => {
  const navigate = useNavigate();
  return (
    <ModalOverlay onClick={() => setShow(false)}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-white">Login Required</h2>

        <p className="mt-2 text-gray-400">
          You need to login first to add anime to your wishlist.
        </p>

        <ModalActions>
          <BackButton
            className="px-4 py-2 rounded bg-gray-700 text-white"
            onClick={() => setShow(false)}
          >
            Cancel
          </BackButton>

          <BackButton
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </BackButton>
        </ModalActions>
      </ModalBox>
    </ModalOverlay>
  );
};

export default ModalPopUp;
