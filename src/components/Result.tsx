import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Item } from '../types';

interface ResultProps {
  items: Item[];
}

const Result: React.FC<ResultProps> = ({ items }) => {
  return (
    <Box
      sx={{
        minHeight: "5em",
        borderRadius: '20px',
        padding: '2em',
        textAlign: 'center',
        color: 'white', 
      }}
    >
      {items.length === 0 ? (
        <Typography variant="h5" sx={{ color: "white" }}>Search something...</Typography>
      ) : (
        items.map(item => (
          <Accordion 
            key={item.ArtNo}
            sx={{ 
              marginBottom: '1em', 
              backgroundColor: 'rgba(255, 2555, 255, 0.3)',
              color: 'black', 
              borderRadius: '25px',
              minheight:"200px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography variant='h6' >{item.Name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{(item.ArtDesc)? item.ArtDesc:"No Description"}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default Result;
