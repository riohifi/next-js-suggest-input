# Nextjs / React Tag Input With auto Suggest

## Import Package 
 ```javascript
 import NextTagInputProps from "next-js-suggest-input";
 ```
 ## import CSS inside _app.js
 ```javascript
 import "next-js-suggest-input/build/react-tag-input.css"
 ```

<br />

## Component `props`

| Property             | Type                          | Description                                          |
| -------------------- | ----------------------------- | ---------------------------------------------------- |
| `tags`               | `State`                       | useState                                             |
| `placeholder`        | `string`                      | Your Subject                                         |
| `maxTags`            | `number`                      | Total Number of tags                                 |
| `editable`           | `boolean`                     | `true / false`                                       |
| `readOnly`           | `boolean`                     | `true / false`                                       |
| `removeOnBackspace`  | `boolean`                     | `true / false`                                       |
| `suggestions`        | `object`                      | `["Apple",  "Mumbai", "Kolkata", "Banana"]`          |
| `onChange`           | `function<event>`             | `onChange` event handler for form elements           |
| `tagStyle`           | `JSX Style Components`        | ` background: '#ff0000', color: '#fff', fontSize: '.85em'`|

<br />

## Demo Example
```javascript
const example = () => {

    const [tags, setTags] = useState([])
    const suggestions = ["Apple", "Air", "Asia", "Mumbai", "Kolkata", "Banana"]
	
    // tag style
    const TStyle = { background: '#ff0000', color: '#fff', fontSize: '.85em' };

	return(
		<>
		 <NextTagInputProps
              tags={tags}
              placeholder="Your Subject"
              maxTags={10}
              editable={false}
              readOnly={false}
              removeOnBackspace={true}
              suggestions={suggestions}
              onChange={(newTags) => setTags(newTags)}
              tagStyle={TStyle}
          />
		</>
		)
}

export default example

```



