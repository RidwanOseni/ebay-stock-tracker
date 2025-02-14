import { ScraperService } from './services/scraper-service';
import { EbayService } from './services/ebay-service';
import { ScrapingTarget } from './types';

export async function updateEbayStore(url: string, targets: ScrapingTarget[]) {
  const scraperService = new ScraperService(process.env.OPENAI_API_KEY!);
  const ebayService = new EbayService();

  try {
    // Scrape data from the supplier's website
    const scrapedData = await scraperService.scrape(url, targets);

    if (!scrapedData) {
      console.error("No data scraped from the supplier's website.");
      return;
    }

    // Iterate over the scraped data and update eBay store
    for (const key in scrapedData) {
      const item = scrapedData[key];
      const updateResponse = await ebayService.updateItem({
        itemId: item.id || 'default-id',
        title: item.title || 'No Title',
        price: item.price || 0,
        stock: item.stock || 0,
        description: item.description || 'No Description',
      });
      console.log('Update Response for item ID', item.id, ':', updateResponse);
    }
  } catch (error) {
    console.error("Error during the update process:", error);
  }
}
