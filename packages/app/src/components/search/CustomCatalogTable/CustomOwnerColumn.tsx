import React from 'react';
import { parseEntityRef, RELATION_OWNED_BY } from '@backstage/catalog-model';
import { GroupIcon, Link, TableColumn } from '@backstage/core-components';
import { CatalogTableRow } from '@backstage/plugin-catalog';
import { TypographyLink } from '../../extensions';


export const CustomOwnerColumn: TableColumn<CatalogTableRow> = {
  title: 'Owner',
  field: 'relations.ownedBy',
  render: (row: CatalogTableRow) => {
    const owner = row.entity?.relations?.find(
      relation => relation.type === RELATION_OWNED_BY,
    );

    if (!owner) return 'No Owner';

    const { name } = parseEntityRef(owner.targetRef);

    return (
      <Link to={`/catalog/default/group/${name}`}>
        <TypographyLink text={name} icon={<GroupIcon fontSize="inherit" />} />
      </Link>
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
