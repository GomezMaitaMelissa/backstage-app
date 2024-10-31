import { Entity } from '@backstage/catalog-model';
import { EntityFilter } from '@backstage/plugin-catalog-react';
import { nestedValue } from '../utils';

export class LikeEntityFilter implements EntityFilter {
  constructor(readonly path: string, readonly values: string) {}

  filterEntity(entity: Entity): boolean {
    const annotation = nestedValue(entity, this.path);
    
    return (
      annotation !== undefined &&
      this.search(
        annotation.toUpperCase(),
        `%${this.values.toUpperCase().normalize('NFD')}%`,
      )
    );
  }

  private search(data: string, pattern: string): boolean {
    // Reemplaza `%` con `.*` y `_` con `.` en la expresión regular
    const regexPattern = pattern.replace(/%/g, '.*').replace(/_/g, '.');
    const regex = new RegExp(`^${regexPattern}$`, 'i'); // `i` para búsqueda insensible a mayúsculas/minúsculas

    return regex.test(data);
  }
}
