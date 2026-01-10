import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 72px;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 18px;
  margin-bottom: 24px;
  margin-top: 0;
`;

const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Title>404</Title>
      <Text>Page not found</Text>
      <HomeLink to="/">Go back home</HomeLink>
    </Wrapper>
  );
};

export default NotFound;
