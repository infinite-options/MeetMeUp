import { useContext, useEffect, useState, useRef, useMemo  } from 'react';
import Picker from 'react-mobile-picker';
import './BodyScroll.css';
import DrawerContext from './DrawerContext';

function BodyScroll({ options }) {
  const [pickerValue, setPickerValue] = useState({single: options[Math.floor(options.length/2)]})
  const [hoveredOption, setHoveredOption] = useState(null);
  // due to a rerender
  const scrollCooldownRef = useRef(false);
  const {setPassData, setComplete, passData, complete, setOption, option, handleSetSpecifics} = useContext(DrawerContext);
 const handleWheelScroll = (e) => {
    
    if (scrollCooldownRef.current) return;  // If still in cooldown, it will ignore the event

    const currentIndex = options.indexOf(pickerValue.single);
    const scrollThreshold = 1;  // Will control sensitivity, Higher Value = Slower scroll

    // Prevent further scrolling for a short time (So that it is smooth)
    scrollCooldownRef.current = true;
    setTimeout(() => {
      scrollCooldownRef.current = false;
    }, 150); // Throttle duration
    //e.deltaY is used to track the position -> Negative e.deltaY == user scrolled up else down
    if (e.deltaY > scrollThreshold && currentIndex < options.length - 1) {
      //console.log(e.deltaY);
      setPickerValue({ single: options[currentIndex + 1] });
    } else if (e.deltaY < -scrollThreshold && currentIndex > 0) {
      setPickerValue({ single: options[currentIndex - 1] });
    }
  };
  // NOTE: no need for another useEffect possibly
//   useEffect(() => {
//     console.log('useEffect pickerValue: ', pickerValue);
//     setPickerValue(pickerValue);
//     const temp = pickerValue.single;
//     console.log('temp outside: ', temp)
//     // console.log('complete: ', complete);
//     if (complete) {
//       console.log('temp: ', temp);
//       console.log('entering?', pickerValue.single);
      
//       // setPassData(pickerValue.single); // no need for passData
//       handleSetSpecifics(option, pickerValue.single);

//       setComplete(false)
//       // handleSetSpecifics(option, passData);
//       // setOption(''); // CHECKING REPUT
//     }
    
//   // }, [complete, pickerValue, setPassData, setComplete, passData]);
// }, []);

  // if (complete) {
    //       console.log('temp: ', temp);
    //       console.log('entering?', pickerValue.single);
          
    //       // setPassData(pickerValue.single); // no need for passData
          // handleSetSpecifics(option, pickerValue.single);
  //         setComplete(false)
  // }

  // its complete that causes the rerender
  // if (option) {
  //   console.log(pickerValue.single)
  //   // handleSetSpecifics(option, pickerValue.single)
  // }
//CHANGES - DARSHIT
  const handleMouseEnter = (option) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };
///
  const handlePickerChange = (value) => {
    setPickerValue(value)
    console.log(value)
    
    if (option) {
      handleSetSpecifics(option, value.single)
      setComplete(false);
      setOption('');
    }
    // handleSetSpecifics(option, value.single); 
  };
  // if (option) {
  //   handleSetSpecifics(option, pickerValue.single)
  //   setComplete(false);
  // }
  //console.log('pickerValue: ', pickerValue);

  // useEffect(() => {
  //   console.log('useEffect pickerValue: ', pickerValue);
  //   const temp =  pickerValue.single;
  //   console.log('temp outside: ', temp)
  //   setPassData('blargh');
  // }, [complete, pickerValue, setPassData, setComplete, passData]);
  // // console.log('noUSEEFFECT');
  // // console.log('pickerValue: ', pickerValue);

  return (
    <Picker className='picker-container' style={{ width: '250px'}} value={pickerValue} onChange={handlePickerChange}  onWheel={handleWheelScroll}>
        <Picker.Column name='single'>
          {options.map(option => (
           <Picker.Item
           key={option}
           value={String(option)}
           style={{
             backgroundColor: hoveredOption === option ? 'lightgray' : 'transparent',
             padding: '10px',
             cursor: 'pointer',
             boxShadow: '0px -1px 0px 0px gray, 0px 1px 0px 0px gray',
           }}
           onClick={() => handlePickerChange({ single: option })} onMouseEnter={() => handleMouseEnter(option)} // Handle mouse enter
            onMouseLeave={handleMouseLeave}>
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