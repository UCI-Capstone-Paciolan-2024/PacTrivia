import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";

export default function SelectionDropdown(props: {
  options: string[];
  onSelection: (selection: string) => void;
}) {
  const [value, setValue] = useState<string>("null");
  const [isFocus, setIsFocus] = useState(false);

  // convert the options into the format that the Dropdown component expects
  const options = props.options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      data={options}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      labelField={"label"}
      valueField={"label"}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    margin: 5,
    width: 250
  },
});
