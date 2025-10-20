import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import UserList from "../layouts/UserList";
import GroupList from "../layouts/GroupList";
import FriendList from "../layouts/FriendList";
import FriendRequestList from "../layouts/FriendRequestList";
import MygroupsList from "../layouts/MygroupsList";
import BlockedUserList from "../layouts/BlockedUserList";

const Home = () => {
  let navigate = useNavigate();
  let data = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  });

  return (
    <div className="homeLayout"> 
        <Grid container spacing={4}>
          <Grid size={4}>
            <GroupList />
          </Grid>
          <Grid size={4}>
            <FriendList />
          </Grid>
          <Grid size={4}>
            <UserList />
          </Grid>
          <Grid size={4}>
            <FriendRequestList />
          </Grid>
          <Grid size={4}>
            <MygroupsList />
          </Grid>
          <Grid size={4}>
            <BlockedUserList />
          </Grid>
        </Grid>  
        
    </div>
  );
};

export default Home;
