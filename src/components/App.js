import { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import LoadingScreen from "./Loading";

import {
  fetchTags,
  fetchUser,
} from "../lib/api";

import TagsContainer from "./TagsContainer";

const useStyles = makeStyles(() => ({
  rootContainer: {
    padding: "20px",
  },
}));

const userId = "1111-2222-3333-4444";

const App = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState();
  const [allTags, setAllTags] = useState();

  useEffect(() => {
    const getUser = async () => {
      const result = await fetchUser(userId);
      setUser(result);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getTags = async () => {
      try {
        const result = await fetchTags();
        setAllTags(result);
      } catch (e) {
        enqueueSnackbar("Error fetching tags. Please try again");
      }
    };
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleUpdateUser = (newUserValue) => {
    setUser(newUserValue);
  };

  return (
    <Container className={classes.rootContainer} maxWidth="sm">
      <LoadingScreen isLoaded={!!user}>
        <Typography color="primary" variant={"h5"}>
          {user?.fullName}
        </Typography>
        <TagsContainer user={user} allTags={allTags} handleUpdateUser={handleUpdateUser} />
      </LoadingScreen>
    </Container>
  );
};

export default App;