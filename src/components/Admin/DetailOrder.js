import { Container, ListGroup, Spinner } from "react-bootstrap";
import { orderURL } from "../../api/Admin/config";
import formatMoney from "./formatMoney";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function DetailOrder(props) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(`${orderURL}/detail/${props.id}`);
        setDetail(res.data.detail);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [props.id]);
  return (
    <Container>
      {loading ? (
        <div className='text-center'>
          <Spinner animation='border' size='sm' /> please wating ...
        </div>
      ) : (
        <ListGroup variant='flush'>
          {detail.map((item, index) => {
            return (
              <ListGroup.Item key={index}>
                <h5>
                  {index + 1} {item.productId.name}
                </h5>
                <li>Quantity: {item.quantify}</li>
                <li>Prices: {formatMoney(item.productId.prices)}</li>
                <li>Size: {item.size}</li>
                <li>Color: {item.color}</li>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </Container>
  );
}
