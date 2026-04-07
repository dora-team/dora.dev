export const recode_numeric_range = (
    input_value: string | number,
    input_min: string | number,
    input_max: string | number,
    output_min: string | number,
    output_max: string | number,
): number | null => {
    const val = typeof input_value === 'string' ? parseInt(input_value, 10) : input_value;
    const iMin = typeof input_min === 'string' ? parseInt(input_min, 10) : input_min;
    const iMax = typeof input_max === 'string' ? parseInt(input_max, 10) : input_max;
    const oMin = typeof output_min === 'string' ? parseInt(output_min, 10) : output_min;
    const oMax = typeof output_max === 'string' ? parseInt(output_max, 10) : output_max;

    if (val >= iMin && val <= iMax) {
        return (
            ((val - iMin) / (iMax - iMin)) *
            (oMax - oMin) +
            oMin
        );
    } else {
        return null;
    }
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
    if (typeof import.meta.env.MODE !== "undefined" && import.meta.env.MODE === "development") {
        console.debug(`(sendAnalyticsEvent disabled in dev environment)`)
    } else if (typeof gtag !== 'undefined') {
        gtag('event', eventName);
    }
}

export const numberToWord = (num: number): string => {
    const words = [
        "zero", "one", "two", "three", "four", "five", 
        "six", "seven", "eight", "nine", "ten"
    ];
    return words[num] || num.toString();
}
