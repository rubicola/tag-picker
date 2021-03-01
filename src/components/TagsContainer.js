
import { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Card, CardContent, CircularProgress } from "@material-ui/core";
import TagChip from "./TagChip";
import AddTag from "./AddTag";
import {
  createTag,
  assignUserTag,
} from "../lib/api";

const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
    marginTop: "20px",
    minHeight: "20vh",
  },
  cp: {
    verticalAlign: "middle",
    display: "inline"
  }
}));

const TagsContainer = ({ user, allTags, handleUpdateUser }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [showAddTag, setShowAddTag] = useState(false);
  const [newTag, setNewTag] = useState();
  const [tagLoading, setTagLoading] = useState(false);

  const handleTagLoading = (flag) => {
    setTagLoading(flag);
  };

  const getTagDetails = (tagTitle) => {
    return allTags?.find(tag => tag.title === tagTitle);
  };

  const handleTagInput = async (tagTitle) => {
    try {
      const details = getTagDetails(tagTitle);
      let value;
      if (!details || details.length === 0) {
        value = await createTag({ title: tagTitle });
      } else {
        value = details;
      }
      handleTagLoading(true);
      const assignTagResult = await assignUserTag(user.uuid, value.uuid);
      handleUpdateUser(assignTagResult);
      handleTagLoading(false);
      setNewTag(null);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Error creating and assigning tag. Please try again");
    }
  };

  let availableTags = [];
  const filteredTags = allTags?.filter((tag) => {
    const userHasTag = user?.tags.includes(tag.uuid);
    if (!userHasTag) availableTags.push(tag);
    return userHasTag;
  });

  const filteredTagTitles = filteredTags?.map(tag => tag.title);

  return (
    <Card
      component={Paper}
      elevation={0}
      className={classes.container}
      onMouseEnter={() => setShowAddTag(true)}
      onMouseLeave={() => !newTag && setShowAddTag(false)}
    >
      <CardContent>
        <Typography className={classes.title} variant="h6" color="primary" gutterBottom>
          Tags
        </Typography>
        {filteredTags?.map(tag =>
          <TagChip
            key={tag.uuid}
            userId={user.uuid}
            tag={tag}
            handleUpdateUser={handleUpdateUser}
            handleTagLoading={handleTagLoading} />
        )}
        {showAddTag &&
          <AddTag
            handleTagInput={handleTagInput}
            newTag={newTag}
            availableTags={availableTags}
            filteredTagTitles={filteredTagTitles} />
        }
        {tagLoading &&
          <div className={classes.cp} >
            <CircularProgress size={20} />
          </div>
        }
      </CardContent>
    </Card>
  );
};

TagsContainer.propTypes = {
  user: PropTypes.object,
  allTags: PropTypes.array,
  handleUpdateUser: PropTypes.func.isRequired
};

export default TagsContainer;
