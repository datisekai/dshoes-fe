import { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { productURL } from "../../../api/Admin/config";
import { toast } from "react-toastify";

export default function FormAddType(props) {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  useEffect(() => {
    async function getType() {
      const res = await axios.get(`${productURL}/types/all`);
      setTypes(res.data.types);
      console.log(res.data.types);
    }
    getType();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (type === "") {
      toast.warning("Please choose type", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    if (props.type === "add") addType();
    else removeType();
  };
  const addType = async () => {
    // let isValid = true;
    // for(let item of types){
    //     if(item.type===type.trim().toLowerCase() && item.){
    //         toast.warning('Type already exists',{
    //             position: 'top-center'
    //         });
    //         isValid=false;
    //         setLoading(false);
    //         return;
    //     }
    // }
    // if(!isValid) return;
    try {
      const body = {
        type: type,
      };
      await axios.post(`${productURL}/type`, body);
      toast.success("Add new type successfully.");
    } catch (e) {
      console.error(e);
      toast.error("Add new type failed.");
    } finally {
      setLoading(false);
    }
  };
  const removeType = async () => {
    try {
      for (let item of types) {
        if (item.type === type.trim().toLowerCase()) {
          await axios.delete(`${productURL}/type/${item._id}`);
          toast.success("Remove type successfully.");
          return;
        }
      }
      toast.warning("Type not found");
    } catch (e) {
      console.error(e);
      toast.error("Remove type failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className='mt-3'
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            type='text'
            placeholder='enter new type...'
          ></Form.Control>
          <div className='mt-3 d-flex justify-content-center'>
            <Button variant='primary' type='submit' className='w-75 mx-auto'>
              {!loading ? (
                <>Add</>
              ) : (
                <Spinner
                  as='span'
                  animation='border'
                  role='status'
                  aria-hidden='true'
                />
              )}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
