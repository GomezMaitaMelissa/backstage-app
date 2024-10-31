import { EntityKindPickerProps } from "@backstage/plugin-catalog-react";

export interface EntityPickerProps extends EntityKindPickerProps {
    onChange: (value: string | undefined) => void; // Cambia a string[] | undefined
    required?: boolean;
    rawErrors?: any[];
    formData?: any;
    idSchema?: { $id: string };
}

export interface EntityKindFilter {
    value: string;
    label: string;
    getCatalogFilters(): Record<string, string | string[]>;
    toQueryValue(): string;
}

export interface NewEntityKindPickerProps {
    allowedKinds: string[];
    initialFilter?: string;
    hidden?: boolean;
    onChange: (kind: string) => void;
}