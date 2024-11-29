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
    CustomNameColumn,
    CustomDomainColumn,
    CustomOwnerColumn,
    CustomTagsColumn,
    CustomTeamLeaderColumn,
  ];

  return (
    <>
      {kind?.value === 'system' && (
        <div style={{ minWidth: '800px', overflowX: 'auto' }}>
          <CatalogTable columns={additionalColumns} /> 
        </div>
      )}
      {kind?.value !== 'system' && (
        <div style={{ minWidth: '800px', overflowX: 'auto' }}>
          <CatalogTable />
        </div>
      )}
    </>
  );
};