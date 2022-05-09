import { Form } from "react-bootstrap";

export default function SelectBoxAction(props){
    return(
        <>
            <Form.Control className="d-inline mx-2" as="select" defaultValue='default' onInput={(e)=>props.select_change(e.target.value)}>
            {props?.data.map((item, index)=>{
                return(
                    <option key={index} value={item.key} disabled={item.key==='default'}>{item.value}</option>
                )
            })}
            </Form.Control>
        </>
    )
}