import React, { useState, ChangeEvent } from 'react';
import Image from "../../Image/Image.tsx";
import logoImg from "../../assets/logo.png";

interface HeaderProps {
  onPeriodChange: (period: string) => void;
  totalIncome: number;
  totalExpenses: number;
}

const DashboardHeader: React.FC<HeaderProps> = ({ onPeriodChange, totalIncome, totalExpenses }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const handlePeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedPeriod(value);
    onPeriodChange(value);
  };

  return (
    <header className="header">
     <Image src={logoImg} alt="FinTrack logo" width={180} />
      <div className="period-selection">
        <input 
          type="month" 
          value={selectedPeriod} 
          onChange={handlePeriodChange} 
          min="1950-01" 
          max="2100-12"
        />
        <div className="totals">
          <span>Total Income: {totalIncome}</span>
          <span>Total Expenses: {totalExpenses}</span>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
