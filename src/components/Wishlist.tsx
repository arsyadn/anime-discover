import styled from "styled-components";
import { useWishlist } from "../hooks/useWishlist";
import { getUserId } from "../utils/auth";

const Page = styled.main`
  min-height: 100vh;
  padding: clamp(16px, 4vw, 40px);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: clamp(16px, 3vw, 24px);
`;

const Card = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #0b0b0b;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
  }

  &:hover .actions {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 15%,
    rgba(0, 0, 0, 0.4) 45%,
    rgba(0, 0, 0, 0) 65%
  );
`;

const CardBody = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 14px;
  z-index: 2;
`;

const Title = styled.h4`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  opacity: 0;
  transform: translateY(8px);
  transition: all 0.25s ease;

  @media (max-width: 768px) {
    opacity: 1;
    transform: none;
  }
`;

const RemoveButton = styled.button`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.error};
  background: rgba(239, 68, 68, 0.15);
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.3);
    color: #fee2e2;
  }
`;

const StateText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  text-align: center;
`;

export default function Wishlist() {
  const userId = getUserId();
  const { data, loading, remove } = useWishlist(userId!);

  if (loading) {
    return (
      <Page>
        <StateText>Loading wishlist...</StateText>
      </Page>
    );
  }

  if (!data.length) {
    return (
      <Page>
        <StateText>Your wishlist is empty</StateText>
      </Page>
    );
  }

  return (
    <Page>
      <Grid>
        {data.map((entry) => {
          const attrs = entry.attributes;

          return (
            <Card key={entry.id}>
              <Poster
                src={attrs.posterImage?.large || attrs.posterImage?.medium}
                alt={attrs.titles?.en_jp}
              />

              <Overlay />

              <CardBody>
                <Title>{attrs.titles?.en_jp}</Title>

                <Actions className="actions">
                  <RemoveButton onClick={() => remove(entry.id)}>
                    Remove
                  </RemoveButton>
                </Actions>
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </Page>
  );
}
