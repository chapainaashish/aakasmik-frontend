import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ButtonBase from "@mui/material/ButtonBase";
import CloseIcon from "@mui/icons-material/Close";
import Contact from "../../types/Contact";
import { useTranslation } from "react-i18next";

interface Props {
  contact: Contact;
  onClose: () => void;
}

export default function MoreInfoCard({ contact, onClose }: Props) {
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
          width: { xs: "90%", md: "70%", lg: "50%" },
          margin: "auto",
          zIndex: 9998,
        }}
      >
        <Container>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box sx={{ display: "flex", gap: "4px" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {contact.name}
                        </Typography>
                      </Box>

                      <ButtonBase onClick={onClose}>
                        <Box sx={{ display: "flex", gap: "4px" }}>
                          <CloseIcon />
                        </Box>
                      </ButtonBase>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> {t("fields.name.title")}</TableCell>
                  <TableCell align="right">{contact.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> {t("fields.category.title")}</TableCell>
                  <TableCell align="right">{contact.category}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell> {t("fields.location.title")}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {contact.city
                      ? `${contact.city}, ${contact.district}`
                      : contact.district}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> {t("fields.province.title")}</TableCell>
                  <TableCell align="right">{contact.province}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> {t("fields.number.title")}</TableCell>
                  <TableCell align="right">{contact.number}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <ButtonBase component="a" href={`tel:${contact.number}`}>
                        <Box sx={{ display: "flex", gap: "4px" }}>
                          <CallIcon />
                          <Typography> {t("card.call")}</Typography>
                        </Box>
                      </ButtonBase>
                      <ButtonBase
                        component="a"
                        href={`https://www.google.com/maps?q=${contact.latitude},${contact.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Box sx={{ display: "flex", gap: "4px" }}>
                          <LocationOnIcon />
                          <Typography> {t("card.map")}</Typography>
                        </Box>
                      </ButtonBase>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
}
