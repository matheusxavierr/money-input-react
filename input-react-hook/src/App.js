import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

const App = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const formatCurrency = (value) => {
    if (!value) return '0,00';

    let numericValue = value.replace(/[^0-9]/g, '');

    numericValue = numericValue.replace(/^0+(?!$)/, '');

    while (numericValue.length < 3) {
      numericValue = '0' + numericValue;
    }

    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${formattedIntegerPart},${decimalPart}`;
  };

  const handleChange = (e, onChange) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    onChange(value);
  };

  const parseCurrency = (value) => {
    return value.replace(/\./g, '').replace(',', '');
  };

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="money"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, ...field } }) => (
            <TextField
              {...field}
              label="Enter amount"
              variant="outlined"
              fullWidth
              value={formatCurrency(value)}
              onChange={(e) => {
                const rawValue = parseCurrency(e.target.value);
                handleChange({ target: { value: rawValue } }, onChange);
              }}
            />
          )}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default App;
