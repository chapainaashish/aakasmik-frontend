import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography } from "@mui/material";
import Contact from "../../types/Contact";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  contacts: Contact[];
  setNumber: (contact: Contact) => void;
}

function NumberTable({ title, contacts, setNumber }: Props) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Container>
        <Typography
          sx={{
            fontWeight: "bold",
            textDecoration: "bold",
            fontSize: "1rem",
          }}
        >
          {title}
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> {t("fields.name.title")} </TableCell>
                <TableCell> {t("fields.number.title")} </TableCell>
                <TableCell> {t("fields.category.title")} </TableCell>
                <TableCell> {t("fields.district.title")} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact: Contact) => (
                <TableRow
                  key={contact.number + Math.random().toString()}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                  onClick={() => setNumber(contact)}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{contact.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{contact.number}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{contact.category}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{contact.district}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default NumberTable;
