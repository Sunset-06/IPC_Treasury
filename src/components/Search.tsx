import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        sx={{ marginRight: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default Search;
