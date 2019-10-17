import {html, render} from './node_modules/lit-html/lit-html.js';

// Simple state
let state = {
  counter: 0,
  classname: 'default',
  items: [],
};

// Handle history by html5 history api
history.pushState(state, "index", "index.html");

// Event Callback
const clickHandler = {
  // Required object function
  handleEvent( e ){


    // Update data model
    state.counter++;
    state.items.push('Number: ' + state.counter);

    // History update on interaction
    history.pushState(state, "index", "index.html");


    if (state.counter < 10 ) {
      render(pageTemplate('World', state), document.body);
    }
    else {
      state.classname = 'highlight';
      render(pageTemplate('Daniel', state), document.body);
    }
  }
};

// Define List
const itemList = (state) => html`
  <ul>
    ${state.items.map((item) => html`<li>${item}</li>`)}
  </ul>
`;

// Define a template
const pageTemplate = (name, state) => html`
<main>
  <h2 class="${state.classname}">Hello ${name}</h2>
  <button @click=${clickHandler}>${state.counter}x clicked</button>
  <div>${itemList(state)}</div>
</main>
`;

// Render the template to the document
render(pageTemplate('World', state), document.body);

// History event listener
window.onpopstate = function(event) {
  state = event.state;
  render(pageTemplate('World', state), document.body);
};
