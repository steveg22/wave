export interface Region {
  url: string;
  id: number;
  versions: number[];
  language_name: string;
  language_code: string;
}

export interface BusinessUnit {
  url: string;
  business_unit_id: string;
  dependencies?: number;
  business_unit: string;
  default_region: number;
}

export interface BusinessUnitRole {
  url: string;
  id: number;
  business_unit: string;
  roles: number[];
}
