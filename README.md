# TextSplitter

Split an element with text into multiple elements containing words and chars.
Small < 2kb

## Installation

```bash
npm install @zachacious/textsplitter
```

## Usage

```javascript
import { TextSplitter } from "textsplitter";

/*All possible options*/
const options = {
  type: "word, char", // create word elements that contain character elements
  element: "div", // the new elements created will be divs
};

const myTextEls = TextSplitter.split("#text-el", options);

/* ...do some animation or something... */
/* myTextEls.words -> array of word elements */
/* myTextEls.chars -> array of char elements */

/* restore the original text element */
myTextEls.revert();
```
