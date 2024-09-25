import React, { useState, useMemo } from 'react';
import { Container } from '@mui/material';
import coi from '../COI.json';
import Search from '../components/Search';
import Result from '../components/Result';
import { Item } from '../types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredResults = useMemo(() => {
    if (!searchTerm) return [] as Item[];

    return coi.filter((item: Item) => {
      const matchesName = item.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubHeading = item.SubHeading?.toLowerCase().includes(searchTerm.toLowerCase()) || false; 
      const matchesArtDesc = item.ArtDesc?.toLowerCase().includes(searchTerm.toLowerCase()) || false; 

      const matchesClauses = item.Clauses?.some(clause =>
        clause.ClauseDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.SubClauses?.some(subClause =>
          subClause.SubClauseDesc.toLowerCase().includes(searchTerm.toLowerCase())
        ) || false 
      ) || false; 

      const matchesExplanations = item.Explanations?.some(explanation =>
        explanation.Explanation.toLowerCase().includes(searchTerm.toLowerCase())
      ) || false; 

      return matchesName || matchesSubHeading || matchesArtDesc || matchesClauses || matchesExplanations;
    });
  }, [searchTerm]);

  return (
    <Container maxWidth= 'xl' style={{margin: "0", padding: "2em", height: "100%", width: "100vw", display: "flex", flexDirection: "column"}}>
      <Search onSearch={setSearchTerm} />
      <Result items={filteredResults} />
    </Container>
  );
};

export default App;
