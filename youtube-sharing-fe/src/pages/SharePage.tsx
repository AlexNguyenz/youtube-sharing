import React from "react";
import { Button, Flex, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";

type IShareVideo = {
  url: string;
};

const SharePage = () => {
  const { control, handleSubmit } = useForm<IShareVideo>();
  const onSubmit = (data: IShareVideo) => {
    console.log(data);
  };
  return (
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
