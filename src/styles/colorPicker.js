import * as colors from "@material-ui/core/colors";

export default (hue, shade) => {
  if ((/^#.+/).test(hue)) {
    return hue;
  } else {
    return colors[hue][shade] ? colors[hue][shade] : colors.purple;
  }
};