export interface ScrapingTarget {
  type: 'stock' | 'price' | 'quantity';
  description: string;
}

export interface SelectorMap {
  [key: string]: string;
}

export interface ScrapedData {
  [key: string]: {
    id: string; // Unique identifier for the item
    title: string | null; // Title of the item
    price: number | null; // Price of the item
    stock: number | null; // Stock quantity of the item
    description: string | null; // Description of the item
    rawHtml: string; // Raw HTML of the scraped element
    text: string | null; // Text content of the scraped element
  };
}

export interface AIAnalysisResponse {
  selectors: SelectorMap;
  confidence: number;
}

// New interfaces for eBay integration

export interface EbayItemUpdate {
  itemId: string; // The unique identifier for the eBay item
  title?: string | null; // The title of the item (optional, can be null)
  price?: number | null; // The price of the item (optional, can be null)
  stock?: number | null; // The stock quantity of the item (optional, can be null)
  description?: string | null; // The description of the item (optional, can be null)
}

export interface EbayApiResponse {
  ack: string; // Acknowledgment of the request (e.g., "Success" or "Failure")
  itemId?: string; // The ID of the item that was updated (if applicable)
  errors?: Array<{
    errorCode: string; // Error code
    shortMessage: string; // Short error message
    longMessage?: string; // Detailed error message (optional)
  }>; // Array of errors if the request failed
}

// New interface for configuration
export interface EbayApiCredentials {
  appId: string; // eBay App ID
  certId: string; // eBay Cert ID
  devId: string; // eBay Dev ID
} 