import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 96%;
  height: 60px;
  background: #feea00;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2%;
`;

const Title = styled.h1`
  font-weight: 900;
`;

const AuthLinks = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin-left: 20px;
  border: none;
  height: 40px;
  width: 70px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  background-color: white;
  font-weight: 300;
  &:hover {
    background: black;
    color: white;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Title>Freinds</Title>
      <AuthLinks>
        <Link to="/login">
          <Button>Login</Button>
        </Link>

        <Link to="/register">
          <Button>Sign up</Button>
        </Link>
      </AuthLinks>
    </Container>
  );
};

export default Navbar;
