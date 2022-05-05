import ProcurementForm from "../../components/ProcurementForm/ProcurementForm";
import Section from "../../components/Section/Section";

const Procurement = () => {
  const authToken = localStorage.getItem("authToken");

  return (
    <>
      <Section title="Nabava">
        <ProcurementForm />
      </Section>
    </>
  );
};

export default Procurement;