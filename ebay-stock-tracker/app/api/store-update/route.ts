import { NextResponse } from 'next/server';
import { ScraperService } from '../../../lib/services/scraper-service';
import { ScrapingTarget } from '../../../lib/types';

export async function POST(request: Request) {
  try {
    const { url, targets } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const scraperService = new ScraperService(process.env.OPENAI_API_KEY!);
    const result = await scraperService.scrape(url, targets);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape data' },
      { status: 500 }
    );
  }
}

// If you want to handle other HTTP methods, you can add them here
export async function GET(request: Request) {
  return NextResponse.json({ message: 'GET request is not implemented.' });
}
