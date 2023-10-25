import React, { useState } from "react";
import { Button, Flex, Input, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { shareVideoApi } from "~/apis/video/video";
import toastState, { IToast } from "~/stores/toast";
import { useSetRecoilState } from "recoil";
import { MESSAGE } from "~/constant/message";

type IShareVideo = {
  url: string;
};

const SharePage = () => {
  const { control, handleSubmit } = useForm<IShareVideo>();
  const [loading, setLoading] = useState<boolean>(false);
  const setToast = useSetRecoilState<IToast>(toastState);

  const handleShareVideo = async (data: IShareVideo) => {
    try {
      setLoading(true);
      await shareVideoApi(data.url);
      setToast({ type: "success", message: MESSAGE.SUCCESS.SHARE_VIDEO });
    } catch (error: any) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: IShareVideo) => {
    handleShareVideo(data);
  };
  return (
    <Spin spinning={loading}>
      <Flex justify="center" align="center" style={{ minHeight: "500px" }}>
        <Container>
          <Title>Share a Youtube movie</Title>
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="url">Youtube URL:</Label>
            <Controller
              name="url"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="url"
                  {...field}
                  autoFocus
                  style={{ border: `${error ? "1px solid red" : "none"}` }}
                />
              )}
            />
            <Button type="primary" htmlType="submit">
              Share
            </Button>
          </FormStyled>
        </Container>
      </Flex>
    </Spin>
  );
};

export default SharePage;

const Container = styled.div`
  max-width: 500px;
  width: 500px;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Label = styled.label`
  cursor: pointer;
`;

const FormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
