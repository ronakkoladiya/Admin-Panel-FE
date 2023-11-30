interface TextFieldsProps{
    type?: string;
    label?: string;
    variant?: string;
    placeholder?: string;
    width?: string;
    autocomplete?: "off" | "on";
    value?: any;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    helperText?: string;
    textColor?: string;
    borderColor?: string;
    focusedBorderColor?: string;
    labelColor?: string;
    helperTextColor?: string;
    backgroundColor?: string;
    readOnly?: boolean;
    onChange?: any;
    sx?: any;
    onBlur?: any;
}

export default TextFieldsProps;