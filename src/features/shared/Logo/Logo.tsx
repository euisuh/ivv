import { Box, Link } from "@mui/material";
import logo from "../../../assets/Logo.jpg";

export function Logo({ width = "100px" }) {
  const view = (
    <Link href={"/"}>
      <Box>
        <img src={logo} width={width} />
      </Box>
    </Link>
  );

  return view;
}

export default Logo;
