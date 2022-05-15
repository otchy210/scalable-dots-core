export type DotProps = {
  x: number;
  y: number;
  size: number;
  fill: string;
};

export type DotType = 'SQUARE' | 'CIRCLE' | 'RHOMBUS';

export type ImageData = {
  width: number;
  height: number;
  data: Uint8ClampedArray; // RGBA format, left to right then top to bottom.
};

export type ScalableDotsProps = {
  imageData: ImageData;
  type: DotType;
  size: number;
  gap: number;
};
