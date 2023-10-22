import React from "react";
import { Col, Flex, Row } from "antd";
import styled from "styled-components";

const Video = () => {
  return (
    <VideoContainer>
      <Column span={12} xs={24} md={12}>
        <iframe
          width="100%"
          height="auto"
          style={{ aspectRatio: "16/9" }}
          src="https://www.youtube.com/embed/c6t3bW7kx6E?si=RIZN9yYd8n-zOfjd"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Column>
      <Column span={12} xs={24} md={12}>
        <VideoDescription vertical gap={"10px"}>
          <Title>Video</Title>
          <Shared>
            <span>Shared by:</span> Nam Nguyen
          </Shared>
          <Description>
            <span>Description:</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              possimus impedit, dolorum qui sequi sapiente saepe officia id
              provident ex error ullam minima autem neque perferendis. Quo ut
              cupiditate explicabo? ossimus impedit, dolorum qui sequi sapiente
              saepe officia id provident ex error ullam minima autem neque
              perferendis. Quo ut cupiditate explicabo? provident ex error ullam
              minima autem neque perferendis. Quo ut cupiditate explicabo?
            </p>
          </Description>
        </VideoDescription>
      </Column>
    </VideoContainer>
  );
};

export default Video;

const VideoContainer = styled(Row)`
  max-width: 1000px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    height: auto;
    display: flex;
    flex-direction: row;
  }
`;

const Column = styled(Col)`
  height: 100%;
`;

const VideoDescription = styled(Flex)`
  height: 100%;
  overflow: hidden;
  padding: 20px;

  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    padding: 10px 0px;
  }
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: red;
`;

const Shared = styled.p`
  font-size: 18px;
  font-weight: 400;
  span {
  }
`;

const Description = styled.div`
  height: 100%;
  overflow: hidden;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    @media (max-width: ${(props) => props.theme.breakpoint.md}) {
      -webkit-line-clamp: 2;
    }
  }

  span {
    font-weight: 400;
    display: block;
  }
`;
