interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class OpenRouterAPI {
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  async generateContent(
    prompt: string, 
    systemPrompt: string, 
    apiKey: string,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    } = {}
  ): Promise<string> {
    if (!apiKey.trim()) {
      throw new Error('API key is required. Please configure your OpenRouter API key in settings.');
    }

    const {
      model = 'openai/gpt-4o-mini',
      temperature = 0.7,
      maxTokens = 2000
    } = options;

    const messages: OpenRouterMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ];

    const requestBody: OpenRouterRequest = {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Premio - SEO Optimization Toolkit'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenRouter API key in settings.');
        } else if (response.status === 402) {
          throw new Error('Insufficient credits. Please check your OpenRouter account balance.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else {
          throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }
      }

      const data: OpenRouterResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response generated. Please try again.');
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to generate content. Please check your internet connection and try again.');
    }
  }

  // Specific method for SEO content generation
  async generateSEOContent(prompt: string, apiKey: string): Promise<string> {
    const systemPrompt = `You are an expert SEO content writer and digital marketing specialist. Create high-quality, engaging, and SEO-optimized content that ranks well in search engines. Always focus on:

1. Natural keyword integration
2. Reader engagement and value
3. Proper structure with headings
4. Clear, compelling writing
5. Search intent fulfillment

Respond with well-structured, professional content that provides genuine value to readers.`;

    return this.generateContent(prompt, systemPrompt, apiKey, {
      model: 'openai/gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 3000
    });
  }

  // Method for humanizing AI content
  async humanizeContent(content: string, apiKey: string): Promise<string> {
    const systemPrompt = `You are an expert content editor specializing in making AI-generated text sound more natural and human-written. Your task is to:

1. Remove overly formal or robotic language
2. Add natural flow and conversational elements
3. Vary sentence structure and length
4. Include subtle imperfections that make content feel authentic
5. Maintain the core message while improving readability
6. Add personality and human touches
7. Remove repetitive AI patterns

Return content that feels naturally written by a skilled human writer.`;

    const prompt = `Please humanize this content to make it sound more natural and engaging:\n\n${content}`;

    return this.generateContent(prompt, systemPrompt, apiKey, {
      model: 'openai/gpt-4o-mini',
      temperature: 0.8,
      maxTokens: 3000
    });
  }

  // Method for generating keywords
  async generateKeywords(seedKeyword: string, apiKey: string): Promise<string> {
    const systemPrompt = `You are an expert SEO keyword researcher. Your task is to generate a list of semantically related keywords based on a seed keyword. The list should be plain text, with each keyword on a new line. Do not use any formatting, titles, or categories.`;

    const prompt = `Generate a raw list of 50-100 SEO keywords related to: "${seedKeyword}". The output should be a simple, unformatted list of keywords, with each keyword on a new line.`;

    return this.generateContent(prompt, systemPrompt, apiKey, {
      model: 'openai/gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1500
    });
  }
}

export const openRouterAPI = new OpenRouterAPI();
