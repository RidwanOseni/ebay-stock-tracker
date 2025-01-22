import * as puppeteer from 'puppeteer';
import { ScrapingTarget, ScrapedData, SelectorMap } from '../types';
import { AIService } from './ai-service';

export class ScraperService {
  private aiService: AIService;

  constructor(openAIKey: string) {
    this.aiService = new AIService(openAIKey);
  }

  async scrape(url: string, targetsToTrack: ScrapingTarget[]): Promise<ScrapedData | null> {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions'],
        timeout: 60000
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      
      // Get the full HTML
      const html = await page.content();
      
      // Analyze the page structure using AI
      console.log("Analyzing page structure...");
      const analysis = await this.aiService.analyzePageStructure(html, targetsToTrack);
      
      if (!analysis || !analysis.selectors) {
        throw new Error("Could not determine page selectors");
      }

      console.log("Found selectors with confidence:", analysis.confidence);
      console.log("Selectors:", analysis.selectors);

      // Extract data using the AI-provided selectors
      const result = await page.evaluate((selectors: SelectorMap) => {
        const data: ScrapedData = {};
        
        for (const [key, selector] of Object.entries(selectors)) {
          const element = document.querySelector(selector);
          if (element) {
            data[key] = {
              text: element.textContent?.trim() || null,
              rawHtml: element.innerHTML
            };
          }
        }
        
        return data;
      }, analysis.selectors);

      return result;
      
    } catch (error) {
      console.error("Error during scraping:", error);
      return null;
    } finally {
      if (browser) {
        try {
          await browser.close();
        } catch (closeError) {
          console.error("Error while closing browser:", closeError);
        }
      }
    }
  }
} 