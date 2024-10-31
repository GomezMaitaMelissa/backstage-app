import { Entity } from '@backstage/catalog-model';
import { EntityFilter } from '@backstage/plugin-catalog-react';
import { nestedValue } from '../utils';

export class CustomEntityFilter implements EntityFilter {
  /**
   * Creates an instance of entity importance filter.
   * @param {string} path
   * @param {Array<string>} values
   */
  constructor(readonly path: string, readonly values: string[]) {}
  /**
   * Filters entity
   * @param {Entity} entity
   * @returns boolean
   */
  filterEntity(entity: Entity): boolean {
    // Obtén el valor de la anotación 'dominio.pe/importance'
    const annotation = nestedValue(entity, this.path);

    return annotation !== undefined && this.values.includes(annotation);
  }
}
