/**
 * Форматирует число, добавляя запятые для разделения тысяч
 * @param num - число для форматирования
 * @returns отформатированная строка с запятыми
 * 
 * @example
 * formatNumber(1000) // "1,000"
 * formatNumber(10000) // "10,000"
 * formatNumber(100000) // "100,000"
 * formatNumber(1234567) // "1,234,567"
 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }
  
  return num.toLocaleString('en-US');
}
