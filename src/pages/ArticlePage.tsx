import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { GoogleGenerativeAI } from "@google/generative-ai";
import coi from '../COI.json';
import { Item } from '../types';

const ArticlePage: React.FC = () => {
  const { no } = useParams<{ no: string }>();
  const item = coi.find((item: Item) => item.ArtNo === no);
  
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const key = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY); 
  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const model = key.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze the following article from the Indian constitution and explain it in simple language: ${JSON.stringify(item)}`;

      const result = await model.generateContent(prompt);
      setAnalysis(result.response.text());
    } catch (err) {
      setError('Failed to analyze the article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <Container>
        <Typography variant="h4" color="white">
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
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1em' }} gutterBottom>
          {item.Name}
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: '1em' }} gutterBottom>
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
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Ask Gemini'}
        </Button>
      </Box>
      {error && (
        <Box sx={{ marginTop: '1em' }}>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </Box>
      )}
      {analysis && (
        <Box sx={{ marginTop: '1em' }}>
          <Typography variant="h5" gutterBottom>
            Gemini Analysis
          </Typography>
          <Typography 
            variant="body1" 
            color="white" 
            sx={{ whiteSpace: 'pre-line' }} 
          >
            {analysis}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ArticlePage;
