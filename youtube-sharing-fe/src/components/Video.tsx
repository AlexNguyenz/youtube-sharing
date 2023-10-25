import React from "react";
import { Col, Flex, Row } from "antd";
import styled from "styled-components";
import { IVideo } from "~/apis/video/type";
import parse from "html-react-parser";
import { DislikeOutlined, LikeFilled } from "@ant-design/icons";
import { formatNumber } from "~/utils/formatNumber";

interface Props {
  video: IVideo;
}
const Video: React.FC<Props> = ({ video }) => {
  return (
    <VideoContainer>
      <Column span={12} xs={24} md={12}>
        <iframe
          width="100%"
          height="auto"
          style={{ aspectRatio: "16/9" }}
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Column>
      <Column span={12} xs={24} md={12}>
        <VideoDescription vertical gap={"10px"}>
          <Title>{video.title}</Title>
          <Statistic>
            <span>
              <LikeFilled style={{ fontSize: "24px" }} />
              &nbsp;
              {formatNumber(video.statistics.likeCount)}
            </span>
            <span>
              <DislikeOutlined style={{ fontSize: "24px" }} />
              &nbsp;
              {formatNumber(video.statistics.dislikeCount)}
            </span>
          </Statistic>
          <Shared>
            <span>Shared by:</span> {video.userEmail}
          </Shared>
          <Description>
            <span>Description:</span>
            <p>{parse(video.description)}</p>
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

const Statistic = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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
  span {
    padding-bottom: 4px;
  }

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
    font-size: 16px;
    font-weight: 400;
    display: block;
  }
`;
