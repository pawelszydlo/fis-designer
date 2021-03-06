// -------------------------- Gauges --------------------------

/** All valid field names of gauge config. */
export const GaugeConfigFields = [
  'lowerLimit',
  'upperLimit',
  'startAngle',
  'angularRange',
] as const;

/** Type for all valid field names of gauge config. */
export type GaugeConfigFieldsType = typeof GaugeConfigFields[number];

/** Object type for holding data for every field in gauge config. */
export type GaugeConfigFieldsObject<T> = {
  [property in GaugeConfigFieldsType]: T;
};

/** Configuration of gauge display. */
export type GaugeConfig = GaugeConfigFieldsObject<number>;

/** Helper function for getting absolute radian angles of min and max needle values. */
export function getAbsoluteNeedleAngleBounds(config: GaugeConfig): [number, number] {
  // FIS-Control's angle direction is reversed and translated by 90 degrees.
  let angleStartDeg = -90 - config.startAngle!;
  while (Math.abs(angleStartDeg) >= 360) {
    angleStartDeg = angleStartDeg % 360;
  }
  let angleEndDeg = angleStartDeg + config.angularRange!;
  while (Math.abs(angleEndDeg) >= 360) {
    angleEndDeg = angleEndDeg % 360;
  }
  // At this point angles are in correct angular coordinates, but are in degrees.
  return [(angleStartDeg * Math.PI) / 180, (angleEndDeg * Math.PI) / 180];
}

// -------------------------- Needles --------------------------

/** All valid field names of needle config. */
export const NeedleConfigFields = [
  'width',
  'height',
  'positionX',
  'positionY',
  'centerX',
  'centerY',
  'indicatorPositionX',
  'indicatorPositionY',
] as const;

/** Type for all valid field names of needle config. */
export type NeedleConfigFieldsType = typeof NeedleConfigFields[number];

/** Object type for an object holding data for every field in needle config. */
export type NeedleConfigFieldsObject<T> = {
  [property in NeedleConfigFieldsType]: T;
};

/** Configuration of needle display. */
export type NeedleConfig = NeedleConfigFieldsObject<number>;

// -------------------------- Numerical gauges --------------------------

/** All valid field names of numerical config. */
export const NumericalConfigFields = ['positionX', 'positionY', 'centered'] as const;

/** Type for all valid field names of numerical config. */
export type NumericalConfigFieldsType = typeof NumericalConfigFields[number];

/** Object type for holding data for every field in numerical config. */
export type NumericalConfigFieldsObject<T> = {
  [property in NumericalConfigFieldsType]: T;
};

/** Configuration of numerical gauge display. */
export interface NumericalConfig extends NumericalConfigFieldsObject<number | boolean> {
  positionX: number;
  positionY: number;
  centered: boolean;
}

// -------------------------- Tables --------------------------

/** All valid field names of table row config. */
export const TableRowConfigFields = [
  'measurementId',
  'label',
  'unit',
  'decimalPlaces',
  'factor',
  'calculationId',
  'lowerWarning',
  'upperWarning',
] as const;

/** Type for all valid field names of table row config. */
export type TableRowConfigFieldsType = typeof TableRowConfigFields[number];

/** Object type for holding data for every field in table row config. */
export type TableRowConfigFieldsObject<T> = {
  [property in TableRowConfigFieldsType]: T;
};

/** Configuration of a table row. */
export interface TableRowConfig extends TableRowConfigFieldsObject<number | string> {
  measurementId: number;
  label: string;
  unit: string;
  decimalPlaces: number;
  factor: number;
  calculationId: number;
  lowerWarning: number;
  upperWarning: number;
}

/** All valid field names of table config. */
export const TableConfigFields = ['controlUnitId', 'rows'] as const;

/** Type for all valid field names of table config. */
export type TableConfigFieldsType = typeof TableConfigFields[number];

/** Object type for holding data for every field in table config. */
export type TableConfigFieldsObject<T> = {
  [property in TableConfigFieldsType]: T;
};

/** Configuration of a table. */
export interface TableConfig extends TableConfigFieldsObject<number | TableRowConfig[]> {
  controlUnitId: number;
  rows: TableRowConfig[];
}
