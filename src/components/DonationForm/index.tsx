import { FC, useCallback, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Grid, Box, Typography, Button, Stack } from "@mui/material";
import { donationFormSchema } from "../../validators";
import { IDonationForm } from "../../interfaces";
import { FormInput } from "../FormInput";
import { FormCurrencyInput } from "../FormCurrencyInput";
import { FormHyphenInput } from "../FormHyphenInput";

const DonationForm: FC = () => {
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
  }, []);

  return (
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
              />

              <FormInput label="Name" type="text" name="name" required />

              <FormInput label="Email" type="email" name="email" required />

              <FormInput
                label="ID Number"
                type="text"
                name="idNumber"
                required
              />

              <FormInput
                label="Postal Code"
                type="text"
                name="postalCode"
                required
              />

              <FormHyphenInput
                label="Unit Number"
                type="text"
                name="unitNumber"
                required
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
  );
};

export { DonationForm };
