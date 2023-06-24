import {
  Box,
  FormControl,
  type FormControlProps,
  TextField as InputTextField,
  type TextFieldProps
} from '@mui/material'

interface ITextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  label?: string
  value?: string
  onChange?: (value: string) => void
  containerProps?: FormControlProps
}

export const TextField: React.FC<ITextFieldProps> = ({
  label,
  helperText,
  value,
  onChange,
  containerProps,
  ...props
}) => {
  return (
    <FormControl fullWidth {...containerProps}>
      <InputTextField
        variant="outlined"
        label={label}
        helperText={<Box ml={-1.5}>{helperText}</Box>}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        {...props}
      />
    </FormControl>
  )
}
