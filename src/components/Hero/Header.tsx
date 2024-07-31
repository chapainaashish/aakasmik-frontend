import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import PopularSearch from "./PopularSearch";
import ActionText from "./ActionText";
import { Box } from "@mui/material";

interface Props {
  darkMode: boolean;
  onThemeToggle: () => void;
  onSearchContacts: (searchTerm: string) => void;
}

function Header({ darkMode, onThemeToggle, onSearchContacts }: Props) {
  return (
    <Box sx={{ paddingBottom: "100px" }}>
      <Navbar darkMode={darkMode} onThemeToggle={onThemeToggle} />
      <ActionText />
      <SearchBar onSearchContacts={onSearchContacts} />
      <PopularSearch onSearchContacts={onSearchContacts} />
    </Box>
  );
}

export default Header;
