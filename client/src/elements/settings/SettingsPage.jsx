import { useEffect, useState } from "react";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

import useUpdateSettings from "./useUpdateSettings";
import useSettings from "./useSettings";

const StyledSettingsPage = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormSettings = styled.form`
  display: flex;
  flex-direction: column;
`;

function SettingsPage() {
  const { settings, isLoadingSettings } = useSettings();
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateSettings();
  const [workingHours, setWorkingHours] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [procedureNPrice, setProcedureNPrice] = useState("");

  // set the default when settings are  loaded
  useEffect(() => {
    if (!isLoadingSettings && settings) {
      let { workingHours, workingDays, procedureNPrice } = settings;

      setWorkingDays(workingDays || "");
      setWorkingHours(workingHours || "");
      setProcedureNPrice(procedureNPrice || "");

      const destructuredPNP = Object.values(procedureNPrice);
    }
  }, [isLoadingSettings, settings]);

  if (isLoadingSettings) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    updateSettings({ workingHours, workingDays, procedureNPrice });
  }

  return (
    <StyledSettingsPage>
      <FormSettings onSubmit={handleSubmit}>
        <FormRow label={"Working Hours"}>
          <input
            id="workingHours"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
          />
        </FormRow>

        <FormRow label={"Working Days"}>
          <textarea
            id="workingDays"
            value={workingDays}
            onChange={(e) => setWorkingDays(e.target.value)}
          />
        </FormRow>

        <FormRow label={"Procedures & Price"}>
          <textarea
            id="procedureNPrice"
            value={procedureNPrice}
            onChange={(e) => setProcedureNPrice(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <Button size="large" variation="regular" disabled={isUpdating}>
            {isUpdating ? <SpinnerMini /> : "Update Settings"}
          </Button>
        </FormRow>
      </FormSettings>
    </StyledSettingsPage>
  );
}

export default SettingsPage;
