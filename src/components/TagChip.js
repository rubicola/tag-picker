import { useState } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import colorPicker from "../styles/colorPicker";
import ClearIcon from "@material-ui/icons/Clear";

import {
  removeUserTag
} from "../lib/api";

const chipStyle = (color) => {
  return {
    border: `5px ${colorPicker(color, 900)}`,
    backgroundColor: colorPicker(color, 50),
    borderColor: colorPicker(color, 900),
    margin: "5px",
  };
};

const TagChip = ({ userId, tag, handleUpdateUser, handleTagLoading }) => {
  const { uuid: tagUuid, color, title } = tag;

  const [showDelete, setShowDelete] = useState(false);

  const getDeleteIcon = () => {
    return showDelete ? <ClearIcon fontSize={"small"} /> : <></>;
  };

  const handleTagDelete = async () => {
    handleTagLoading(true);
    const result = await removeUserTag(userId, tagUuid);
    handleUpdateUser(result);
    handleTagLoading(false);
  };

  return (
    <Chip
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      deleteIcon={getDeleteIcon()}
      onDelete={() => handleTagDelete()}
      label={title}
      style={chipStyle(color)}
      variant={"outlined"}
      color={"secondary"}
    />
  );
};

TagChip.propTypes = {
  userId: PropTypes.string.isRequired,
  tag: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    color: PropTypes.string,
    title: PropTypes.string.isRequired
  }),
  handleUpdateUser: PropTypes.func.isRequired,
  handleTagLoading: PropTypes.func.isRequired,
};

export default TagChip;
