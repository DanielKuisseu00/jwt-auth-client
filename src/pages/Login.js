import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const Error = styled.div`
  width: 350px;
  height: 30px;
  background: #ff0000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 20px;
`;

const Login = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const savedUser = useSelector((state) => state.user.value);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      setUser(res.data);
      

      res.data && dispatch(addUser(res.data));
      res.data && history.push("/");
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <Container>
      {error && <Error>Opps? password or username is wrong</Error>}
      <FormWrapper>
        <Title>WELCOME !</Title>
        <Subtitle>Use your email and password to login</Subtitle>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>Sign In</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
