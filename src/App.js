import React from "react";
import marked from "marked";

marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

const text = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: text,
    };
  }
  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }
  render() {
    return (
      <div className="d-flex flex-row justify-content-around align-items-center h-100 ">
        <div style={{ height: "60%", width: "40%" }}>
          <label className="font-weight-bold text-uppercase">Editor:</label>
          <textarea
            style={{ overflowY: "scroll" }}
            className="h-100 w-100"
            id="editor"
            value={this.state.input}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div style={{ height: "90%", width: "50%" }}>
          <label className="font-weight-bold text-uppercase">Previewer:</label>
          <div
            style={{ overflowY: "scroll", backgroundColor: "white" }}
            className="border border-dark h-100"
            id="preview"
            dangerouslySetInnerHTML={{ __html: marked(this.state.input, { renderer: renderer }) }}
          />
        </div>
      </div>
    );
  }
}

export default App;
