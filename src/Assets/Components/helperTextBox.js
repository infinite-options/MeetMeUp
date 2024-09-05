import '../../App.css';
import questionMark from '../Images/questionMarkBox.png';

export default function helperTextBox({ text }) {
    return (
        <div className='helper-text-box'>
            <img src={questionMark} alt='questionmark'/>
            <div className='helper-text-box-text'>
                {text}
            </div>
        </div>
    )
}