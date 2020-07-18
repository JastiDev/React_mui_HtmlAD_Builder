import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

let EMPTY_DELTA = { ops: [] };

export class MyInnerHtmlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "snow",
      enabled: true,
      readOnly: false,
      value: EMPTY_DELTA,
      events: [],
    };
  }

  formatRange(range) {
    return range ? [range.index, range.index + range.length].join(",") : "none";
  }

  onEditorChange = (value, delta, source, editor) => {
    console.log(editor.getHTML());
    this.setState({
      value: editor.getContents(),
      events: [`[${source}] text-change`, ...this.state.events],
    });
  };

  onEditorChangeSelection = (range, source) => {
    this.setState({
      selection: range,
      events: [
        `[${source}] selection-change(${this.formatRange(
          this.state.selection
        )} -> ${this.formatRange(range)})`,
        ...this.state.events,
      ],
    });
  };

  onEditorFocus = (range, source) => {
    this.setState({
      events: [`[${source}] focus(${this.formatRange(range)})`].concat(
        this.state.events
      ),
    });
  };

  onEditorBlur = (previousRange, source) => {
    this.setState({
      events: [`[${source}] blur(${this.formatRange(previousRange)})`].concat(
        this.state.events
      ),
    });
  };

  onToggle = () => {
    this.setState({ enabled: !this.state.enabled });
  };

  onToggleReadOnly = () => {
    this.setState({ readOnly: !this.state.readOnly });
  };

  onSetContents = () => {
    this.setState({ value: "This is some <b>fine</b> example content" });
  };

  render() {
    return (
      <div>
        {/* {this.renderToolbar()}
        <hr />
        {this.renderSidebar()} */}
        {this.state.enabled && (
          <ReactQuill
            theme={this.state.theme}
            value={this.state.value}
            readOnly={this.state.readOnly}
            onChange={this.onEditorChange}
            onChangeSelection={this.onEditorChangeSelection}
            onFocus={this.onEditorFocus}
            onBlur={this.onEditorBlur}
          />
        )}
      </div>
    );
  }

  renderToolbar() {
    var state = this.state;
    var enabled = state.enabled;
    var readOnly = state.readOnly;
    var selection = this.formatRange(state.selection);
    return (
      <div>
        <button onClick={this.onToggle}>
          {enabled ? "Disable" : "Enable"}
        </button>
        <button onClick={this.onToggleReadOnly}>
          Set {readOnly ? "read/Write" : "read-only"}
        </button>
        <button onClick={this.onSetContents}>
          Fill contents programmatically
        </button>
        <button disabled={true}>Selection: ({selection})</button>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div style={{ overflow: "hidden", float: "right" }}>
        <textarea
          style={{ display: "block", width: 300, height: 300 }}
          value={JSON.stringify(this.state.value, null, 2)}
          readOnly={true}
        />
        <textarea
          style={{ display: "block", width: 300, height: 300 }}
          value={this.state.events.join("\n")}
          readOnly={true}
        />
      </div>
    );
  }
}
