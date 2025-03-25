import './ErrorBox.css'
import { BiSolidMessageAltError } from "react-icons/bi";

export default function ErrorBox({massage, left}) {
  return (
    <div className='main-massage-div' style={{left: left}}>
        <BiSolidMessageAltError />
        <p className='box-massage-text'>{massage}</p>
    </div>
  )
}
