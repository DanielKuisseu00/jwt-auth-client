import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import jwtDecode from "jwt-decode";

const Container = styled.div`
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserContainer = styled.div`
  width: 30%;
  height: 500px;

  display: flex;
  align-items: center;
  justify-content: space between;
  flex-direction: column;
  margin-top: 20px;
`;

const Title = styled.h1`
  flex: 1;
`;

const ButtonContainer = styled.div`
  flex: 2;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
  align-items: center;
  flex-direction: column;
`;

const UserButton = styled.div`
  width: 70px;
  height: 20px;
  background: teal;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px;
`;

const Home = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/refresh", {
        token: user.refreshToken,
      });

      await dispatch(
        addUser({
          ...user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        })
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  user.accessToken &&
    axios.interceptors.request.use(
      async (config) => {
        let currentDate = new Date();

        let decodedToken = await jwtDecode(user.accessToken);

        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          config.headers["authorization"] = `Bearer ${data.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/auth/delete/${userId}`,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        {user.user ? (
          <UserContainer>
            <Title>{`Welcome back ${user.user.username}`}</Title>
            <ButtonContainer>
              <UserButton onClick={() => deleteUser(1)}>John</UserButton>
              <UserButton onClick={() => deleteUser(2)}>Amy</UserButton>
            </ButtonContainer>
          </UserContainer>
        ) : (
          <Title>Login please</Title>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
