interface APIError {
  message: string;
  status: number;
  url: string;
}

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: string;
  signature?: string;
}

const HOST = (import.meta.env.VITE_API_HOST as string);

export class APIManager {
  private static readonly API_KEY = (import.meta.env.VITE_API_KEY as string);
  
  /**
   * Базовый метод для выполнения HTTP запросов
   */
  private static async makeRequest<T>(options: RequestOptions): Promise<T> {
    const { method, url, body, signature } = options;
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'jjj': this.API_KEY
      };

      if (signature) {
        headers['Authorization'] = `signature_${signature}`;
      }

      const requestOptions: RequestInit = {
        method,
        headers,
      };

      if (body) {
        requestOptions.body = body;
      }

      const response = await fetch(`${HOST}${url}`, requestOptions);

      if (!response.ok) {
        const error: APIError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
          url: url
        };
        throw new Error(error.message);
      }

      // Для GET запросов с текстовым ответом
      if (method === 'GET' && url.includes('textable')) {
        const text = await response.text();
        const parsed = text
          .trim()
          .split('\n')
          .map(line => JSON.parse(line) as unknown);
        return parsed as T;
      }

      const result = await response.json() as unknown;
      return result as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  /**
   * Выполняет GET запрос к API
   */
  static async get<T = unknown>(url: string, signature: string): Promise<T> {
    return this.makeRequest<T>({ method: 'GET', url, signature });
  }

  /**
   * Выполняет GET запрос к API с текстовым ответом
   */
  static async getTextable(url: string, signature: string): Promise<unknown[]> {
    return this.makeRequest<unknown[]>({ method: 'GET', url, signature });
  }

  /**
   * Выполняет POST запрос к API
   */
  static async post<T = unknown>(url: string, jsondata: string, signature?: string): Promise<T> {
    return this.makeRequest<T>({ method: 'POST', url, body: jsondata, signature });
  }

  /**
   * Выполняет PUT запрос к API
   */
  static async put<T = unknown>(url: string, jsondata: string, signature: string): Promise<T> {
    return this.makeRequest<T>({ method: 'PUT', url, body: jsondata, signature });
  }

  /**
   * Выполняет DELETE запрос к API
   */
  static async delete<T = unknown>(url: string, signature: string): Promise<T> {
    return this.makeRequest<T>({ method: 'DELETE', url, signature });
  }
}
