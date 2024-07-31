import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "20px",
  gap: "10px",
  padding: "30px",
};

const typographyStyles = {
  fontWeight: "bold",
  fontSize: { xs: "1.5rem", sm: "2.5rem" },
};

const searchTermsStyles = {
  textDecoration: "underline",
  fontSize: "1rem",
  color: "inherit",
};

const BoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

interface Props {
  onFormClicked: () => void;
  onAboutClicked: () => void;
}

const FooterLink = ({ onFormClicked, onAboutClicked }: Props) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Container sx={containerStyles}>
        <Typography sx={typographyStyles}>aakasmik</Typography>
        <Box sx={BoxStyle}>
          <Typography
            component="a"
            href="#"
            sx={searchTermsStyles}
            onClick={() => onFormClicked()}
          >
            {t("footer.add_contact")}
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={searchTermsStyles}
            onClick={() => onAboutClicked()}
          >
            {t("footer.about")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterLink;
