import { colors } from "../../lib/style/theme";
import {ThreeDots} from "react-loader-spinner";

const DataLoader = () => {
  return (
    <ThreeDots
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      /*type="TailSpin"*/
      color={colors.yellow}
      height={100}
      width={100}
    />
  );
};

export default DataLoader;
