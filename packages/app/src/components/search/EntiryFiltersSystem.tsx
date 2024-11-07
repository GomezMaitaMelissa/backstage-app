import { Grid } from '@material-ui/core';
import { EntityAnnotationFilterMultiplePicker } from './EntityFilters';
import React from 'react';
import { EntityTeamLeaderMultiple } from './EntityTeamLeaderMultiple';

export const EntityFiltersSystem = () => {
  return (
    <>
      {/* Selector de Importancia */}
      <Grid item md={10}>
        <EntityAnnotationFilterMultiplePicker
          label="Importancia"
          options={['Importante', 'Soporte al negocio', 'Crítica']}
          filterKey="importance"
          annotationName="interbank.pe/importance"
        />
      </Grid>
      {/* Selector de PCI */}
      <Grid item md={10}>
        <EntityAnnotationFilterMultiplePicker
          label="PCI"
          options={['Sí', 'No']}
          filterKey="pciScope"
          annotationName="interbank.pe/pci-scope"
        />
      </Grid>
      {/* Selector de Tipo de Aplicación */}
      <Grid item md={10}>
        <EntityAnnotationFilterMultiplePicker
          label="Tipo de Aplicación"
          options={['Negocio', 'Técnica']}
          filterKey="applicationType"
          annotationName="interbank.pe/application-type"
        />
      </Grid>
      {/* Selector de Team Leader */}
      <Grid item md={10}>
        <EntityTeamLeaderMultiple />
      </Grid>
    </>
  );
};
