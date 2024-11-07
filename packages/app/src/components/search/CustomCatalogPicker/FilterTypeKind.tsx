import React, { useEffect, useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef, useEntityList } from '@backstage/plugin-catalog-react';
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import { CustomFilters } from '../../types';
import { distinctNames, nestedValue } from '../../utils';
import { CustomEntityFilter } from '../../extensions';

interface FilterTypeProps {
  kind: string;
}

const validKinds = ['component', 'group', 'location', 'resource', 'api', 'template'];

export const FilterTypeKind = ({ kind }: FilterTypeProps) => {
  const [options, setOptions] = useState<Array<string>>([]);
  const {
    filters: { typeComponent },
    updateFilters,
  } = useEntityList<CustomFilters>();
  const catalogApi = useApi(catalogApiRef);
  const typeName = 'spec.type';

  useEffect(() => {
    const loadEntities = async () => {
      if (!validKinds.includes(kind)) {
        setOptions([]);
        return;
      }

      const response = await catalogApi.getEntities({
        filter: { kind: [kind] }, // Usa el kind que recibe como prop
      });
      const typeComponents = distinctNames(
        response.items.map(entity => nestedValue(entity, typeName)),
      );
      setOptions(typeComponents);
    };

    loadEntities();
  }, [kind, catalogApi]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as Array<string>;
    updateFilters({
      typeComponent: value.length
        ? new CustomEntityFilter(typeName, value)
        : undefined,
    });
  };

  if (!validKinds.includes(kind)) {
    return null; // No renderiza nada si el kind no es válido
  }

  return (
    <FormControl fullWidth>
      <Typography variant="button">Type</Typography>
      <Select
        labelId="type-kind-select-label"
        id="type-kind-select"
        multiple
        variant="outlined"
        fullWidth
        label="seleccione"
        value={typeComponent?.values ?? []}
        renderValue={selected => (selected as Array<string>).join(', ')}
        onChange={handleChange}
      >
        {options?.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox
              checked={(typeComponent?.values ?? []).indexOf(option) > -1}
            />
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};