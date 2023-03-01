import { CssBaseline } from "@mui/material";
import { FC } from "react";
import { DonationForm } from "./components";

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <DonationForm />
    </>
  );
};

export default App;
