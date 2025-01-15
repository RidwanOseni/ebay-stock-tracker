const puppeteer = require("puppeteer");

async function checkStock(url: string): Promise<string | null> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    await page.goto(url, { timeout: 60000 });

    // Fetch stock availability status
    const stockStatus = await page.$eval(".instock.availability", (el: Element) => el.textContent);

    await browser.close();
    return stockStatus ? stockStatus.trim() : null; // Return trimmed status or null if not found
  } catch (error) {
    console.error("Error checking stock:", error);
    return null;
  }
}

module.exports = checkStock;

// Example of calling the function
(async () => {
  const url: string = "https://books.toscrape.com/"; // Define url as a string
  const stock = await checkStock(url);
  console.log("Stock Status:", stock);
})();
