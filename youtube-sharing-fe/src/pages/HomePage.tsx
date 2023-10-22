import React from "react";
import { styled } from "styled-components";
import Video from "~/components/Video";

const HomePage = () => {
  return (
    <ListVideos>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Video key={index} />
        ))}
    </ListVideos>
  );
};

export default HomePage;

const ListVideos = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 50px;

  @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
    gap: 20px;
  }
`;
