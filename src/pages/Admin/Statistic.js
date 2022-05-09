import { useState, useEffect } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import GeneralInfor from "../../components/Admin/GeneralInfor";
import ChartBar from "../../components/Admin/chart/ChartBar";
import ChartDoghnut from "../../components/Admin/chart/ChartDoghnut";
import { url } from "../../api/Admin/config";
import axios from "axios";
import { toast } from "react-toastify";
import SelectStatisticAction from "../../components/Admin/action/selectStatisticAction";

export default function Statistic() {
  const [statistic, setStatistic] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [quantityProduct, setQuantityProduct] = useState([]);
  const [moneyProduct, setMoneyProduct] = useState([]);
  const [nameQuantity, setNameQuantity] = useState([]);
  const [nameMoney, setNameMoney] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.post(`${url}/statistic`);
        console.log(res.data.statistic);
        setStatistic(res.data.statistic);
        setQuantityProduct(
          res.data.statistic.map((item) => item.totalQuantity)
        );
        setMoneyProduct(res.data.statistic.map((item) => item.totalMoney));
        setNameQuantity(res.data.statistic.map((item) => item.product.name));
        setNameMoney(res.data.statistic.map((item) => item.product.name));
      } catch (e) {
        toast.error("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(from, to);
    setLoading(true);
    const d1 = Math.min(new Date(from).getTime(), new Date(to).getTime());
    const d2 = Math.max(new Date(from).getTime(), new Date(to).getTime());
    try {
      const res = await axios.post(`${url}/statistic`, {
        start: d1,
        end: d2,
      });
      setStatistic(res.data.statistic);
    } catch (e) {
      toast.error("Failed to load data from server.");
    } finally {
      setLoading(false);
    }
  };
  const handleSelectTop = (value) => {
    let data = null;
    switch (value) {
      case "top3":
        data = SelectStatisticAction(statistic, 3);
        setQuantityProduct(data.quatity);
        setMoneyProduct(data.money);
        setNameQuantity(data.nameQuantity);
        setNameMoney(data.nameMoney);
        break;
      case "top5":
        data = SelectStatisticAction(statistic, 5);
        setQuantityProduct(data.quatity);
        setMoneyProduct(data.money);
        setNameQuantity(data.nameQuantity);
        setNameMoney(data.nameMoney);
        break;
      case "top10":
        data = SelectStatisticAction(statistic, 10);
        setQuantityProduct(data.quatity);
        setMoneyProduct(data.money);
        setNameQuantity(data.nameQuantity);
        setNameMoney(data.nameMoney);
        break;
      case "all":
        setQuantityProduct(statistic.map((item) => item.totalQuantity));
        setMoneyProduct(statistic.map((item) => item.totalMoney));
        setNameQuantity(statistic.map((item) => item.product.name));
        setNameMoney(statistic.map((item) => item.product.name));
        break;
      default:
        return;
    }
  };
  return (
    <div className='pt-5 pb-4 tab background'>
      <GeneralInfor />
      <div className='m-auto mt-3 p-3 rounded shadow text-light bg-box mx-2'>
        {loading ? (
          <div className='text-center'>
            <Spinner animation='border' variant='light' size='sm' />
            loading information ...
          </div>
        ) : (
          <div className='row'>
            <Form
              className='d-flex justify-content-center'
              onSubmit={handleSearch}
            >
              <Form.Label className='mx-2'>From</Form.Label>
              <Form.Control
                className='mx-2 w-25'
                type='date'
                onChange={(e) => setFrom(e.target.value)}
              />
              <Form.Label className='mx-2'>To</Form.Label>
              <Form.Control
                className='mx-2 w-25'
                type='date'
                onChange={(e) => setTo(e.target.value)}
              />
              <Button type='submit' className='mx-2' variant='primary'>
                Search
              </Button>
            </Form>
            <Form className='d-flex justify-content-center mt-3'>
              <Form.Control
                as='select'
                className='mx-2 w-25'
                defaultValue=''
                onChange={(e) => handleSelectTop(e.target.value)}
              >
                <option value='' disabled>
                  Select
                </option>
                <option value='top3'>Top 3</option>
                <option value='top5'>Top 5</option>
                <option value='top10'>Top 10</option>
                <option value='all'>All</option>
              </Form.Control>
            </Form>
            <div className='col-sm-8 mt-2'>
              <ChartBar
                title='Revenue (vnd)'
                labels={nameMoney}
                data={moneyProduct}
                datasetLabel='Revenue'
              />
            </div>
            <div className='col-sm-4 mt-2'>
              <ChartDoghnut
                title='Quantity'
                labels={nameQuantity}
                data={quantityProduct}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
