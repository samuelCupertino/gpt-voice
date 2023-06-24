import {
  FormControlLabel,
  type FormControlLabelProps,
  Switch,
  type SwitchProps
} from '@mui/material'

interface ISwitchFieldProps extends Omit<SwitchProps, 'onChange'> {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  containerProps?: FormControlLabelProps
}

export const SwitchField: React.FC<ISwitchFieldProps> = ({
  label,
  value,
  onChange,
  containerProps,
  ...props
}) => (
  <FormControlLabel
    control={
      <Switch checked={value} onChange={() => onChange(!value)} {...props} />
    }
    label={label}
    {...containerProps}
  />
)
