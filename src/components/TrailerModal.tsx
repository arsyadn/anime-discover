import { X } from "lucide-react";
import { useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  position: relative;
  width: min(90vw, 900px);
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.9);
  animation: scaleIn 0.25s ease;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: grid;
  place-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.85);
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

interface TrailerModalProps {
  youtubeId: string;
  onClose: () => void;
}

const TrailerModal = ({ youtubeId, onClose }: TrailerModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={18} />
        </CloseButton>

        <Iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title="Anime Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </Modal>
    </Overlay>
  );
};

export default TrailerModal;
