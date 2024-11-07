import React from 'react';
import { CatalogTable, CatalogTableRow } from '@backstage/plugin-catalog';
import { useEntityList } from '@backstage/plugin-catalog-react';
import { TableColumn } from '@backstage/core-components';
import { CustomOwnerColumn } from './CustomOwnerColumn';
import { CustomNameColumn } from './CustomNameColumn';
import { CustomTeamLeaderColumn } from './CustomTeamLeaderColumn';
import { CustomDomainColumn } from './CustomDomainColumn';
import { CustomTagsColumn } from './CustomTagsColumn';
import { CustomFilters } from '../../types';

export const CustomCatalogTable = () => {
  const {
    filters: { kind },
  } = useEntityList<CustomFilters>();

  const additionalColumns: TableColumn<CatalogTableRow>[] = [
    {...CustomNameColumn, width:'40%'},
    {...CustomDomainColumn, width:'12%'},
    {...CustomOwnerColumn, width:'12%'},
    {...CustomTagsColumn, width:'20%'},
    {...CustomTeamLeaderColumn, width:'20%'},
  ];

  return (
    <>
      {kind?.value === 'system' && (
        <CatalogTable
          columns={additionalColumns} // Pasar las columnas adicionales
        />
      )}
      {kind?.value !== 'system' && <CatalogTable />}
    </>
  );
};
