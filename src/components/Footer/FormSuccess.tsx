import Paper from "@mui/material/Paper";

import { Box, Container, Stack, Typography } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

interface Props {
  onResultClicked: () => void;
}

export default function FormSuccess({ onResultClicked }: Props) {
  const { t } = useTranslation();

  return (
    <Container>
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
          zIndex: 9999,
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
                  {t("contribute_form.success_title")}
                </Typography>
                <Box>
                  <ButtonBase onClick={onResultClicked}>
                    <Box sx={{ display: "flex", gap: "4px" }}>
                      <CloseIcon />
                    </Box>
                  </ButtonBase>
                </Box>
              </Box>
            </Box>
            <Typography>{t("contribute_form.success_body")}</Typography>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "right" }}>
              <ButtonBase onClick={onResultClicked}>
                <Typography>{t("contribute_form.got_it")}</Typography>
              </ButtonBase>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
