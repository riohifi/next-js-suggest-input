import React from "react";
declare type Tags = string[];
export interface NextTagInputProps {
    tags: Tags;
    onChange: (tags: Tags) => void;
    placeholder?: string;
    maxTags?: number;
    validator?: (val: string) => boolean;
    editable?: boolean;
    readOnly?: boolean;
    removeOnBackspace?: boolean;
    suggestions?: any;
}
interface State {
    input: string;
    suggestions: any;
}
export default class NextTagInput extends React.Component<NextTagInputProps, State> {
    state: {
        input: string;
        suggestions: string;
    };
    inputRef: React.RefObject<HTMLInputElement>;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    addTag: (value: string) => void;
    removeTag: (i: number) => void;
    updateTag: (i: number, value: string) => void;
    render(): JSX.Element;
}
export {};
