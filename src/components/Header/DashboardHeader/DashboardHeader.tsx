import { ChangeEvent, useState } from "react";
import logoImg from "../../../assets/logo.png";
import Image from "../../Image/Image.tsx";

interface HeaderProps {
  onPeriodChange: (period: string) => void;
  totalIncome: number;
  totalExpenses: number;
}

export default function DashboardHeader({
  onPeriodChange,
  totalIncome,
  totalExpenses,
}: HeaderProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

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
