export const recode_numeric_range = (
    input_value,
    input_min,
    input_max,
    output_min,
    output_max,
) => {
    input_value = parseInt(input_value);
    input_min = parseInt(input_min);
    input_max = parseInt(input_max);
    output_min = parseInt(output_min);
    output_max = parseInt(output_max);

    if (input_value >= input_min && input_value <= input_max) {
        return (
            ((input_value - input_min) / (input_max - input_min)) *
            (output_max - output_min) +
            output_min
        );
    } else {
        return null;
    }
};

export const arrayAverage = (array) => {
    if (array.length) { return array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / array.length } else { return null }
}