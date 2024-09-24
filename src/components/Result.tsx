import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Item {
  id: number;
  title: string;
  content: string;
}

interface ResultProps {
  items: Item[];
}

const Result: React.FC<ResultProps> = ({ items }) => {
  return (
    <>
      {items.map(item => (
        <Accordion key={item.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Result;
