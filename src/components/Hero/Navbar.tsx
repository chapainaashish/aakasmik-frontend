import Stack from "@mui/material/Stack";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { FaMoon } from "react-icons/fa";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import nepaliFlag from "../../assets/nepali.png";
import englishFlag from "../../assets/english.png";

const appBarStyles = {
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(10px)",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 99999,
};

interface Props {
  darkMode: boolean;
  onThemeToggle: () => void;
}
const brandTextStyle = {
  paddingTop: "5px",
  fontWeight: "bold",
  fontSize: "1rem",
};

function NavBar({ darkMode, onThemeToggle }: Props) {
  const { i18n } = useTranslation();
  const [languageNepali, setLanguageNepali] = useState(false);

  const handleLanguageChange = () => {
    setLanguageNepali(!languageNepali);
  };

  useEffect(() => {
    if (languageNepali) {
      i18n.changeLanguage("ne");
    } else {
      i18n.changeLanguage("en");
    }
  }, [languageNepali]);

  return (
    <Box sx={appBarStyles}>
      <Container>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography sx={brandTextStyle}>aakasmik</Typography>
          <Stack direction="row" spacing={5}>
            <IconButton onClick={handleLanguageChange}>
              <img
                src={languageNepali ? englishFlag : nepaliFlag}
                alt="Language flag"
                width="29"
                height="21"
              />
            </IconButton>
            <IconButton onClick={onThemeToggle}>
              {darkMode ? <WbSunnyIcon /> : <FaMoon size="1.2rem" />}
            </IconButton>{" "}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default NavBar;
