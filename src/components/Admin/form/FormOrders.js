import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { orderURL } from "../../../api/Admin/config";

export default function FormOrders(props) {
  const [name, setName] = useState(props.order?.name || "");
  const [phone, setPhone] = useState(props.order?.phoneNumber || "");
  const [address, setAddress] = useState(props.order?.address || "");
  const [status, setStatus] = useState(props.order?.status || 1);
  const [value, setValue] = useState(props.order?.sum || 0);
  const [loading, setLoading] = useState(false);
  const validatePhoneNumber = (phone) => {
    const regex = new RegExp("^0[0-9]+$");
    return regex.test(phone);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validatePhoneNumber(phone)) {
      toast.warning(
        "Phone number is invalid (only contain number and start with 0)",
        {
          position: "top-center",
        }
      );
      setLoading(false);
      return;
    }
    try {
      const body = {
        userId: props.order.userId,
        phoneNumber: phone,
        name: name,
        phone: phone,
        address: address,
        status: status,
        sum: value,
      };
      await axios.put(`${orderURL}/${props.order._id}`, body);
      toast.success("Update order successfully");
      props.reload(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      props.cancel();
    }
  };
  return (
    <Form className='text-start' onSubmit={handleSubmit}>
      <Form.Group>
        <p>User id: {props.order.userId}</p>
        <p>Order id: {props.order._id}</p>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your name...'
          required
        />
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type='text'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Enter your phone number...'
          minLength={10}
          required
        />
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Enter your address...'
          required
        />
        <Form.Label>Status</Form.Label>
        <Form.Control
          as='select'
          defaultValue={props.order.status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={1}>Waiting</option>
          <option value={0}>Success</option>
        </Form.Control>
        <Form.Label>Value</Form.Label>
        <Form.Control
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Enter value...'
          required
          min={0}
        />
        <div className='mt-2 d-flex justify-content-center'>
          <Button
            variant='primary'
            type='submit'
            className='w-75 mx-auto'
            disabled={loading}
          >
            {!loading ? (
              <>Update</>
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
        <div className='mt-2 d-flex justify-content-center'>
          <Button
            variant='secondary'
            type='button'
            className='w-75 mx-auto'
            onClick={() => props.cancel()}
          >
            Cancel
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}
