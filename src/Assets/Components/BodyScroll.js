import { useContext, useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import './BodyScroll.css';
import DrawerContext from './DrawerContext';

function BodyScroll({ options }) {
  const [pickerValue, setPickerValue] = useState(options[0]);
  // use pickerValue
  // when complete is selected save passData
  const {passData, setPassData, setComplete,  complete} = useContext(DrawerContext);
  useEffect(() => {
    console.log('useEffect pickerValue: ', pickerValue);
    console.log('complete: ', complete);

    if (complete) {
      setPassData(pickerValue);
      setComplete(false)
    }
    
  }, [complete, pickerValue, setPassData, setComplete]);
  console.log('pickerValue: ', pickerValue);

  return (
    <Picker value={pickerValue} onChange={setPickerValue} onValueChange={ value => setPickerValue(value)}>
      <Picker.Column name="single">
        {options.map(option => (
          <Picker.Item
            key={option}
            value={option}
            style={{
              backgroundColor: pickerValue.single === option ? 'lightgray' : 'transparent',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            {option}
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  );
}

export default BodyScroll;