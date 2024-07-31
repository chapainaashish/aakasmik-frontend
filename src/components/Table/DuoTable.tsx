import { useState } from "react";
import NumberTable from "./NumberTable";
import MoreInfoCard from "./MoreInfoCard";
import Contact from "../../types/Contact";
import { useTranslation } from "react-i18next";

interface Props {
  allContacts: Contact[];
  nearestContacts: Contact[];
  searchTerm: string;
  searchResults: Contact[];
}

const DuoTable = ({
  allContacts,
  nearestContacts,
  searchTerm,
  searchResults,
}: Props) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { t } = useTranslation();

  return (
    <>
      {selectedContact && (
        <MoreInfoCard
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
      {searchTerm.length > 0 ? (
        <NumberTable
          title={`${t("table_header.search")} '${t(searchTerm.toLowerCase())}'`}
          contacts={searchResults}
          setNumber={setSelectedContact}
        />
      ) : (
        <NumberTable
          title={`${t("table_header.based_on_location")}`}
          contacts={nearestContacts}
          setNumber={setSelectedContact}
        />
      )}

      <NumberTable
        contacts={allContacts}
        title={`${t("table_header.all_contacts")}`}
        setNumber={setSelectedContact}
      />
    </>
  );
};

export default DuoTable;
