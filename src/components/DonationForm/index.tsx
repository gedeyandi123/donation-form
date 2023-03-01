import { FC, useCallback, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Grid, Box, Typography, Button, Stack } from "@mui/material";
import { donationFormSchema } from "../../validators";
import { IDonationForm } from "../../interfaces";
import { FormInput } from "../FormInput";
import { FormCurrencyInput } from "../FormCurrencyInput";
import { FormHyphenInput } from "../FormHyphenInput";
import { FormDialog } from "../FormDialog";

const DonationForm: FC = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({});

  const validationSchema = useMemo(() => donationFormSchema, []);

  const defaultValues: IDonationForm = {
    idNumber: "",
    donationAmount: "",
    name: "",
    email: "",
    postalCode: "",
    unitNumber: "",
    address: "",
    remarks: "",
  };

  const methods = useForm<IDonationForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback((formValues: IDonationForm) => {
    const payload = {
      ...formValues,
      donationAmount: Number(formValues?.donationAmount),
      unitNumber: formValues?.unitNumber
        ?.replaceAll("-", "")
        .replaceAll("_", ""),
    };
    console.table(payload);

    setOpen(true);
    setPayload(payload);
  }, []);

  return (
    <>
      <Container sx={{ height: "100vh" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <FormProvider {...methods}>
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                flexDirection="column"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ textAlign: "center", mb: "1.5rem" }}
                >
                  Donation Form
                </Typography>

                <FormCurrencyInput
                  label="Donation Amount"
                  type="text"
                  name="donationAmount"
                  required
                  autoFocus={true}
                  placeholder="SGD 5,000"
                />

                <FormInput
                  label="Name"
                  type="text"
                  name="name"
                  required
                  placeholder="Lionel Messi"
                />

                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  required
                  placeholder="lionel_messi@gmail.com"
                />

                <FormInput
                  label="ID Number"
                  type="text"
                  name="idNumber"
                  required
                  placeholder="S1951421H"
                />

                <FormInput
                  label="Postal Code"
                  type="text"
                  name="postalCode"
                  required
                  placeholder="330004"
                />

                <FormHyphenInput
                  label="Unit Number"
                  type="text"
                  name="unitNumber"
                  required
                  placeholder="123456"
                />

                <FormInput
                  label="Address"
                  type="text"
                  name="address"
                  multiline
                  maxRows={4}
                />

                <FormInput label="Remarks" type="text" name="remarks" />

                <Stack
                  direction="row"
                  justifyContent="right"
                  alignItems="center"
                  spacing={2}
                  mt={1}
                >
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => methods.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </FormProvider>
        </Grid>
      </Container>
      <FormDialog open={open} setOpen={setOpen} payload={payload} />
    </>
  );
};

export { DonationForm };
