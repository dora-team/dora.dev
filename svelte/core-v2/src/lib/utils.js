const sentenceCase = (input_string) => {
    let return_string = "";
    return_string += input_string[0].toUpperCase();
    return_string += input_string.substring(1);
    return return_string;
}

export { sentenceCase }