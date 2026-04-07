export const clamp = (val: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, val));

export const recode_numeric_range = (
    input_value: string | number,
    input_min: number,
    input_max: number,
    output_min: number,
    output_max: number,
): number => {
    const val = typeof input_value === 'string' ? parseInt(input_value, 10) : input_value;
    if (isNaN(val) || val === -1) return output_min;

    const clampedVal = clamp(val, Math.min(input_min, input_max), Math.max(input_min, input_max));
    
    return (
        ((clampedVal - input_min) / (input_max - input_min)) *
        (output_max - output_min) +
        output_min
    );
};

export const arrayAverage = (array: (number | string)[]): number | null => {
    if (array.length) { 
        return array.reduce((a: number, b: number | string) => a + parseFloat(b.toString()), 0) / array.length 
    } else { 
        return null 
    }
}

declare const gtag: Function | undefined;

export const sendAnalyticsEvent = (eventName: string): void => {
    console.debug(`send "${eventName}" event to GA`)
    if (typeof import.meta.env.MODE !== 'undefined' && import.meta.env.MODE === 'development') {
        console.debug(`(sendAnalyticsEvent disabled in dev environment)`)
    } else if (typeof gtag !== 'undefined') {
        gtag('event', eventName);
    }
}

export const numberToWord = (num: number): string => {
    const words = [
        'zero', 'one', 'two', 'three', 'four', 'five', 
        'six', 'seven', 'eight', 'nine', 'ten'
    ];
    return words[num] || num.toString();
}
