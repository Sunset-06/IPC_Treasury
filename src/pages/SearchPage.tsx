import React, { useState, useMemo } from 'react';
import { Container } from '@mui/material';
import coi from '../COI.json';
import Search from '../components/Search';
import Result from '../components/Result';

interface SubClause {
  SubClauseNo: string;
  SubClauseDesc: string;
  Status?: string;
}

interface Clause {
  ClauseNo: string;
  ClauseDesc: string;
  SubClauses?: SubClause[];
  Status?: string;
  FollowUp?: string;
}

interface Explanation {
  ExplanationNo: string;
  Explanation: string;
}

interface Item {
  ArtNo: string;
  Name: string;
  SubHeading?: string;
  ArtDesc?: string;
  Clauses?: Clause[];
  Status?: string;
  Explanations?: Explanation[];
}

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
    <Container>
      <Search onSearch={setSearchTerm} />
      <Result items={filteredResults} />
    </Container>
  );
};

export default App;
