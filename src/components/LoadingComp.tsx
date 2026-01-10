import styled from "styled-components";

export const Loading = styled.div`
  padding: 60px 0;
  text-align: center;
  opacity: 0.7;
`;

const LoadingComp = ({ title }: { title?: string }) => {
  return <Loading>{title ?? "Loading..."}</Loading>;
};

export default LoadingComp;
