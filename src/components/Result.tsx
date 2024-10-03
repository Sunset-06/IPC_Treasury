import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
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
            square={false}
            sx={{
              marginBottom: '1em',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'black',
              borderRadius: '25px',
              overflow: 'hidden',
              minHeight: "200px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            >
              <Typography variant='h6' sx={{color:  'white'}}>{item.Name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{color:  'white '}}>
              <Typography variant="body1">{item.ArtDesc ? item.ArtDesc : "No Description"}</Typography>
              <Link to={`/art/${item.ArtNo}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant='body2' sx={{ marginTop: '3em', textDecoration: 'underline', "&:hover":{color:'lime'} }}>
                  Read More
                </Typography>
              </Link>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default Result;  
