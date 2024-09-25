export interface SubClause {
    SubClauseNo: string;
    SubClauseDesc: string;
    Status?: string;
}
  
export interface Clause {
    ClauseNo: string;
    ClauseDesc: string;
    SubClauses?: SubClause[];
    Status?: string;
    FollowUp?: string;
}
  
export interface Explanation {
    ExplanationNo: string;
    Explanation: string;
}
  
export interface Item {
    ArtNo: string;
    Name: string;
    SubHeading?: string;
    ArtDesc?: string;
    Clauses?: Clause[];
    Status?: string;
    Explanations?: Explanation[];
}