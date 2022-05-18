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

  const [receiptsCount, setReceiptsCount] = useState(null);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [allItems, setAllItems] = useState(null);

  const [door,setDoor] = useState(null);
  const [receipt,setReceipt] = useState(null);
  const [city, setCity] = useState(null);

const [dataLoaded, setDataLoaded] = useState(false);

  const initialFetchData = async () => {
    await getReceiptCountForCurrentMonth(authToken).then((items) => setReceiptsCount(items)).catch(err => console.log(err));
    await getEmployeeCount(authToken).then((items) => setEmployeeCount(items)).catch(err => console.log(err));
    await getCountItems(authToken).then((items) => setAllItems(items)).catch(err => console.log(err));
    await getMostSelledDoor(authToken).then((items) => setDoor(items)).catch(err => console.log(err));
    await getLatestReceipt(authToken).then((items) => setReceipt(items)).catch(err => console.log(err));
    await getTopCity(authToken).then((items) => setCity(items)).catch(err => console.log(err));
    console.log("Naj vrata " + door);
    console.log("Broj zaposlenika " + employeeCount);
    console.log("Broj artikala " + allItems);
    console.log("Broj računa u tekućem mjesecu " + receiptsCount);
    console.log("Zadnji račun " + receipt);
    console.log("Grad " + city);

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
            {door && door != null ? (
             <Card
            title="Naprodavanija vrata"
            door={true}
            data={door}
            />) : (null)}
            {receipt && receipt != null ? (
            <Card
            title="Zadnja prodaja"
            receipt={true}
            data={receipt}
            /> ) : (null)}
            {city && city != null ? (
             <Card
            title="Grad sa najviše prodaja"
            city={true}
            data={city}
            />) : (null)}
            {receiptsCount && receiptsCount != null && receiptsCount != 0 ? (
            <Card
            title="Broj prodaja za tekući mjesec"
            count={true}
            data={receiptsCount}
            />) : (null)}
            {employeeCount && employeeCount != null && employeeCount != 0 ? (
             <Card
            title="Broj zaposlenika"
            count={true}
            data={employeeCount}
            />) : (null)}
            {allItems && allItems != null && allItems != 0 ? (
            allItems.map((item) =>
            <Card
            title={item.value}
            count={true}
            data={item.quantity}
            />)) : (null)}
          </Grid>
      </Section>
          
        ) : (
          <Section title="LOADING..." />
        )}
      
    </>
  );
};

export default Home;