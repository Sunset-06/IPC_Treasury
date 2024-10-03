import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import coi from '../COI.json';
import { Item } from '../types';

const ArticlePage: React.FC = () => {
  const { no } = useParams<{ no: string }>();
  const item = coi.find((item: Item) => item.ArtNo === no);

  if (!item) {
    return (
      <Container>
        <Typography variant="h4" color="white" >
          404 Error: This page does not exist. Make sure you entered the correct URL.
        </Typography>
      </Container>
    );
  }

  return (
    <Container 
        sx={{
          marginBottom: '1em',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          borderRadius: '25px',
          padding: '25px',
        }}
        maxWidth='xl'
    >
      <Box sx={{ marginTop: '2em', marginBottom: '2em' }}>
        <Typography variant="h4" sx={{fontWeight: 'bold', marginBottom: '1em'}} gutterBottom>
          {item.Name}
        </Typography>
        <Typography variant="h4" sx={{marginBottom: '1em'}} gutterBottom>
          Article Number: {item.ArtNo}
        </Typography>
        {item.SubHeading && (
          <Typography variant="h4" gutterBottom>
            {item.SubHeading}
          </Typography>
        )}
        {item.ArtDesc && (
          <Typography variant="body1" color="white">
            {item.ArtDesc}
          </Typography>
        )}
        {item.Clauses && item.Clauses.length > 0 && (
          <Box sx={{ marginTop: '1em' }}>
            <Typography variant="h5" gutterBottom>
              Clauses
            </Typography>
            <List>
              {item.Clauses.map((clause, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={<Typography color="white">{clause.ClauseDesc}</Typography>}
                    secondary={
                      clause.SubClauses && clause.SubClauses.length > 0 ? (
                        <List>
                          {clause.SubClauses.map((subClause, subIndex) => (
                            <ListItem key={subIndex}>
                              <ListItemText primary={<Typography color="white">{subClause.SubClauseDesc}</Typography>} />
                            </ListItem>
                          ))}
                        </List>
                      ) : null
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {item.Explanations && item.Explanations.length > 0 && (
          <Box sx={{ marginTop: '1em' }}>
            <Typography variant="h5" gutterBottom>
              Explanations
            </Typography>
            <List>
              {item.Explanations.map((explanation, index) => (
                <ListItem key={index}>
                  <ListItemText primary={<Typography color="white">{explanation.Explanation}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2em' }}>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: 'lime', color: 'black' }} 
        >
          Ask Gemini
        </Button>
      </Box>
    </Container>
  );
};

export default ArticlePage;
