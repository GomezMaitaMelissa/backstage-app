import React from 'react';
import { parseEntityRef, RELATION_OWNED_BY } from '@backstage/catalog-model';
import { TableColumn } from '@backstage/core-components';
import { CatalogTableRow } from '@backstage/plugin-catalog';
import { Typography } from '@material-ui/core';
import { nestedValue } from '../../utils';

export const CustomTeamLeaderColumn: TableColumn<CatalogTableRow> = {
  title: 'Team leader',
  field: 'teamLeader',
  render: (row: CatalogTableRow) => {
    const owner = row.entity?.relations?.find(
      relation => relation.type === RELATION_OWNED_BY,
    );

    if (!owner) return 'No Owner';

    return (
      <Typography>
        {nestedValue(
          row.entity,
          'metadata.annotations["interbank.pe/team-leader"]',
        ) || 'N/A'}
      </Typography>
    );
  },
  customFilterAndSearch: (filterValue, row: CatalogTableRow) => {
    const owner = row.entity?.relations?.find(
      relation => relation.type === RELATION_OWNED_BY,
    );

    if (!owner) return false;

    const { name } = parseEntityRef(owner.targetRef);

    return name?.toLowerCase().includes(filterValue.toLowerCase()) || false;
  },
};
