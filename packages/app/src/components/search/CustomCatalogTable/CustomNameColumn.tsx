import React from 'react';
import { Link, TableColumn } from '@backstage/core-components';
import { CatalogTableRow } from '@backstage/plugin-catalog';
import { TypographyLink } from '../../extensions';
import LocationCityIcon from '@material-ui/icons/LocationCity';

export const CustomNameColumn: TableColumn<CatalogTableRow> = {
  title: 'Name',
  field: 'title',
  render: (row: CatalogTableRow) => {
    const systemName = row.entity?.metadata?.name;
    const systemTitle = row.entity?.metadata?.title;

    return (
      <Link to={`/catalog/default/system/${systemName}`}>
        <TypographyLink
          text={systemTitle}
          icon={<LocationCityIcon fontSize="inherit" />}
        />
      </Link>
    );
  },
  customFilterAndSearch: (filterValue, row: CatalogTableRow) => {
    const systemTitle = row.entity?.metadata?.title;

    // Verificar si el nombre del sistema coincide con el valor del filtro
    return (
      systemTitle?.toLowerCase().includes(filterValue.toLowerCase()) || false
    );
  },
};
