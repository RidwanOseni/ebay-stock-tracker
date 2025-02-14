import { updateEbayStore } from './update-store'; // Import the function to be tested
import { ScrapingTarget } from './types'; // Ensure you import the correct type

async function testUpdateStore() {
  const url = 'https://books.toscrape.com/catalogue/the-black-maria_991/index.html'; // Test URL

  // Prepare the targets for the updateEbayStore function
  const targets: ScrapingTarget[] = [
    { type: 'stock', description: 'In stock (19 available)' },
    { type: 'price', description: '£52.15' }
  ];

  try {
    // Call the updateEbayStore function with the URL and targets
    await updateEbayStore(url, targets);
    console.log('Update process completed successfully.');
  } catch (error) {
    console.error('Error during update process:', error);
  }
}

testUpdateStore();
