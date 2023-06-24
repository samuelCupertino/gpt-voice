import {
  FormControl,
  type FormControlProps,
  Slider,
  type SliderProps,
  Typography
} from '@mui/material'

interface ISliderFieldProps extends Omit<SliderProps, 'onChange'> {
  label?: string
  onChange?: (value: number) => void
  containerProps?: FormControlProps
}

export const SliderField: React.FC<ISliderFieldProps> = ({
  label,
  onChange,
  containerProps,
  ...props
}) => (
  <FormControl fullWidth {...containerProps}>
    <Typography fontSize={14} color="gray">
      {label}
    </Typography>
    <Slider
      valueLabelDisplay="auto"
      onChange={(_, value) => typeof value === 'number' && onChange(value)}
      sx={{ padding: '10px 0' }}
      {...props}
    />
  </FormControl>
)
