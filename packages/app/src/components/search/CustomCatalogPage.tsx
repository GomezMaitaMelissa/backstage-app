import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import {
  CatalogFilterLayout,
  DefaultEntityFilters,
  EntityListProvider,
  EntityOwnerPicker,
  EntityProcessingStatusPicker,
  useEntityList,
  UserListPicker,
} from '@backstage/plugin-catalog-react';
import { Header, Page } from '@backstage/core-components';
import { CustomEntityKindPicker, FilterTypeKind } from './CustomCatalogPicker';
import { CustomCatalogTable } from './CustomCatalogTable';
import { EntityFiltersSystem } from './EntiryFiltersSystem';
import { EntityFiltersLocation } from './EntiryFiltersLocation';

interface CustomEntityFilters extends DefaultEntityFilters {
  importance?: { value: string };
  pciScope?: { value: string };
  applicationType?: { value: string };
  teamLeader?: { value: string };
}

const CustomCatalogContent = () => {
  const {
    filters: { kind },
  } = useEntityList<CustomEntityFilters>();

  // Estado para controlar si se han cargado los filtros para 'system' y 'location'
  const [hasLoadedSystem, setHasLoadedSystem] = useState(false);
  const [hasLoadedLocation, setHasLoadedLocation] = useState(false);

  useEffect(() => {
    if (kind?.value === 'system' && !hasLoadedSystem) {
      setHasLoadedSystem(true);
    }

    if (kind?.value === 'location' && !hasLoadedLocation) {
      setHasLoadedLocation(true);
    }
  }, [kind, hasLoadedSystem, hasLoadedLocation]);

  return (
    <CatalogFilterLayout>
      <CatalogFilterLayout.Filters>
        <Grid container spacing={3} alignItems="flex-start">
          {/* Selector de Kind */}
          <Grid item md={10}>
            <CustomEntityKindPicker />
          </Grid>
          {/* Selector de Type */}
          <Grid item md={10}>
            <FilterTypeKind kind={String(kind?.value)} />
          </Grid>

          {/* Barra de Usuario */}
          <Grid item md={10}>
            <UserListPicker />
          </Grid>

          {kind?.value === 'system' &&<EntityFiltersSystem />}
          {kind?.value === 'location' && <EntityFiltersLocation />}
          {kind?.value !== 'system' && kind?.value !== 'location' && (
            <>
              <Grid item md={10}>
                <EntityOwnerPicker />
              </Grid>
              <Grid item md={10}>
                <EntityProcessingStatusPicker />
              </Grid>
            </>
          )}
        </Grid>
      </CatalogFilterLayout.Filters>
      <CatalogFilterLayout.Content>
        <CustomCatalogTable />
      </CatalogFilterLayout.Content>
    </CatalogFilterLayout>
  );
};

export const CustomCatalogPage = () => {
  return (
    <Page themeId="catalog">
      <Header title="Interbank Catalog" />
      <EntityListProvider>
        <CustomCatalogContent />
      </EntityListProvider>
    </Page>
  );
};