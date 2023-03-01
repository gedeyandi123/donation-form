import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import InputMask from "react-input-mask";

type FormInputProps = {
  name: string;
} & TextFieldProps;

const FormHyphenInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <InputMask
          mask="9-9-9-9-9-9"
          value={field.value}
          onChange={field.onChange}
          inputRef={field.ref}
        >
          <TextField
            {...otherProps}
            variant="outlined"
            sx={{ mb: "1rem" }}
            error={!!errors[name]}
            helperText={
              errors[name] ? (errors[name]?.message as unknown as string) : ""
            }
          />
        </InputMask>
      )}
    />
  );
};

export { FormHyphenInput };
