import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal, CheckBox,
} from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import CommonMainContainer, { reduxConnect } from 'common/component/mainContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const stylesModal = StyleSheet.create({
  cancelButton: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelTextButton: {
    padding: 5,
    color: '#777',
  },
  container: {
    backgroundColor: '#f1f1f1',
    width: '90%',
    maxWidth: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    position: 'relative',
    zIndex: 0,
    paddingBottom: 20,
    alignSelf: 'baseline',
    marginTop: '20%',
  },
  detail: {
    backgroundColor: '#f1f1f1',
    width: '90%',
    maxWidth: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    position: 'relative',
    zIndex: 0,
    paddingBottom: 20,
    alignSelf: 'baseline',
    marginTop: '15%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: '#3c96e4',
    fontWeight: 'bold',
  },
});

class MainContainer extends CommonMainContainer {
  itemSelcted() {
    let numeric = [];
    let qcm = [];
    let date = [];
    if (this.props.list.length) {
      const listItem = CommonMainContainer.checkTypeItem(this.props.current);
      if (listItem.numeric) {
        numeric = (<View>
          <Text> { listItem.numeric.label } </Text>
          <Text>Resultat : { listItem.numeric.result } </Text>
        </View>);
      }
      if (listItem.qcm && listItem.qcm.result) {
        const itemQcm = [];
        Object.keys(listItem.qcm.result).forEach((item, key) => {
          itemQcm.push(
            <View key={`key #${key + 1}`}>
              <CheckBox
                title={`${item} est : {listItem.qcm.result[item]}`}
                checked={this.state.checked}
              />
              <Text>{`${item} est : ${listItem.qcm.result[item]}`}</Text>
            </View>,
          );
        });
        qcm = (
          <View>
            <Text> { listItem.qcm.label } </Text>
            { itemQcm }
          </View>
        );
      }
      if (listItem.date && listItem.date.result) {
        date = (
          <View style={styles.container}>
            <Text> { listItem.date.label } </Text>
            <RadioGroup
              onSelect={(index, value) => this.onSelect(index, value)}
            >
              {
                listItem.date.result.map((item, key) => (
                  <RadioButton value={item} key={`date #${key + 1}`} >
                    <Text>{item}</Text>
                  </RadioButton>
                ))
              }
            </RadioGroup>
            <Text style={styles.text}>{this.state.date}</Text>
          </View>
        );
      }
    }
    return (
      <View>
        {qcm}
        {numeric}
        {date}
      </View>
    );
  }

  listCodeWithName() {
    let list = null;
    if (this.props.list.length) {
      list = this.props.list.map(item => (
        <View key={item.code}>
          <TouchableOpacity
            tabIndex={item.code}
            onPress={() => this.selectItem(item.code)}
            role="menuitem"
          >
            <Text>{`${item.name}  ${item.code}`}</Text>
          </TouchableOpacity>
        </View>
      ));
    }
    return list;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>React Native Test in Bocasay</Text>
        <ScrollView>
          {this.listCodeWithName()}
        </ScrollView>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.isOpen}
          onRequestClose={this.closeModal}
        >
          <View style={stylesModal.overlay} >
            <ScrollView style={{ marginBottom: 10 }}>
              <View style={stylesModal.detail}>
                <Text style={stylesModal.title}>Detail</Text>
                {this.state.code ? this.itemSelcted() : null}
              </View>
            </ScrollView>
            <TouchableOpacity style={stylesModal.cancelButton} onPress={this.closeModal}>
              <Text style={stylesModal.cancelTextButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default reduxConnect(MainContainer);
