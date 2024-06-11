import React from "react";
import axios from "axios";

const fetchIcons = async (useAuth = true) => {
  try {
    let headers = {};
    if (useAuth) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await axios.get("https://localhost:7049/api/icon?pageIndex=1&pageSize=10", {
      headers,
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export default function GetIcons() {
  return (
    <>
      <button onClick={() => fetchIcons(true)}>Click to get list of Icons with Auth</button>
      <button onClick={() => fetchIcons(false)}>Click to get list of Icons without Auth</button>
    </>
  );
}
