import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Month } from "../../interfaces/Month";
import {
  GetMonthlySummariesPerYear,
  MonthlySummary,
} from "../../services/MonthlySummaryService";

interface MonthlySummaryTableProps {
  year: number;
}

const MonthlySummaryTable: React.FC<MonthlySummaryTableProps> = ({ year }) => {
  const [monthlySummaries, setMonthlySummaries] = useState<
    MonthlySummary[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlySummaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await GetMonthlySummariesPerYear(year);
        // Sort monthly summaries by month in numeric order
        result.sort((a, b) => a.month - b.month);
        setMonthlySummaries(result);
      } catch (error) {
        setError("Error fetching monthly summaries");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySummaries();
  }, [year]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!monthlySummaries || monthlySummaries.length === 0) {
    return <div>No monthly summaries available for year {year}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Income</TableCell>
            <TableCell align="right">Expenses</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monthlySummaries.map((row) => (
            <TableRow key={`${row.year}-${row.month}`}>
              <TableCell component="th" scope="row">
                {Month[row.month]}
              </TableCell>
              <TableCell align="right">{row.income}</TableCell>
              <TableCell align="right">{row.expenses}</TableCell>
              <TableCell align="right">{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonthlySummaryTable;
