import { CatalogApi } from "@backstage/plugin-catalog-react";
import { ReportData } from "../../types";
import { formatAcronym } from "../../utils";

// Función para obtener los datos de los repositorios importados
export const fetchRepositoryData = async (catalogApi: CatalogApi): Promise<ReportData[]> => {
  // Llama al endpoint del catálogo para obtener las entidades
  const response = await catalogApi.getEntities({
    filter: { kind: 'Component' },
  });

  return response.items.map(entity => ({
    creatorName: String(entity.metadata.annotations?.['backstage.io/creatorName'] || entity.spec?.['owner'] || 'N/A'),
    crewName: entity.metadata.annotations?.['backstage.io/crewName'] || 'N/A',
    applicationName: entity.metadata.name,
    applicationLetter: formatAcronym(entity.metadata.annotations?.['backstage.io/applicationLetter'] || entity.metadata.name || 'N/A'),
    squad: entity.metadata.annotations?.['backstage.io/squad'] || 'N/A',
    creationDate: entity.metadata.annotations?.['backstage.io/creationDate'] || 'N/A',
    repositoryName: String(entity.metadata.annotations?.['backstage.io/repositoryName'] || entity.kind || 'N/A'),
  }));
};