import { DefaultEntityFilters } from '@backstage/plugin-catalog-react';
import { CustomEntityFilter } from '../extensions/CustomEntityFilter';
import { LikeEntityFilter } from '../extensions';

export type CustomFilters = DefaultEntityFilters & {
  importance?: CustomEntityFilter;
  pciScope?: CustomEntityFilter;
  applicationType?: CustomEntityFilter;
  teamLeader?: LikeEntityFilter | CustomEntityFilter;
  typeComponent?: CustomEntityFilter;
};
