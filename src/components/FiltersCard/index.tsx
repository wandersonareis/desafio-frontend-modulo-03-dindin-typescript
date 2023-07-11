import { FilterButton, FiltersActionApplyButton } from "../buttons";
import { primaryColor, whiteSnowColor } from "../colors";
import { CategoriesFilters, CategoriesTittle, FilterCard, FilterCardActionsContainer } from "./filtersCardStyled";
import { useTransaction } from "../../context";
import { useLoaderData } from "react-router-dom";
import { Category } from "../../dto/category.dto";

type FiltersCardProps = {
  selectedFilter: (categoryName: string) => boolean;
  filtersList: string[];
  setFiltersList: (filtersList: string[]) => void;
  setFilters: (filters: string[]) => void;
}

export default function FiltersCard({ selectedFilter, filtersList, setFiltersList, setFilters }: FiltersCardProps) {
  const { getTransactionData } = useTransaction();

  const categoriesList = useLoaderData() as Category[];

  function handleFilterClick(categoryName: string): void {
    if (filtersList.includes(categoryName)) {
      setFiltersList(filtersList.filter((f) => f !== categoryName));
    } else {
      setFiltersList([...filtersList, categoryName]);
    }
  }

  function applyFiltersList(): void {
    getTransactionData(filtersList);
    setFilters(filtersList);
  }

  function cleanFiltersList(): void {
    getTransactionData();
    setFiltersList([]);
    setFilters([]);
  }

  return (
    <FilterCard>
      <CategoriesTittle>Categoria</CategoriesTittle>
      <CategoriesFilters>
        {categoriesList &&
          categoriesList.map((category) => (
            <FilterButton
              key={category.id}
              bgColor={primaryColor}
              afterContent={selectedFilter(category.descricao) ? "x" : "+"}
              isSelected={selectedFilter(category.descricao)}
              onClick={() => handleFilterClick(category.descricao)}
            >
              <span>{category.descricao}</span>
            </FilterButton>
          ))}
      </CategoriesFilters>
      <FilterCardActionsContainer>
        <FiltersActionApplyButton onClick={cleanFiltersList}>Limpar Filtros</FiltersActionApplyButton>
        <FiltersActionApplyButton textColor={whiteSnowColor} bgColor={primaryColor} onClick={applyFiltersList}>
          Aplicar Filtros
        </FiltersActionApplyButton>
      </FilterCardActionsContainer>
    </FilterCard>
  );
}
