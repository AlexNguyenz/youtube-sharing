import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { IVideo } from "~/apis/video/type";
import { listVideoApi } from "~/apis/video/video";
import Video from "~/components/Video";
import loadingState from "~/stores/loading";
import toastState, { IToast } from "~/stores/toast";

const HomePage = () => {
  const [listVideo, setListVideo] = useState<Array<IVideo>>([]);
  const [loading, setLoading] = useRecoilState(loadingState);
  const setToast = useSetRecoilState<IToast>(toastState);

  const handleGetListVideo = async () => {
    try {
      const response = await listVideoApi();
      setListVideo(response.list);
    } catch (error: any) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) handleGetListVideo();
  }, [loading]);

  return (
    <Spin spinning={loading}>
      <ListVideos>
        {listVideo.length > 0 &&
          listVideo.map((video, index) => <Video key={index} video={video} />)}
      </ListVideos>
    </Spin>
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
