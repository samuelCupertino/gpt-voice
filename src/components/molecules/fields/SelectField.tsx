import {
  FormControl,
  type FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps
} from '@mui/material'
import { useEffect, useId, useState } from 'react'

export interface ISelectOption {
  value: string
  label: string
}

interface ISelectFieldProps extends Omit<SelectProps, 'onChange'> {
  label?: string
  options: ISelectOption[]
  value?: string
  onChange?: (value: string) => void
  containerProps?: FormControlProps
}

export const SelectField: React.FC<ISelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  containerProps,
  ...props
}) => {
  const fieldId = useId()
  const [valueSelected, setValueSelected] = useState('')

  useEffect(() => setValueSelected(value), [value])

  return (
    <FormControl fullWidth {...containerProps}>
      <InputLabel id={fieldId}>{label}</InputLabel>
      <Select
        labelId={fieldId}
        label={label}
        value={valueSelected}
        onChange={(ev) => {
          typeof ev.target.value === 'string' && onChange(ev.target.value)
        }}
        {...props}>
        {options.map((op) => (
          <MenuItem value={op.value}>{op.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
