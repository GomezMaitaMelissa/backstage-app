import React from 'react';
import { Chip } from '@material-ui/core';
import { Link, TableColumn } from '@backstage/core-components';
import { CatalogTableRow } from '@backstage/plugin-catalog';

export const CustomTagsColumn: TableColumn<CatalogTableRow> = {
  title: 'Tags',
  field: 'metadata.tags',
  render: (row: CatalogTableRow) => {
    const tags = row.entity?.metadata?.tags || [];

    if (tags.length === 0) return 'No Tags';

    return (
      <div>
        {tags.map(tag => (
          <Link key={tag} to={`/catalog?filters[tag]=${tag}`} style={{ textDecoration: 'none' }}>
            <Chip
              label={tag}
              style={{ marginRight: '4px', marginBottom: '4px' }}
              clickable
              size="small"
            />
          </Link>
        ))}
      </div>
    );
  },

  customFilterAndSearch: (filterValue, row: CatalogTableRow) => {
    const tags = row.entity?.metadata?.tags || [];
    return tags.some(tag => tag.toLowerCase().includes(filterValue.toLowerCase()));
  },
};
