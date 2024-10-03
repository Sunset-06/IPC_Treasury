import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', 
        padding: '20px' 
      }}
    >
        <Typography variant='h4' color='white' whiteSpace='nowrap' marginRight="1em">IPC Treasury</Typography>
        <Box sx={{display:"flex",flexDirection:"row", alignItems:"center"}}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          style={{
            height: "3em",
            width: "50em",
            paddingLeft: "40px",
            borderRadius: '50px',
            marginRight: '10px',
            fontSize: '1rem'
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color='primary'
          style={{
            borderRadius: '50px',
            height: '3em', 
            minWidth: '3em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            /* background: 'lime' */
          }}
        >
          <SearchRounded sx={{color: 'black'}}/>
        </Button>
    </Box>
    </Box>
  );
};

export default Search;
