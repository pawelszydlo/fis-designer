import { CompleteStateImages } from '../state/preview.state';

/** Acceptable mime types. */
export const MIME_TYPE = 'image/png';

/** Image size restriction. Value must match if specified. */
export interface Restriction {
  x?: number;
  y?: number;
  pixels?: number;
}

/** Maximum image dimensions. From: https://fis-control.de/graphics-converter.html */
export const IMAGE_MAX_SIZE: CompleteStateImages<Restriction> = {
  backgroundImage: { x: 800, y: 480 },
  tableBackgroundImage: { x: 96, y: 96 },
  needleImage1: { pixels: 8192 },
  needleImage2: { pixels: 8192 },
  needleImage3: { pixels: 8192 },
  digit0: { pixels: 2730 },
  digit1: { pixels: 2730 },
  digit2: { pixels: 2730 },
  digit3: { pixels: 2730 },
  digit4: { pixels: 2730 },
  digit5: { pixels: 2730 },
  digit6: { pixels: 2730 },
  digit7: { pixels: 2730 },
  digit8: { pixels: 2730 },
  digit9: { pixels: 2730 },
  digitMinus: { pixels: 2730 },
  digitDot: { pixels: 2730 },
};

/** Labels for image inputs. */
export const IMAGE_LABEL: CompleteStateImages<string> = {
  backgroundImage: 'Gauges background',
  tableBackgroundImage: 'Tables background tile',
  needleImage1: 'Gauge 1 needle',
  needleImage2: 'Gauge 2 needle',
  needleImage3: 'Gauge 3 needle',
  digit0: 'Digit 0',
  digit1: 'Digit 1',
  digit2: 'Digit 2',
  digit3: 'Digit 3',
  digit4: 'Digit 4',
  digit5: 'Digit 5',
  digit6: 'Digit 6',
  digit7: 'Digit 7',
  digit8: 'Digit 8',
  digit9: 'Digit 9',
  digitMinus: 'Minus sign',
  digitDot: 'Decimal dot',
};
