import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { NumericFormat } from "react-number-format";

type FormCurrencyInputProps = {
  name: string;
  label: string;
  required: boolean;
  placeholder: string;
} & TextFieldProps;

const FormCurrencyInput: FC<FormCurrencyInputProps> = ({
  name,
  label,
  required,
  autoFocus,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref } }) => (
        <NumericFormat
          customInput={TextField}
          placeholder={placeholder}
          allowNegative={false}
          thousandSeparator={true}
          displayType="input"
          type="text"
          prefix={"SGD "}
          onValueChange={(values, sourceInfo) => {
            onChange(values.floatValue);
          }}
          value={value}
          variant="outlined"
          sx={{ mb: "1rem" }}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ""
          }
          label={label}
          required={required}
          inputRef={ref}
          valueIsNumericString={true}
          autoFocus={autoFocus}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export { FormCurrencyInput };
