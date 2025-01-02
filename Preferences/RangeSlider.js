import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const RangeSlider = () => {
  const [values, setValues] = useState([0, 100]);

  return (
    <View>
      <Slider
        value={values[0]}
        onValueChange={(value) => setValues([value, values[1]])}
        minimumValue={0}
        maximumValue={100}
      />
      <Slider
        value={values[1]}
        onValueChange={(value) => setValues([values[0], value])}
        minimumValue={0}
        maximumValue={100}
      />
      <Text>{`Range: ${values[0]} - ${values[1]}`}</Text>
    </View>
  );
};

export default RangeSlider;