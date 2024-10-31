import React from 'react';
import { Grid } from '@material-ui/core';
import {
  CatalogFilterLayout,
  DefaultEntityFilters,
  EntityKindPicker,
  EntityListProvider,
  EntityOwnerPicker,
  EntityProcessingStatusPicker,
  useEntityList,
  UserListPicker,
} from '@backstage/plugin-catalog-react';
import { Header, Page } from '@backstage/core-components';

import { CatalogTable } from '@backstage/plugin-catalog';
import { FilterTypeKind } from './CustomCatalogPicker';

interface CustomEntityFilters extends DefaultEntityFilters {
  importance?: { value: string };
  pciScope?: { value: string };
  applicationType?: { value: string };
  teamLeader?: { value: string };
}

// Mapeo de los valores `kind` a su componente correspondiente
const kindComponentMap: Record<string, string> = {
  component: "component",
  group: "group",
  location: "location",
  resource: "resource",
  api: "api",
};

const CustomCatalogContent = () => {
  const {
    filters: { kind },
  } = useEntityList<CustomEntityFilters>();

  return (
    <CatalogFilterLayout>
      <CatalogFilterLayout.Filters>
        <Grid container spacing={3} alignItems="flex-start">
          {/* Selector de Kind */}
          <Grid item md={10}>
            <EntityKindPicker />
          </Grid>
          {/* Selector de Type */}
          <Grid item md={10}>
            {kind?.value && kindComponentMap[kind.value] && (
              <FilterTypeKind kind={kindComponentMap[kind.value]} />
            )}
          </Grid>

          {/* Barra de Usuario */}
          <Grid item md={10}>
            <UserListPicker />
          </Grid>
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
        <CatalogTable />
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
