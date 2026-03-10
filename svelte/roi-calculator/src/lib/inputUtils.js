/**
 * Strips invalid characters, handles multiple decimal points,
 * and manages the position of the minus sign.
 * @param {string} value - The raw input string
 * @returns {string} - The sanitized string
 */
export function sanitizeNumericInput(value) {
    // Strip non-numeric characters except decimal point and minus sign
    let raw = value.replace(/[^0-9.-]/g, '');
    
    // Handle multiple decimal points
    const parts = raw.split('.');
    if (parts.length > 2) {
        raw = parts[0] + '.' + parts.slice(1).join('');
    }

    // Handle minus sign only at the start
    if (raw.lastIndexOf('-') > 0) {
        raw = raw.charAt(0) === '-' ? '-' + raw.substring(1).replace(/-/g, '') : raw.replace(/-/g, '');
    }
    
    return raw;
}
