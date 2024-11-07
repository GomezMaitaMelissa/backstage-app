import React, { useEffect, useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef, useEntityList } from '@backstage/plugin-catalog-react';
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { CustomFilters } from '../types';
import { CustomEntityFilter } from '../extensions';
import { distinctNames, nestedValue } from '../utils';


export const EntityTeamLeaderMultiple = () => {
  const [options, setOptions] = useState<Array<string>>([]);
  const {
    filters: { teamLeader },
    updateFilters,
  } = useEntityList<CustomFilters>();
  const catalogApi = useApi(catalogApiRef);
  const annotationName = 'metadata.annotations["interbank.pe/team-leader"]';
  const loadSystems = async () => {
    const response = await catalogApi.getEntities({
      filter: { kind: 'System' },
    });
    const teamLeaders = distinctNames(
      response.items.map(value => nestedValue(value, annotationName)),
    );

    setOptions(teamLeaders);
  };
  const handleChange = (event: any) => {
    const value = event.target.value as Array<string>;

    updateFilters({
      teamLeader: value.length
        ? new CustomEntityFilter(annotationName, value)
        : undefined,
    });
  };

  useEffect(() => {
    loadSystems();
  });

  return (
    <FormControl fullWidth>
      <Typography variant="button">Team leader</Typography>
      <Select
        labelId="team-leader-select-label"
        id="team-leader-select"
        multiple
        variant="outlined"
        fullWidth
        label="seleccione"
        value={teamLeader?.values ?? []}
        renderValue={selected => (selected as Array<string>).join(', ')}
        onChange={handleChange}
      >
        {options?.map(option => (
          <MenuItem value={option}>
            <Checkbox
              checked={(teamLeader?.values ?? []).indexOf(option) > -1}
            />
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
