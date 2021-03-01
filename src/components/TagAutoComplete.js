import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  addTagIcon: {
    verticalAlign: "middle",
    color: "lightGrey",
    marginRight: "5px"
  },
  selectedTitle: {
    fontSize: "0.5rem",
    width: "30vw"
  }
}));

const filter = createFilterOptions();

const TagAutoComplete = ({ startValue, availableTags, filteredTagTitles, handleTagInput, toggleAddTagReady }) => {
  const classes = useStyles();
  const [value, setValue] = useState(startValue);

  const availableTagsTitles = availableTags?.map(tag => tag.title);

  useEffect(() => {
    if (value) {
      handleTagInput(value);
      toggleAddTagReady();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Autocomplete
      value={startValue}
      onChange={(event, newValue) => {
        if (newValue?.createNew) {
          setValue(newValue.inputValue);
        } else if (availableTagsTitles?.includes(newValue.title)) {
          setValue(newValue.title);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // prevent duplicate named tags
        if (params.inputValue !== "" && !filteredTagTitles?.includes(params.inputValue)) {
          filtered.push({
            createNew: true,
            inputValue: params.inputValue,
            title: "CREATE TAG",
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={availableTags}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(option) => {
        return (
          <>
            {option?.createNew && <AddCircle className={classes.addTagIcon} />}
            <Typography variant={"body2"} className={classes.optionTitle}>{option.title}</Typography>
          </>
        );
      }}
      style={{ width: 150 }}
      freeSolo
      renderInput={(params) =>
        <TextField
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.selectedTitle,
            },
          }}
          {...params} />
      }
    />
  );
};

TagAutoComplete.propTypes = {
  startValue: PropTypes.string,
  availableTags: PropTypes.array,
  filteredTags: PropTypes.array,
  handleTagInput: PropTypes.func.isRequired,
  toggleAddTagReady: PropTypes.func.isRequired
};

export default TagAutoComplete;