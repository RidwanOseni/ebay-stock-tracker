export interface ScrapingTarget {
  type: 'stock' | 'price' | 'quantity';
  description: string;
}

export interface SelectorMap {
  [key: string]: string;
}

export interface ScrapedData {
  [key: string]: {
    text: string | null;
    rawHtml: string;
  };
}

export interface AIAnalysisResponse {
  selectors: SelectorMap;
  confidence: number;
} 