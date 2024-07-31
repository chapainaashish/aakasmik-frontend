import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: "center",
  marginTop: "20px",
  gap: "10px",
};

const typographyStyles = {
  fontWeight: "bold",
  fontSize: "1rem",
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
  onSearchContacts: (searchTermAPI: string) => void;
}

const PopularSearch = ({ onSearchContacts }: Props) => {
  const { t } = useTranslation();

  const popular_searches = t("categories", { returnObjects: true });

  return (
    <Box>
      <Container sx={containerStyles}>
        <Typography sx={typographyStyles}>{t("search.label")} :</Typography>
        <Box sx={BoxStyle}>
          {Object.keys(popular_searches)
            .slice(0, 3)
            .map((key: string) => (
              <Typography
                key={key}
                component="a"
                href="#"
                sx={searchTermsStyles}
                onClick={() => onSearchContacts(key)}
              >
                {popular_searches[key as keyof typeof popular_searches]}
              </Typography>
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PopularSearch;
