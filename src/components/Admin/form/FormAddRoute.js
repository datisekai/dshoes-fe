import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { url } from "../../../api/Admin/config";
import { toast } from "react-toastify";
import axios from "axios";

export default function FormAddRoute(props) {
  const [routeName, setRouteName] = useState("");
  const [routePath, setRoutePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleId, setRoleId] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${url}/role_cate`, {
        roleId: roleId,
        category_name: routeName,
        route: routePath,
      });
      toast.success("Add new route successfully.");
      window.location.reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>Route id</Form.Label>
      <Form.Control
        type='number'
        placeholder='Enter route id'
        value={roleId}
        onChange={(e) => setRoleId(e.target.value)}
        min={0}
        required
      />
      <Form.Label>Route name</Form.Label>
      <Form.Control
        type='text'
        placeholder='Enter route name'
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        required
      />
      <Form.Label>Route path</Form.Label>
      <Form.Control
        type='text'
        placeholder='Enter route path'
        value={routePath}
        onChange={(e) => setRoutePath(e.target.value)}
        required
      />
      <div className='mt-2 d-flex flex-column justify-content-center'>
        <Button
          className='mx-auto mt-1 w-75'
          variant='primary'
          type='submit'
          disabled={loading}
        >
          Submit
        </Button>
        <Button
          className='mx-auto mt-1 w-75'
          variant='secondary'
          onClick={() => props.cancel()}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
