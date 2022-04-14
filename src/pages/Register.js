import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 400px;
  height: 300px;
  background-color: #feea00;
  border-radius: 20px;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 15px 0px 10px 0px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  font-weight: 300;
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  border: none;
  margin-top: 10px;
  height: 28px;
  width: 85%;
  border-radius: 20px;
  padding: 8px;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  width: 85%;
  height: 34px;
  background: black;
  padding: 8px;
  margin-top: 20px;
  cursor: pointer;
  color: white;
`;

const Register = () => {
  return (
    <Container>
      <FormWrapper>
        <Title>WELCOME!</Title>
        <Subtitle>Use your email and password to sign up</Subtitle>
        <Form>
          <Input placeholder="Username" />
          <Input placeholder="password" type="password" />
          <Button>Sign up</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Register;
