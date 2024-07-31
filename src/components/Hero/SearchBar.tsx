import {
  Box,
  Container,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
};

const textFieldStyles = {
  width: { xs: "100%", sm: "70%" },
  height: "100%",
  maxHeight: 56,
  "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd":
    {
      paddingRight: 0,
    },
};

const buttonStyles = {
  height: "100%",
  maxHeight: 56,
  padding: "27px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

interface Props {
  onSearchContacts: (searchTerm: string) => void;
}

const SearchBar = ({ onSearchContacts }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearchContacts(searchTerm);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const { t } = useTranslation();

  return (
    <Box>
      <Container sx={containerStyles}>
        <TextField
          sx={textFieldStyles}
          placeholder={t("search.placeholder")}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  sx={buttonStyles}
                  onClick={handleSearch}
                />
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </Box>
  );
};

export default SearchBar;
