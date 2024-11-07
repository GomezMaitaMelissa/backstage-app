import React from 'react';
import { Link, TableColumn } from '@backstage/core-components';
import { parseEntityRef, RELATION_PART_OF } from '@backstage/catalog-model';
import { CatalogTableRow } from '@backstage/plugin-catalog';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useApi } from '@backstage/core-plugin-api';
import { useAsync } from 'react-use';
import CategoryIcon from '@material-ui/icons/Category';
import { TypographyLink } from '../../extensions';

const DomainTitleCell = ({ domainRef }: { domainRef: string }) => {
  const catalogApi = useApi(catalogApiRef);

  // Usar `useAsync` para obtener la entidad del dominio basado en su referencia
  const {
    value: domainEntity,
    loading,
    error,
  } = useAsync(async () => {
    return await catalogApi.getEntityByRef(domainRef);
  }, [catalogApi, domainRef]);

  if (loading) return <span>Loading...</span>;
  if (error || !domainEntity) return <span>No Domain</span>;

  // Obtener el título del dominio o el nombre como fallback
  const domainTitle =
    domainEntity?.metadata?.title || parseEntityRef(domainRef).name;

  // Crear el link hacia la página del dominio
  return (
    <Link
      to={`/catalog/${
        parseEntityRef(domainRef).namespace || 'default'
      }/domain/${parseEntityRef(domainRef).name}`}
    >
      <TypographyLink
        text={domainTitle}
        icon={<CategoryIcon fontSize="inherit" />}
      />
    </Link>
  );
};

export const CustomDomainColumn: TableColumn<CatalogTableRow> = {
  title: 'Domain',
  field: 'relations.partOf',
  render: (row: CatalogTableRow) => {
    // Buscar la relación con el dominio (RELATION_PART_OF)
    const domainRelation = row.entity?.relations?.find(
      relation =>
        relation.type === RELATION_PART_OF &&
        relation.targetRef.startsWith('domain:'),
    );

    // Si no hay dominio relacionado, mostrar un texto predeterminado
    if (!domainRelation) return 'No Domain';

    // Renderizar el componente `DomainTitleCell` con el reference del dominio
    return <DomainTitleCell domainRef={domainRelation.targetRef} />;
  },

  customFilterAndSearch: (filterValue, row: CatalogTableRow) => {
    // Buscar la relación con el dominio (RELATION_PART_OF)
    const domainRelation = row.entity?.relations?.find(
      relation =>
        relation.type === RELATION_PART_OF &&
        relation.targetRef.startsWith('domain:'),
    );

    // Si no hay dominio relacionado, no coincide con el filtro
    if (!domainRelation) return false;

    // Obtener el nombre y título del dominio
    const { name } = parseEntityRef(domainRelation.targetRef);
    const domainTitle = row.entity?.metadata?.title || name;

    // Verificar si el título o nombre del dominio coincide con el valor del filtro
    return (
      domainTitle?.toLowerCase().includes(filterValue.toLowerCase()) || false
    );
  },
};
