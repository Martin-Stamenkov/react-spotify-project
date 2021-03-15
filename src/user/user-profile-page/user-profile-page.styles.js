import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "styles";

export const useStyles = makeStyles((theme) => ({
  copyButtonText: {
    color: Colors.WD1F0000,
  },
  copyButton: {
    "& span": {
      color: Colors.WD1F0000,
    },
  },
}));
