import React from "react";
import {Tag} from "./components/Tag";
import {classSelectors} from "./utils/selectors";

type Tags = string[];

export interface NextTagInputProps {
  tags: Tags;
  onChange: (tags: Tags) => void;
  placeholder?: string;
  maxTags?: number;
  validator?: (val: string) => boolean;
  editable?: boolean;
  readOnly?: boolean;
  removeOnBackspace?: boolean;
  suggestions?: any
}

interface State {
  input: string;
  suggestions: any;
}

export default class NextTagInput extends React.Component<NextTagInputProps, State> {

  state = { input: "", suggestions: "" };

  // Ref for input element
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  }

  onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    const { input } = this.state;
    const { validator, removeOnBackspace, suggestions } = this.props;

    var value = input.toLowerCase();
        value = value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    var queryRegExp = new RegExp('^' + value, 'i');

    const suggest = suggestions.filter(function(item:any) { return queryRegExp.test(item); })
    
    if(value.length > 0) this.setState({ suggestions: suggest.toString() });
    // console.log(suggest)
    // On enter
    if (e.keyCode === 13 || e.keyCode === 188) {

      // Prevent form submission if tag input is nested in <form>
      e.preventDefault();

      // If input is blank, do nothing
      if (input === "") {this.setState({ suggestions: "" }); return; }

      // Check if input is valid
      const valid = validator !== undefined ? validator(input) : true;
      if (!valid) {
        return;
      }

      // Add input to tag list
      this.addTag(input);

    }
    // On backspace or delete
    else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {

      // If currently typing, do nothing
      if (input !== "") {
        return;
      }

      // If input is blank, remove previous tag
      this.removeTag(this.props.tags.length - 1);

    }

  }

  addTag = (value: string) => {
    const tags = [ ...this.props.tags ];
    tags.push(value);
    this.props.onChange(tags);
    this.setState({ input: "", suggestions: "" });
  }

  removeTag = (i: number) => {
    const tags = [ ...this.props.tags ];
    tags.splice(i, 1);
    this.props.onChange(tags);
    this.setState({ suggestions: "" });
  }

  updateTag = (i: number, value: string) => {
    const tags = [...this.props.tags];
    tags[i] = value;
    this.props.onChange(tags);
  }

  render() {

    const { input } = this.state;

    const { tags, placeholder, maxTags, editable, readOnly, validator, removeOnBackspace } = this.props;

    const maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;

    const isEditable = readOnly ? false : (editable || false);

    const showInput = !readOnly && !maxTagsReached;

    return (
      <div className={classSelectors.wrapper}>
        {tags.map((tag, i) => (
          <Tag
            key={i}
            value={tag}
            index={i}
            editable={isEditable}
            readOnly={readOnly || false}
            inputRef={this.inputRef}
            update={this.updateTag}
            remove={this.removeTag}
            validator={validator}
            removeOnBackspace={removeOnBackspace}
          />
        ))}
        {showInput &&
          <input
            ref={this.inputRef}
            value={input}
            className={classSelectors.input}
            placeholder={placeholder || "Type and press enter"}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyDown}
          />
        }
        <div id="complete">{this.state.suggestions ? this.state.suggestions : ''}</div>
      </div>
    );

  }

}
