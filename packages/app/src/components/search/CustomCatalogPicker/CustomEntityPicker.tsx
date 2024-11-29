import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useEntityList } from '@backstage/plugin-catalog-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';

import { usePermission } from '@backstage/plugin-permission-react';
import { EntityKindFilter, NewEntityKindPickerProps } from '../../extensions';

const NewEntityKindPicker = (props: NewEntityKindPickerProps) => {
  const { onChange, allowedKinds, initialFilter, hidden } = props;
  const [selectedKind, setSelectedKind] = useState<string>(
    initialFilter || allowedKinds[0] || '',
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setSelectedKind(value);
    onChange(value);
  };

  return (
    <FormControl variant="outlined" fullWidth hidden={hidden}>
      <InputLabel id="entity-kind-select-label">Kind</InputLabel>
      <Select
        labelId="entity-kind-select-label"
        id="entity-kind-select"
        value={selectedKind}
        onChange={handleChange}
        label="Kind"
      >
        {allowedKinds.map(kind => (
          <MenuItem key={kind.toLowerCase()} value={kind.toLowerCase()}>
            {kind.charAt(0).toUpperCase() + kind.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const CustomEntityKindPicker = () => {
  const { updateFilters } = useEntityList();
  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [allowedKinds, setAllowedKinds] = useState<string[]>([
    'component',
    'domain',
    'group',
    'location',
    'resource',
    'system',
    'user',
  ]);
  const { allowed } = usePermission({
    permission: catalogEntityCreatePermission,
  });

  useEffect(() => {
    if (allowed) {
      setAllowedKinds([
        'component',
        'domain',
        'group',
        'location',
        'resource',
        'system',
        'user',
      ]);
    } else {
      setAllowedKinds(prevKinds =>
        prevKinds.filter(kind => kind !== 'location'),
      );
    }
  }, [allowed]);

  const handleChange = (selectedKind: string) => {
    const kindFilter: EntityKindFilter = {
      value: selectedKind,
      label: selectedKind,
      getCatalogFilters: () => ({
        kind: selectedKind,
      }),
      toQueryValue: () => selectedKind,
    };

    setCurrentFilter(selectedKind);
    updateFilters({
      kind: kindFilter,
    });
  };

  useEffect(() => {
    updateFilters({
      kind: {
        value: 'component',
        getCatalogFilters: () => ({
          kind: 'component',
        }),
        toQueryValue: () => 'component',
      }
    });
  }, [updateFilters]);

  return (
    <NewEntityKindPicker
      onChange={handleChange}
      allowedKinds={allowedKinds}
      initialFilter={currentFilter}
    />
  );
};
