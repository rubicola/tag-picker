import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
}));


const LoadingScreen = ({ isLoaded, children }) => {
  const classes = useStyles();
  return (
    <>
      {isLoaded
        ? children
        : (
          <div className={classes.container}>
            <CircularProgress />
          </div>
        )
      }
    </>
  );
};

export default LoadingScreen;
