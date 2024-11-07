import { useEntityList } from '@backstage/plugin-catalog-react';
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { CustomFilters, FilterMultipleSelect } from '../types';
import { CustomEntityFilter, LikeEntityFilter } from '../extensions';


export const EntityAnnotationFilterMultiplePicker = ({
  label,
  options,
  filterKey,
  annotationName,
}: FilterMultipleSelect) => {
  const { filters, updateFilters } = useEntityList<CustomFilters>();
  const filterValue = filters[
    filterKey as keyof CustomFilters
  ] as CustomEntityFilter;
  const handleChange = (event: any) => {
    const value = event.target.value as Array<string>;

    updateFilters({
      [filterKey]: value.length
        ? new CustomEntityFilter(`metadata.annotations["${annotationName}"]`, value)
        : undefined,
    });
  };

  return (
    <FormControl fullWidth>
      <Typography variant="button">{label}</Typography>
      <Select
        labelId="importante-select-label"
        id="importante-select"
        multiple
        variant="outlined"
        fullWidth
        label="seleccione"
        value={filterValue?.values ?? []}
        renderValue={selected => (selected as Array<string>).join(', ')}
        onChange={handleChange}
      >
        {options?.map(option => (
          <MenuItem value={option}>
            <Checkbox
              checked={(filterValue?.values ?? []).indexOf(option) > -1}
            />
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const EntityAnnotationFilterText = ({
  label,
  filterKey,
  annotationName,
}: FilterMultipleSelect) => {
  const {
    filters: {},
    updateFilters,
  } = useEntityList<CustomFilters>();
  const handleChange = (event: any) => {
    const value = event.target.value;

    updateFilters({
      [filterKey]: value.length
        ? new LikeEntityFilter(
            `metadata.annotations["${annotationName}"]`,
            value,
          )
        : undefined,
    });
  };

  return (
    <FormControl fullWidth>
      <Typography variant="button">{label}</Typography>
      <TextField
        id="standard-multiline-flexible"
        multiline
        maxRows={4}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
    </FormControl>
  );
};
