import React from "react";
import { AppHeader, HeaderText, Username } from "./styledComponents";
import { User } from "../types";

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => (
  <AppHeader>
    <HeaderText>Analytics Dashboard</HeaderText>
    <Username>Welcome, {user ? user.firstName : "Guest"}!</Username>
  </AppHeader>
);

export default Header;
