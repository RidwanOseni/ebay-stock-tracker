const puppeteer = require("puppeteer");

async function checkStock(url: string): Promise<{ status: string | null; availableCount: number }> {
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
    
    // Wait for the element to be present
    await page.waitForSelector('.instock.availability', { timeout: 60000 });
    
    const result = await page.evaluate(() => {
      const element = document.querySelector('.instock.availability');
      if (!element) return null;
      
      const text = element.textContent || '';
      const match = text.match(/In stock \((\d+) available\)/);
      return {
        fullText: text.trim(),
        quantity: match ? parseInt(match[1], 10) : 0
      };
    });
    
    if (browser) {
      await browser.close();
    }
    return {
      status: result?.fullText || null,
      availableCount: result?.quantity || 0
    };
    
  } catch (error) {
    console.error("Error during scraping:", error);
    return { status: null, availableCount: 0 };
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

// Example of calling the function
(async () => {
  try {
    console.log("Starting scraper...");
    const url = "https://books.toscrape.com/catalogue/the-black-maria_991/index.html";
    const result = await checkStock(url);
    console.log("Stock Status:", result.status);
    console.log("Available Quantity:", result.availableCount);
  } catch (error) {
    console.error("Error:", error);
  }
})();
