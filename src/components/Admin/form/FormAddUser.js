import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import validateAccount from "../../Admin/validateAccount";
import { toast } from "react-toastify";
import axios from "axios";
import { authURL } from "../../../api/Admin/config";

export default function FormAddUser(props) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState(props.user?.phoneNumber);
  const [email, setEmail] = useState(props.user?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const message =
      props.type === "update"
        ? validateAccount(phone, null, null)
        : validateAccount(phone, confirmPassword, password);
    if (message !== "") {
      toast.warning(message, {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    try {
      const body = {
        phoneNumber: phone,
        email: email,
        // password: password
      };
      if (props.type === "update") {
        await axios.put(`${authURL}/user/${props.user._id}`, body);
        toast.success("Update user successfully");
      } else {
        body.password = password;
        await axios.post(`${authURL}/register`, body);
        toast.success("Add user successfully");
      }
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
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
          type='text'
          placeholder='Enter your phone number...'
          required
          minLength={10}
          maxLength={15}
        />
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter your email...'
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {props.type === "update" ? (
          <></>
        ) : (
          <>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password...'
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm your password...'
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </>
        )}
        <div className='mt-2 d-flex justify-content-center'>
          <Button
            variant='primary'
            type='submit'
            className='w-75 mx-auto'
            disabled={loading}
          >
            {!loading ? (
              <>Add/Update</>
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
