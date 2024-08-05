import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

interface Props {
  onAboutClicked: () => void;
}

export default function About({ onAboutClicked }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(10px)",
          zIndex: 9997,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: { xs: "90%", md: "70%", lg: "80%" },
          margin: "auto",
          zIndex: 9997,
        }}
      >
        <Container
          component={Paper}
          sx={{
            width: { xs: "100%", md: "60%", lg: "60%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              rowGap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Box>
              <Box
                sx={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  columnGap: "4.5rem",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {t("footer.about")} 
                </Typography>
                <Box>
                  <ButtonBase onClick={onAboutClicked}>
                    <Box sx={{ display: "flex", gap: "4px" }}>
                      <CloseIcon />
                    </Box>
                  </ButtonBase>
                </Box>
              </Box>
            </Box>
            <Typography>
              {t("about.about_project")}
            </Typography>
            <Typography>
              {t("about.disclaimer")}
            </Typography>
            <Stack direction="row" spacing={2}>
            <IconButton onClick={() => window.open('https://github.com/chapainaashish/aakasmik-frontend', '_blank')}>
                <GitHubIcon />
                <Typography sx={{marginLeft: "5px"}}>{t("footer.contribute")}</Typography>
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
