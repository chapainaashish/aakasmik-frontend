import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const containerStyles = {
  marginTop: "40px",
  marginBottom: "40px",
  paddingTop: "60px",
};

const typographyStyles = {
  fontWeight: "bold",
  fontSize: { xs: "1.5rem", sm: "2.5rem" },
  textAlign: "center",
  lineHeight: "1.6",
};

const ActionText = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Container sx={containerStyles}>
        <Typography sx={typographyStyles} variant="h2">
          {t("action_text")}
        </Typography>
      </Container>
    </Box>
  );
};

export default ActionText;
