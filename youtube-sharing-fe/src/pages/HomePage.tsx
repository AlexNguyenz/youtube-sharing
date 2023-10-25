import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { IVideo } from "~/apis/video/type";
import { listVideoApi } from "~/apis/video/video";
import Video from "~/components/Video";

const HomePage = () => {
  const [listVideo, setListVideo] = useState<Array<IVideo>>([]);

  const handleGetListVideo = async () => {
    try {
      const response = await listVideoApi();
      setListVideo(response?.list || []);
    } catch (error: any) {
      console.log({ error });
    }
  };

  useEffect(() => {
    handleGetListVideo();
  }, []);

  return (
    <ListVideos>
      {listVideo.length &&
        listVideo.map((video, index) => <Video key={index} video={video} />)}
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
