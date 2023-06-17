import './box.css'
const Box=(props)=>{
    return <div className='hidden box' id={props.id}>{props.value}</div>
}
export default Box;