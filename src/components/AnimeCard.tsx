import { Anime } from "../types/anime";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Play, Star } from "lucide-react";

const Card = styled.article`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transform-origin: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);

  &:hover {
    transform: scale(1.08);
    z-index: 10;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Poster = styled.img`
  width: 100%;
  height: 340px;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${Card}:hover & {
    transform: scale(1.12);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.55) 40%,
    rgba(0, 0, 0, 0.15)
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;

  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Title = styled.h4`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.3;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 13px;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(229, 9, 20, 0.6);

  ${Card}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  svg {
    margin-left: 2px;
  }
`;

const PlayButtonWrapper = () => (
  <PlayButton>
    <Play size={18} color="white" fill="white" />
  </PlayButton>
);

const AnimeCard = ({ anime }: { anime: Anime }) => {
  const navigate = useNavigate();

  const title =
    anime.attributes.titles.en || anime.attributes.canonicalTitle || "Untitled";

  return (
    <Card onClick={() => navigate(`/anime/${anime.id}`)}>
      <ImageWrapper>
        <Poster
          src={anime.attributes.posterImage.large}
          alt={title}
          loading="lazy"
        />
        <Overlay />
        <PlayButtonWrapper />
        <Content>
          <Title>{title}</Title>
          <SubTitle>{anime.attributes.titles.ja_jp}</SubTitle>

          <Meta>
            {anime.attributes.averageRating && (
              <Badge>
                {" "}
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                {anime.attributes.averageRating}
              </Badge>
            )}
            {anime.attributes.startDate && (
              <Badge>{anime.attributes.startDate.slice(0, 4)}</Badge>
            )}
          </Meta>
        </Content>
      </ImageWrapper>
    </Card>
  );
};

export default AnimeCard;
