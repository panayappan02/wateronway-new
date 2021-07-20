import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {NavigationBar} from '../../components';
import {COLORS, FONTFAMIY} from '../../constants';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

const dropdownItems = [
  {
    label: 'Ground Floor',
    value: 0,
  },
  {
    label: '1St Floor',
    value: 1,
  },
  {
    label: '2nd Floor',
    value: 2,
  },
  {
    label: 'Above 2nd Floor',
    value: 3,
  },
];

const AddNewAddress = () => {
  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);

  function renderDropdownItem(item) {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <View style={styles.formContainer}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput label="FULL NAME" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput label="MOBILE NUMBER" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="FLAT / HOUSE NO / BUILDING"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput label="AREA / COLONY / STREET" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput label="LAND MARK" style={styles.input} />
          </View>

          <View style={styles.inputContainer}>
            <Dropdown
              data={dropdownItems}
              style={styles.dropdown}
              placeholder="SELECT ITEM"
              placeholderStyle={{
                fontSize: 15.5,
                color: COLORS.gray,
              }}
              fontFamily={FONTFAMIY.TTCommonsRegular}
              searchPlaceholder="Search"
              labelField="label"
              valueField="value"
              value={dropdown}
              onChange={item => {
                setDropdown(item.value);
              }}
              renderItem={item => renderDropdownItem(item)}
              maxHeight={200}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  function renderSaveBtn() {
    return (
      <View>
        <View></View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar label="Adding Shipping Address" />
      {renderForm()}
      {renderSaveBtn()}
    </SafeAreaView>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formContainer: {
    paddingHorizontal: '5%',
  },
  inputContainer: {
    marginTop: '5%',
  },
  input: {
    backgroundColor: COLORS.white,
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: COLORS.lightGray3,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: '2%',
    marginTop: 20,
    paddingHorizontal: '3%',
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 15.5,
    color: COLORS.black1,
    fontFamily: FONTFAMIY.TTCommonsRegular,
  },
});
