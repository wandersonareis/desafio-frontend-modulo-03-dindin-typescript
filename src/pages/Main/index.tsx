import { useEffect, useState } from "react";
import { Card, MainCard, MainContainer, MainContent } from "./mainPageStyled";
import { FilterButton } from "../../components/buttons";
import FilterIcon from "../../assets/filter.svg";
import FiltersCard from "../../components/FiltersCard";
import TransactionsTable from "../../components/TransactionsTable";
import TransactionsSummary from "../../components/TransactionsSummary";
import { useToggle } from "../../lib/customHooks";
import HeaderResponsive from "../../components/Header";
import { useTransaction } from "../../context";

export default function Main() {
  const [filters, setFilters] = useState<string[]>([]);
  const [filtersList, setFiltersList] = useState<string[]>([]);
  const [filtersModalOpen, setFiltersModalOpen] = useToggle();

  const { getTransactionData } = useTransaction();

  useEffect(() => {
    getTransactionData();
  }, []);

  function selectedFilter(category_name: string): boolean {
    return filtersList.includes(category_name);
  }

  return (
    <MainContainer>
      <HeaderResponsive />
      <MainContent>
        <FilterButton type="button" onClick={setFiltersModalOpen}>
          <img src={FilterIcon} alt="Filter icon" />
          <span>Filtrar</span>
        </FilterButton>
        <MainCard>
          <Card>
            {filtersModalOpen && (
              <FiltersCard selectedFilter={selectedFilter} filtersList={filtersList} setFilters={setFilters} setFiltersList={setFiltersList} />
            )}
            <TransactionsTable filters={filters} />
          </Card>
          <TransactionsSummary />
        </MainCard>
      </MainContent>
    </MainContainer>
  );
}
