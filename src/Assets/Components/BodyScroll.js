import { useContext, useEffect, useState, useRef, useMemo  } from 'react';
import Picker from 'react-mobile-picker';
import './BodyScroll.css';
import DrawerContext from './DrawerContext';

function BodyScroll({ options }) {
  const [pickerValue, setPickerValue] = useState({
    single: options[0]
  })
  // due to a rerender
  const {setPassData, setComplete, passData, complete, setOption, option, handleSetSpecifics} = useContext(DrawerContext);
  // NOTE: no need for another useEffect possibly
  useEffect(() => {
    console.log('useEffect pickerValue: ', pickerValue);
    setPickerValue(pickerValue);
    const temp = pickerValue.single;
    console.log('temp outside: ', temp)
    // console.log('complete: ', complete);
    if (complete) {
      console.log('temp: ', temp);
      console.log('entering?', pickerValue.single);
      
      // setPassData(pickerValue.single); // no need for passData
      handleSetSpecifics(option, pickerValue.single);

      setComplete(false)
      // handleSetSpecifics(option, passData);
      // setOption(''); // CHECKING REPUT
    }
    
  // }, [complete, pickerValue, setPassData, setComplete, passData]);
}, []);

  console.log('pickerValue: ', pickerValue);


  // useEffect(() => {
  //   console.log('useEffect pickerValue: ', pickerValue);
  //   const temp =  pickerValue.single;
  //   console.log('temp outside: ', temp)
  //   setPassData('blargh');
  // }, [complete, pickerValue, setPassData, setComplete, passData]);
  // // console.log('noUSEEFFECT');
  // // console.log('pickerValue: ', pickerValue);
  return (
    <Picker value={pickerValue} onChange={(e)=> {
      console.log('e: ', e)
      setPickerValue(e)
      // setPassData(e);
      }}>
        <Picker.Column name='single'>
          {options.map(option => (
            <Picker.Item key={option} value={option}
            style={{
              backgroundColor: pickerValue.single === option ? 'lightgray' : 'transparent',
              borderRadius: '4px',
              padding: '10px',
            }}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
    </Picker>
  );
}

export default BodyScroll;

// function BodyScroll({ options }) {
//   const { setComplete, passData, complete, setOption, option, handleSetSpecifics } = useContext(DrawerContext);

// }

// export default BodyScroll;