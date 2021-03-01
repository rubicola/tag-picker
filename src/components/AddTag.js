
import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Chip } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TagAutoComplete from "./TagAutoComplete";

const useStyles = makeStyles(() => ({
  addTagButton: {
    backgroundColor: "transparent"
  },
  addTagIcon: {
    verticalAlign: "middle",
    color: "lightGrey",
    marginRight: "1rem"
  }
}));

const AddTag = ({ newTag, handleTagInput, availableTags, filteredTagTitles }) => {
  const classes = useStyles();

  const [readyForInput, setReadyForInput] = useState(false);
  const [showAddTip, setShowAddTip] = useState(false);

  const handleAddTagReady = () => {
    setReadyForInput(true);
  };

  const toggleAddTagReady = () => {
    setReadyForInput(!readyForInput);
  };

  return (
    <>
      {!readyForInput ?
        (<Button
          onMouseEnter={() => setShowAddTip(true)}
          onMouseLeave={() => setShowAddTip(false)}
          style={{ backgroundColor: "transparent" }}
          className={classes.addTagButton}
          onClick={() => handleAddTagReady()}>
          <AddCircleIcon className={classes.addTagIcon} />
          {showAddTip &&
            <Typography variant={"caption"}>ADD</Typography>
          }
        </Button>)
        :
        (<>
          <Chip
            variant={"outlined"}
            color={"primary"}
            label={
              <TagAutoComplete
                availableTags={availableTags}
                filteredTagTitles={filteredTagTitles}
                startValue={newTag}
                handleTagInput={handleTagInput}
                toggleAddTagReady={toggleAddTagReady}
              />
            }
          />
        </>)
      }
    </>
  );
};

AddTag.propTypes = {
  newTag: PropTypes.string,
  handleTagInput: PropTypes.func.isRequired,
  availableTags: PropTypes.array.isRequired,
  filteredTagTitles: PropTypes.array.isRequired
};

export default AddTag;
