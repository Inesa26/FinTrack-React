import { Box, Grid } from "@mui/material";
import React from "react";
import TransactionList from "../components/List/TransactionList";

import BudgetChart from "../components/Chart/BudgetChart";
import MonthlySummaryList from "../components/List/MonthlySummaryList";
import MonthlySummaryReport from "../components/Summary/MonthlySummaryReport";

const Overview: React.FC = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "90%", marginLeft: "230px", width: "calc(100% - 230px)" }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={8}
          sx={{ backgroundColor: "#dceaff", borderRadius: "10px", padding: 2 }}
        >
          <MonthlySummaryReport />
        </Grid>
      </Grid>
      {/* Left Container */}
      <Grid
        item
        xs={5.5}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Top Left */}

        {/* First Box - 1/3 of the page */}
        <Grid item xs={12}>
          <Box
            sx={{
              height: "calc(21vh - 8px)",
              backgroundColor: "#dceaff",
              padding: 2,
              borderRadius: "10px",
            }}
          >
            <BudgetChart />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              height: "calc(56vh - 8px)",
              backgroundColor: "#dceaff",
              padding: 2,
              borderRadius: "10px",
            }}
          >
            <MonthlySummaryList />
          </Box>
        </Grid>
      </Grid>

      {/* Right Container */}
      <Grid item xs={6.5}>
        <Box
          sx={{
            height: "96%",
            backgroundColor: "#dceaff",
            padding: 2,
            borderRadius: "10px",
          }}
        >
          <TransactionList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Overview;
