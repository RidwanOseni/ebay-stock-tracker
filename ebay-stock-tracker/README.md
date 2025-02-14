eBay Stock Tracker

Description
The eBay Stock Tracker is a web scraping tool that utilizes OpenAI's AI capabilities to analyze HTML content from supplier websites and extract relevant data points such as stock status and quantity. The extracted data is then used to update an eBay store in real-time, ensuring that listings are accurate and competitive.

Installation Instructions

Clone the Repository:
   git clone https://github.com/yourusername/ebay-stock-tracker.git
   cd ebay-stock-tracker

Install Dependencies:

Make sure you have Node.js installed, then run:
   npm install

Set Up Environment Variables:

Create a .env file in the root directory and add your OpenAI API key:
   OPENAI_API_KEY=your_openai_api_key

Run the Application:

Start the application using:
   npm start

Usage

To use the eBay Stock Tracker, send a POST request to the /api/scraper endpoint with the following JSON body:
{
  "url": "https://supplier-website.com",
  "targets": [
    { "type": "stock", "description": "Stock status of the item" },
    { "type": "quantity", "description": "Quantity available" }
  ]
}

Example
curl -X POST http://localhost:3000/api/scraper -H "Content-Type: application/json" -d '{"url": "https://supplier-website.com", "targets": [{"type": "stock", "description": "Stock status of the item"}, {"type": "quantity", "description": "Quantity available"}]}'

Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Error Handling

If you encounter errors during scraping, such as:
Error in AI analysis: Unexpected token '`', "```json
{
"... is not valid JSON

This indicates that the AI response is not being parsed correctly. Ensure that the AI response is formatted as valid JSON without any extraneous characters.