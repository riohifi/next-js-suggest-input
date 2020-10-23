# React Tag Input With auto Suggest

 import ReactTagInput from "next-js-suggest-input";
 import "next-js-suggest-input/build/react-tag-input.css"


const [tags, setTags] = useState([])

const suggestions = ["Apple", "Air", "Asia", "Mumbai", "Kolkata", "Banana"]

const example = () => {
	
	return(
		<>
		 <ReactTagInput
              tags={tags}
              placeholder="Your Subject"
              maxTags={10}
              editable={false}
              readOnly={false}
              removeOnBackspace={true}
              suggestions={suggestions}
              onChange={(newTags) => setTags(newTags)}
          />
		</>
		)
}

export default example

