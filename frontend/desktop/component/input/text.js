import React from 'react';
import CommonInputText from 'common/component/input/text';

class InputText extends CommonInputText {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.onChangeText}
      />
    );
  }
}

export default InputText;
