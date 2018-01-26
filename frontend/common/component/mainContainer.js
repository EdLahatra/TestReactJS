import { Component } from 'react';
import { connect } from 'react-redux';
import { getList, getItem, onSearch } from '../actions/list';

//
// Module MainContainer
//

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      isOpen: false,
      date: null,
    };
    this.selectItem = this.selectItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillMount() {
    this.props.getList();
  }

  onSearch(search) {
    if (search.trim().length) {
      this.props.onSearch(this.searchFor(search.trim()));
    }
  }

  onSelect(index, value) {
    this.setState({
      data: `Selected index: ${index} , date: ${value}`,
    });
  }

  itemExists(objects, objet) {
    objects.map(key => this.compareObjects(key, objet));
  }


  closeModal() {
    this.setState({ isOpen: false });
  }

  selectItem(code) {
    if (code === this.state.code) {
      this.setState({ code: null, isOpen: false });
      return;
    }
    this.setState({ code, isOpen: true });
    this.props.getItem(code);
  }

  static checkTypeItem(elements) {
    const item = {};
    elements.forEach((element) => {
      if (element.type === 'qcm') {
        item.qcm = element;
      } else if (element.type === 'numeric') {
        item.numeric = element;
      } else if (element.type === 'date') {
        item.date = element;
      }
    });
    return item;
  }

  // eslint-disable-next-line no-console
  compareObjects(object1, object2) {
    let k = '';
    for (k in object1) return (object1[k] == object2[k]);
    for (k in object2) return (object1[k] == object2[k]);
  }

  searchFor(toSearch) {
    const results = [];
    const objects = this.props.list;
    objects.forEach((object) => {
      for (const key in object) {
        if (object[key].indexOf(toSearch) != -1) {
          if (!this.itemExists(results, object)) results.push(object);
        }
      }
    });
    return results;
  }
}

export default MainContainer;

//
// Redux connection
//

const mapStateToProps = state => ({
  list: state.list.data,
  current: state.list.current,
});

const mapDispatchToProps = dispatch => ({
  getList: () => {
    dispatch(getList());
  },
  getItem: (code) => {
    dispatch(getItem(code));
  },
  onSearch: (data) => {
    dispatch(onSearch(data));
  },
});

export const reduxConnect = component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
