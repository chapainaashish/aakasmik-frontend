import { CssBaseline } from "@mui/material";
import Header from "./components/Hero/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import switchSound from "./assets/switch.mp3";
import DuoTable from "./components/Table/DuoTable";
import Footer from "./components/Footer/Footer";
import BottomPagination from "./components/Pagination/BottomPagination";
import Contact from "./types/Contact";
import translate from "./services/translation";
import fetchContacts from "./hooks/fetchContacts";

translate;

const theme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  });

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [allContactsFull, setAllContactsFull] = useState<Contact[]>([]);
  const [nearestContacts, setNearestContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);

  const currentTheme = useMemo(() => theme(darkMode), [darkMode]);

  const toggleTheme = useCallback(() => {
    const audio = new Audio(switchSound);
    audio.play();
    setDarkMode((prevMode) => !prevMode);
  }, []);

  const fetchData = useCallback(async () => {
    const { fetchAllContacts, fetchNearestContactsIPInfo } = await fetchContacts();
    const allContactsArray = await fetchAllContacts();
    const nearestContactsArray = await fetchNearestContactsIPInfo();
    setAllContactsFull(allContactsArray);
    setAllContacts(allContactsArray.slice(0, 10));
    setNearestContacts(nearestContactsArray);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const fetchDataGeo = useCallback(async () => {
    const { fetchNearestContactsUserInfo } = await fetchContacts();
    const nearestContactsArray = await fetchNearestContactsUserInfo();
    setNearestContacts(nearestContactsArray);
  }, []);

  useEffect(() => {
    fetchDataGeo();
  }, [fetchDataGeo]);

  const searchContacts = useCallback((term: string) => {
    const regex = new RegExp(term, "i");
    const results = allContactsFull.filter(
      (contact) =>
        regex.test(contact.district) ||
        regex.test(contact.category) ||
        regex.test(contact.name) ||
        regex.test(contact.city)
    );
    setSearchTerm(term);
    setSearchResults(results);
  }, [allContactsFull]);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      setAllContacts(allContactsFull.slice((value - 1) * 10, value * 10));
    },
    [allContactsFull]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header
        darkMode={darkMode}
        onThemeToggle={toggleTheme}
        onSearchContacts={searchContacts}
      />
      <DuoTable
        allContacts={allContacts}
        nearestContacts={nearestContacts}
        searchTerm={searchTerm}
        searchResults={searchResults}
      />
      <BottomPagination page={page} handlePageChange={handlePageChange} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
