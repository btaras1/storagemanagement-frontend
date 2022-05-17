import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import { getAllBuyers, getAllBuyersDetail, getTopCity } from "../../api/buyer";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  Table as TableStyle,
  TableHead,
  TableRow,
  TableData,
  THead,
  TableBody,
} from "../../components/ItemTable/TableStyle";
import {
  FormRow,
  SelectText,
  OptionText,
  RightColumn,
  LeftColumn,
} from "../../components/Form/FormSyle";
import { Grid, Main } from "../../lib/style/generalStyles";
import { getLatestReceipt, getMostSelledDoor, getReceiptCountForCurrentMonth } from "../../api/receipt";
import { getEmployeeCount } from "../../api/employee";
import { getAllItemsInStorages, getCountItems } from "../../api/storage";
import Card from "../../components/Card/Card";

const Home = () => {
  const authToken = localStorage.getItem("authToken");

  const [receiptsCount, setReceiptsCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [allItems, setAllItems] = useState(0);

  const [door,setDoor] = useState(null);
  const [receipt,setReceipt] = useState(null);
  const [city, setCity] = useState("");

const [dataLoaded, setDataLoaded] = useState(false);

  const initialFetchData = async () => {
    await getReceiptCountForCurrentMonth(authToken).then((items) => setReceiptsCount(items));
    await getEmployeeCount(authToken).then((items) => setEmployeeCount(items));
    await getCountItems(authToken).then((items) => setAllItems(items));
    await getMostSelledDoor(authToken).then((items) => setDoor(items));
    await getLatestReceipt(authToken).then((items) => setReceipt(items));
    await getTopCity(authToken).then((items) => setCity(items));
    setDataLoaded(true);

  }

  useEffect(() => {
    initialFetchData()
      .catch(console.error);
  }, [])

  return (
      
    <>
    {door || receipt || city || receiptsCount || employeeCount || allItems ? (
      <Section title="Statistika">
          <Grid columns={3}>
            {door && <Card
            title="Naprodavanija vrata"
            door={true}
            data={door}
            />}
            {receipt && <Card
            title="Zadnja prodaja"
            receipt={true}
            data={receipt}
            />}
            {city && <Card
            title="Grad sa najviše prodaja"
            city={true}
            data={city}
            />}
            {receiptsCount && <Card
            title="Broj prodaja za tekući mjesec"
            count={true}
            data={receiptsCount}
            />}
            {employeeCount && <Card
            title="Broj zaposlenika"
            count={true}
            data={employeeCount}
            />}
            {allItems && <Card
            title="Ukupni broj svih artikala u skladištu"
            count={true}
            data={allItems}
            />}
          </Grid>
      </Section>
          
        ) : (
          <Section title="LOADING..." />
        )}
      
    </>
  );
};

export default Home;