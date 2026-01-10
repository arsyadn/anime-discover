import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAnimeDetail } from "../hooks/useAnimeDetail";
import { MoveLeft, Star, Play, Heart, Calendar, Tv, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import TrailerModal from "../components/TrailerModal";
import { getUserId, isLoggedIn } from "../utils/auth";
import { addToWishlist, getWishlist } from "../api/wishlist";
import { Loading } from "./AnimeList";
import ModalPopUp from "../components/ModalPopUp";
import LoadingComp from "../components/LoadingComp";

const Page = styled.main`
  min-height: 100vh;
  background: radial-gradient(circle at top, #111 0%, #000 60%);
  color: ${({ theme }) => theme.colors.text};
`;

const Hero = styled.section<{ bg: string }>`
  position: relative;
  padding: 96px 20px 140px;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.9) 85%
    ),
    url(${({ bg }) => bg}) center / cover no-repeat;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  padding: 12px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const Content = styled.section`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 56px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PosterWrap = styled.div`
  position: relative;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
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

const Info = styled.div`
  padding-top: 8px;
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.02em;
`;

const JapaneseTitle = styled.p`
  margin-top: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Synopsis = styled.p`
  margin-top: 24px;
  max-width: 760px;
  line-height: 1.9;
  color: ${({ theme }) => theme.colors.muted};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 32px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(8px);
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StatLabel = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

const StatValue = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button<{ disabled?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 32px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.primary};

  background: ${({ theme, disabled }) =>
    disabled
      ? "rgba(255,255,255,0.08)"
      : `linear-gradient(
          180deg,
          ${theme.colors.primary},
          #b20710
        )`};

  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;

  backdrop-filter: blur(10px);
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.45 : 1)};
  transition: all 0.25s ease;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
    filter: ${({ disabled }) => (disabled ? "none" : "brightness(1.08)")};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);

  color: #e5e7eb;
  font-size: 14px;
  font-weight: 600;

  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { anime, loading, error } = useAnimeDetail(id!);

  const [openTrailer, setOpenTrailer] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [libraryEntry, setLibraryEntry] = useState<any>(null);
  const [loadingEntry, setLoadingEntry] = useState<boolean>(true);

  const [popUp, setPopUp] = useState<boolean>(false);

  const handleSubmit = async (userId: string) => {
    try {
      setSaving(true);
      await addToWishlist(userId, id!);
      setSaved(true);
    } catch (err) {
      console.error("Failed to add to wishlist", err);
    } finally {
      setSaving(false);
    }
  };
  const handleAddToList = async () => {
    const userId = getUserId();
    if (userId) {
      handleSubmit(userId);
    } else {
      setPopUp(true);
    }
  };

  useEffect(() => {
    const userId = getUserId();
    if (!userId || !id) {
      setLoadingEntry(false);
      return;
    }

    getWishlist(userId, id)
      .then(setLibraryEntry)
      .finally(() => setLoadingEntry(false));
  }, [id]);

  if (loading) return <LoadingComp />;
  if (error || !anime) return <Page>{error ?? "Anime not found"}</Page>;

  const { attributes } = anime;

  return (
    <Page>
      <Hero bg={attributes.coverImage?.large || attributes.posterImage.large}>
        <Container>
          <BackButton onClick={() => navigate(-1)}>
            <MoveLeft size={18} /> Back
          </BackButton>

          <Content>
            <PosterWrap>
              <Poster
                src={attributes.posterImage.large}
                alt={attributes.canonicalTitle}
              />
            </PosterWrap>

            <Info>
              <Title>{attributes.canonicalTitle}</Title>
              <JapaneseTitle>{attributes.titles.ja_jp}</JapaneseTitle>
              {attributes.averageRating && (
                <Badge>
                  {" "}
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />{" "}
                  {attributes.averageRating}{" "}
                </Badge>
              )}
              <Stats>
                <StatCard>
                  <Calendar size={18} />
                  <div>
                    <StatLabel>Year</StatLabel>
                    <StatValue>{attributes.startDate?.slice(0, 4)}</StatValue>
                  </div>
                </StatCard>

                <StatCard>
                  <Tv size={18} />
                  <div>
                    <StatLabel>Episodes</StatLabel>
                    <StatValue>{attributes.episodeCount}</StatValue>
                  </div>
                </StatCard>

                <StatCard>
                  <Clock size={18} />
                  <div>
                    <StatLabel>Duration</StatLabel>
                    <StatValue>{attributes.episodeLength} min</StatValue>
                  </div>
                </StatCard>

                <StatCard>
                  <Star size={18} />
                  <div>
                    <StatLabel>Rank</StatLabel>
                    <StatValue>#{attributes.popularityRank}</StatValue>
                  </div>
                </StatCard>
              </Stats>

              <Synopsis>{attributes.synopsis}</Synopsis>

              <Actions>
                <PrimaryButton
                  onClick={() => setOpenTrailer(true)}
                  disabled={!attributes.youtubeVideoId}
                >
                  <Play size={18} /> Watch Trailer
                </PrimaryButton>
                <GhostButton
                  onClick={handleAddToList}
                  disabled={saving || saved || libraryEntry || loadingEntry}
                >
                  <Heart
                    size={18}
                    fill={libraryEntry || saved ? "#ef4444" : "none"}
                    color={libraryEntry || saved ? "#ef4444" : "currentColor"}
                  />
                  {libraryEntry || saved
                    ? "In Wishlist"
                    : saving
                    ? "Saving..."
                    : "Add to Wishlist"}
                </GhostButton>
              </Actions>
            </Info>
          </Content>
        </Container>
      </Hero>

      {openTrailer && attributes.youtubeVideoId && (
        <TrailerModal
          youtubeId={attributes.youtubeVideoId}
          onClose={() => setOpenTrailer(false)}
        />
      )}

      {popUp && <ModalPopUp setShow={setPopUp} />}
    </Page>
  );
};

export default AnimeDetail;
