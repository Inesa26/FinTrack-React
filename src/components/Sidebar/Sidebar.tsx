import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import Image from "../Image/Image";

const Sidebar = styled(Box)(({ theme }) => ({
  width: 250,
  height: "100vh",
  backgroundColor: "#9bc4ff",
  color: "white",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function DashboardSidebar() {
  const [selectedItem, setSelectedItem] = React.useState("");
  const navigate = useNavigate();

  const handleListItemClick = (text: string, path: string) => {
    setSelectedItem(text);
    navigate(path);
  };

  return (
    <Sidebar>
      <Link to="/">
        <Image src={logoImg} alt="FinTrack logo" width={180} />
      </Link>
      <Divider sx={{ width: "100%", backgroundColor: "white" }} />
      <List sx={{ width: "100%", marginLeft: "50px" }}>
        {["Overview", "Chart", "Asset", "Account"].map((text) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleListItemClick(text, `/${text.toLowerCase()}`)}
            sx={{
              width: "90%",
              "&:hover": {
                backgroundColor: "#064aaf",
                cursor: "pointer",
              },
              backgroundColor: selectedItem === text ? "#064aaf" : "inherit",
            }}
          >
            <ListItemButton>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: {
                    color: "white",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "30px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Sidebar>
  );
}
