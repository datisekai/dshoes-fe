import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { productURL } from "../../../api/Admin/config";
import { toast } from "react-toastify";
import axios from "axios";

export default function FormRemoveType(props) {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getType() {
      const res = await axios.get(`${productURL}/types/all`);
      setTypes(res.data.types);
    }
    getType();
  }, []);
  const handleRemoveType = async (e) => {
    e.preventDefault();
    if (type === "") {
      toast.warning("Please choose type", {
        position: "top-center",
      });
      return;
    }
    try {
      await axios.delete(`${productURL}/type/${type}`);
      toast.success("Remove type successfully.");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      props.cancel();
    }
  };
  return (
    <Form className='text-center' onSubmit={handleRemoveType}>
      <Form.Control
        as='select'
        defaultValue=''
        onChange={(e) => setType(e.target.value)}
      >
        <option value='' disabled>
          Choose type
        </option>
        {types.map((item, index) => (
          <option key={index} value={item._id}>
            {item.type}
          </option>
        ))}
      </Form.Control>
      <Button className='mx-auto mt-3 w-75' type='submit' disabled={loading}>
        Remove
      </Button>
    </Form>
  );
}
