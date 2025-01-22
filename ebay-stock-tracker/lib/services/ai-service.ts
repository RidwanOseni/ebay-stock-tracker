import OpenAI from 'openai';
import { ScrapingTarget, AIAnalysisResponse } from '../types';

export class AIService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  async analyzePageStructure(html: string, targets: ScrapingTarget[]): Promise<AIAnalysisResponse | null> {
    try {
      if (!html) {
        throw new Error('HTML content is required');
      }
      if (!targets || targets.length === 0) {
        throw new Error('At least one scraping target is required');
      }

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert in web scraping and HTML analysis. Given an HTML structure, identify the most likely CSS selectors for specific data points. ONLY use standard CSS selectors (no jQuery selectors like :contains). Use class names, IDs, and element relationships that work in querySelector."
          },
          {
            role: "user",
            content: `Analyze this HTML and provide CSS selectors for the following data points: ${targets.map(t => t.description).join(', ')}. 
                     HTML Content: ${html}
                     Return ONLY a JSON object with the selectors and a confidence score. Use ONLY valid CSS selectors that work with querySelector.
                     Example format: {"selectors": {"stock": ".instock.availability", "price": ".price_color"}, "confidence": 0.95}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      }) as { choices: { message: { content: string } }[] };

      const content: string = response.choices?.[0]?.message?.content || '';
      console.log("Raw AI response:", content); // Log the raw response for debugging

      // Sanitize the response to remove unwanted formatting
      const sanitizedContent = content.replace(/```json|```/g, '').trim();

      // Check if the sanitized content is valid JSON
      try {
        const parsedResponse = JSON.parse(sanitizedContent);
        if (!parsedResponse || !parsedResponse.selectors) {
          throw new Error("Parsed response does not contain selectors");
        }
        return parsedResponse as AIAnalysisResponse;
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Failed to parse AI response as JSON");
      }

    } catch (error) {
      console.error("Error in AI analysis:", error instanceof Error ? error.message : error);
      return null;
    }
  }
} 