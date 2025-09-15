export interface IOcrEngine {
  recognize(imagePath: string): Promise<string>;
}