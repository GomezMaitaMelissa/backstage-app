import { Grid } from '@material-ui/core';
import React from 'react';
import { EntityTeamLeaderMultiple } from './EntityTeamLeaderMultiple';

export const EntityFiltersLocation = () => {
  return (
    <>
      {/* Selector de Team Leader */}
      <Grid item md={10}>
        <EntityTeamLeaderMultiple />
      </Grid>
    </>
  );
};
