import { useEffect, useState } from "react";
import { url, authURL } from "../../../api/Admin/config";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

export default function FormSetRole(props) {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [roleUser, setRoleUser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res1 = await axios.get(`${authURL}/user/${props.id}`);
        setRoleUser(res1.data.roleUser.map((item) => item.roleId));
        const res2 = await axios.get(`${url}/role_cate`);
        setRoles(res2.data.role_cate);
        console.log(res2.data.role_cate);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [props.id]);
  const handleRoleChange = (checked, item) => {
    if (checked) {
      setRoleUser([...new Set([...roleUser, item.id])]);
    } else {
      setRoleUser(roleUser.filter((role) => role !== item));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${authURL}/user/role/${props.id}`, {
        roles: roleUser,
      });
      toast.success("Set role success!");
      props.reload(true);
      props.cancel();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {loading ? (
        <div className='text-center'>
          <Spinner animation='border' size='sm' /> please wating ...
        </div>
      ) : (
        <>
          {roles.map((item, index) => (
            <Form.Check
              inline
              key={index}
              type='switch'
              label={item.category_name}
              value={item.roleId}
              defaultChecked={roleUser.includes(item.roleId)}
              onChange={(e) => handleRoleChange(e.target.checked, item.roleId)}
            />
          ))}
          <Button className='w-75 mx-auto mt-2' type='submit'>
            Set role
          </Button>
          <Button
            variant='secondary'
            className='w-75 mx-auto mt-2'
            onClick={() => props.cancel()}
          >
            Cancel
          </Button>
        </>
      )}
    </Form>
  );
}
