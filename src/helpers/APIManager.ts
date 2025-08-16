interface APIError {
  message: string;
  status: number;
  url: string;
}

const HOST = 'https://thekeeper.tech'

export class APIManager {
  private static readonly API_KEY = "i02KOB2UAQZ8DkuR";
  
  /**
   * Выполняет GET запрос к API
   * @param url - URL для запроса
   * @param signature - Подпись для авторизации
   * @returns Promise с данными ответа
   */
  static async get<T = any>(url: string, signature: string): Promise<T> {
    try {
      const response = await fetch(`${HOST}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `signature_${signature}`,
          'jjj': this.API_KEY
        }
      });

      if (!response.ok) {
        const error: APIError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
          url: url
        };
        throw error;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Выполняет GET запрос к API
   * @param url - URL для запроса
   * @param signature - Подпись для авторизации
   * @returns Promise с данными ответа
   */
  static async getTextable(url: string, signature: string): Promise<any[]> {
    try {
      const response = await fetch(`${HOST}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `signature_${signature}`,
          'jjj': this.API_KEY
        }
      });

      if (!response.ok) {
        const error: APIError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
          url: url
        };
        throw error;
      }
      const text = await response.text()
      const result = text
        .trim()
        .split('\n')
        .map(line => JSON.parse(line));
      // const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Выполняет POST запрос к API
   * @param url - URL для запроса
   * @param jsondata - JSON данные для отправки
   * @param signature - Подпись для авторизации
   * @returns Promise с данными ответа
   */
  static async post<T = any>(url: string, jsondata: string, signature?: string): Promise<T> {
    try {
      const response = await fetch(`${HOST}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `signature_${signature}`,
          'jjj': this.API_KEY
        },
        body: jsondata
      });

      if (!response.ok) {
        const error: APIError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
          url: url
        };
        throw error;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  /**
   * Выполняет PUT запрос к API
   * @param url - URL для запроса
   * @param jsondata - JSON данные для отправки
   * @param signature - Подпись для авторизации
   * @returns Promise с данными ответа
   */
  static async put<T = any>(url: string, jsondata: string, signature: string): Promise<T> {
    console.log(`send PUT to ${url} with data: ${jsondata}`);

    try {
      const response = await fetch(`${HOST}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `signature_${signature}`,
          'jjj': this.API_KEY
        },
        body: jsondata
      });

      if (!response.ok) {
        const error: APIError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
          url: url
        };
        throw error;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  /**
   * Выполняет DELETE запрос к API
   * @param url - URL для запроса
   * @param signature - Подпись для авторизации
   * @returns Promise с данными ответа
   */
  static async delete<T = any>(url: string, signature: string): Promise<T> {
    console.log(`send DELETE to ${url}`);

    try {
      const response = await fetch(`${HOST}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `signature_${signature}`,
          'jjj': this.API_KEY
        }
      });

      if (!response.ok) {
        const error: APIError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
          url: url
        };
        throw error;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}
