import { Container, ListGroup, Spinner } from "react-bootstrap";
import { orderURL } from "../../api/Admin/config";
import formatMoney from "./formatMoney";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function DetailHandle(props) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(`${orderURL}/handle/${props.id}`);
        setDetail(res.data.staff);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [props.id]);

  console.log(detail);
  return (
    <Container>
      {loading ? (
        <div className='text-center'>
          <Spinner animation='border' size='sm' /> please wating ...
        </div>
      ) : (
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h5>UserId: {detail?.userId?._id}</h5>
            <li>Email:{detail?.userId?.email || "Chưa cập nhật"} </li>
            <li>Phone: {detail?.userId?.phoneNumber || "Chưa cập nhật"}</li>
            <li>CreatedAt: {detail?.userId?.createdAt || "Chưa cập nhật"}</li>
          </ListGroup.Item>
        </ListGroup>
      )}
    </Container>
  );
}
