/**
 * A cache of the original text of each element.
 * for restoring the text after a split.
 */
const wordCache = {};

/**
 * Splits text into individual word and character elements.
 * @param {String} divString '#id' or '.class'
 * @param {Object} options
 * @param {String} options.type 'word' or 'char' or both
 * @param {String} options.element 'span' or 'div'
 * @returns {Object} result
 * @returns {Array} result.words A List of word elements.
 * @returns {Array} result.chars A List of character elements.
 * @returns {Function} result.revert Reverts the split text back to original.
 */
const split = (divString, options) => {
  const el = document.querySelector(divString);

  if (!el) {
    console.error(
      "SplitText: The supplied selector did not match any elements."
    );
    return;
  }

  const defaults = { type: "chars, words", element: "span" };
  const settings = Object.assign(defaults, options);
  const types = settings.type.split(",").map((t) => t.trim());
  let words;
  const wordDivs = [];
  const charDivs = [];
  if (types.includes("words")) {
    words = el.innerText.split(/\s+/);
    wordCache[divString] = el.innerText;
    el.innerText = "";
    for (let i = 0; i < words.length; i++) {
      const wordDiv = document.createElement(settings.element);
      wordDiv.classList.add("word");
      wordDiv.style.display = "inline-block";

      if (types.includes("chars")) {
        const chars = words[i].split("");
        for (let j = 0; j < chars.length; j++) {
          const charDiv = document.createElement(settings.element);
          charDiv.classList.add("char");
          charDiv.style.display = "inline-block";
          charDiv.innerText = chars[j];
          wordDiv.appendChild(charDiv);
          charDivs.push(charDiv);
        }
      } else {
        wordDiv.innerText = words[i];
      }

      el.appendChild(wordDiv);
      wordDivs.push(wordDiv);

      if (i < words.length - 1) {
        const space = document.createElement(settings.element);
        space.classList.add("space");
        const charDiv = document.createElement(settings.element);
        charDiv.classList.add("char");
        charDiv.style.display = "inline-block";
        charDiv.innerHTML = "&nbsp;";
        space.appendChild(charDiv);
        charDivs.push(charDiv);
        el.appendChild(space);
        wordDivs.push(space);
      }
    }
  }

  return {
    words: wordDivs,
    chars: charDivs,
    revert: () => RevertSplitText(divString),
  };
};

/**
 * Assuming the text has been split, this function will revert the text back to
 * its original state.
 * @param {String} divString '#id' or '.class'
 */
const revert = (divString) => {
  const el = document.querySelector(divString);
  if (!el) {
    console.error(
      "SplitText: The supplied selector did not match any elements."
    );
    return;
  }

  try {
    el.innerText = wordCache[divString];
  } catch (err) {
    console.error(
      `Please make sure you only call RevertSplitText on an element that has been split.`
    );
  }
};

export default split;
