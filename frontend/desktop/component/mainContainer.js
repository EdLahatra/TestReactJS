import React from 'react';
import InputText from './input/text'
import CommonMainContainer, { reduxConnect } from 'common/component/mainContainer';

class MainContainer extends CommonMainContainer {
  itemSelcted() {
    let numeric = [];
    let qcm = [];
    let date = [];
    if (this.props.list.length) {
      const listItem = CommonMainContainer.checkTypeItem(this.props.current);
      if (listItem.numeric) {
        numeric = (<div>
          <p> { listItem.numeric.label } </p>
          <p>Resultat : { listItem.numeric.result } </p>
        </div>);
      }
      if (listItem.qcm && listItem.qcm.result) {
        const itemQcm = [];
        Object.keys(listItem.qcm.result).forEach((item, key) => {
          itemQcm.push(
            <div key={`key #${key + 1}`}>
              <input type="checkbox" />
              <span>{`${item} est : `}</span>
              <span>{listItem.qcm.result[item]}</span>
            </div>,
          );
        });
        qcm = (
          <div>
            <p> { listItem.qcm.label } </p>
            { itemQcm }
          </div>
        );
      }
      if (listItem.date && listItem.date.result) {
        date = (
          <div>
            <p> { listItem.date.label } </p>
            {
              listItem.date.result.map((item, key) => (
                <p key={`date #${key + 1}`}>
                  <input type="radio" value={item} name="indoor-outdoor" /> {item}
                </p>
              ))
            }
          </div>
        );
      }
    }
    return (
      <div>
        {qcm}
        {numeric}
        {date}
      </div>
    );
  }

  listCodeWithName() {
    let list = null;
    if (this.props.list.length) {
      list = this.props.list.map(item => (
        <div key={item.code}>
          <div tabIndex={item.code} onClick={() => this.selectItem(item.code)} role="menuitem">
            <span>{item.name}</span>
            <span>{item.code}</span>
          </div>
          {item.code === this.state.code ? this.itemSelcted() : null}
        </div>
      ));
    }
    return list;
  }

  render() {
    return (
      <div id="main-container">
        <InputText onChange={this.onSearch} value={this.state.search} />
        {this.listCodeWithName()}
      </div>
    );
  }
}

export default reduxConnect(MainContainer);
