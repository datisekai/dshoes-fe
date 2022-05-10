import { useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  Button,
  Badge,
  Spinner,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import { productURL } from "../../../api/Admin/config";
import validateProduct from "../validateProduct";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTypes as setTypesRedux } from "../../../app/typeReducer";
import setHeader from "../../../api/Admin/setHeader";

export default function FormAddNew(props) {
  //name
  const [name, setName] = useState("");
  //images
  const [images, setImages] = useState([]);
  //size
  const [size, setSize] = useState(0);
  const [arrSize, setArrSize] = useState([35, 36, 37, 38, 39, 30]);
  //color
  const [color, setColor] = useState("");
  const [arrColor, setArrColor] = useState([
    "black",
    "white",
    "red",
    "blue",
    "green",
    "yellow",
  ]);
  //price
  const [price, setPrice] = useState(0);
  //description
  const [description, setDescription] = useState("comming soon...");
  //type
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    async function getTypes() {
      const res = await axios.get(`${productURL}/types/all`);
      setTypes(res.data.types);
      dispatch(setTypesRedux(res.data.types));
    }
    getTypes();
  }, [dispatch]);
  //add file
  const handleAddImage = async (e) => {
    //check file size
    const size = e.target.files[0].size;
    if (size > 150000) {
      toast.warning("Please choose image less than 150mb", {
        position: "top-center",
      });
      return;
    }
    const type = e.target.files[0].type;
    // check if file is image
    if (type.indexOf("image") === -1) {
      toast.warning("Please choose image file", {
        position: "top-center",
      });
      return;
    }
    // convert image to base64
    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = () => {
    //   setImages([...images, reader.result]);
    // };
    let imgs = [];
    for (let image of images) {
      const form = new FormData();
      form.append("file", image);
      form.append("upload_preset", "qmpupf7a");
      imgs.push(form);
    }
    delete axios.defaults.headers.common["Authorization"];
    await axios.all(
      imgs.map((item) =>
        axios.post("https://api.cloudinary.com/v1_1/do8rqqyn4/upload", item)
      )
    );
    setImages([...imgs]);
    setHeader(sessionStorage.getItem("token"));
  };
  //add new product to database
  const addNewProduct = async function (e) {
    e.preventDefault();
    setLoading(true);
    const mess = validateProduct(
      name,
      arrSize,
      arrColor,
      price,
      description,
      images.length,
      type
    );
    if (mess !== "") {
      toast.warning(mess, {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    /*let imgs = [];
        for (let image of images) {
            const form = new FormData();
            form.append('file', image);
            form.append('upload_preset', 'qmpupf7a');
            imgs.push(form);
        }
        delete axios.defaults.headers.common["Authorization"];
        let res = await axios.all(
            imgs.map((item) => axios.post("https://api.cloudinary.com/v1_1/do8rqqyn4/upload", item))
        );
        setHeader(sessionStorage.getItem('token'));*/
    const product = {
      name: name,
      size: arrSize,
      color: arrColor,
      prices: price,
      desc: description,
      image: images,
      type: type,
    };
    // console.log(product);
    try {
      await axios.post(productURL, product);
      toast.success("Add new product success");
      props.reload(true);
    } catch (e) {
      console.error(e);
      toast.error("Opps, something went wrong");
    } finally {
      setLoading(false);
      props.cancel(false);
    }
  };
  return (
    <div>
      <Form onSubmit={addNewProduct}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name product'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Accordion defaultActiveKey={0}>
            <Accordion.Item eventKey={0}>
              <Accordion.Header>
                <Form.Label>Image</Form.Label>
              </Accordion.Header>
              <Accordion.Body>
                <div className='d-flex flex-wrap'>
                  {images.map((image, index) => (
                    <div className='p-2' key={index}>
                      <div>
                        <img src={image} alt='' width='100' />
                      </div>
                      <div className='text-center'>
                        <b
                          className='text-danger'
                          onClick={() =>
                            setImages(images.filter((item, i) => i !== index))
                          }
                          style={{ cursor: "pointer" }}
                        >
                          remove
                        </b>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Form.Control
            type='file'
            accept='image/*'
            onChange={(e) => handleAddImage(e)}
          />
          <Form.Label>Size</Form.Label>
          <InputGroup>
            <Form.Control
              type='number'
              placeholder='Enter size'
              min={0}
              defaultValue={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <Button
              variant='outline-secondary'
              onClick={() => setArrSize([...arrSize, size])}
            >
              Add
            </Button>
            <Button
              variant='outline-secondary'
              onClick={() =>
                setArrSize(arrSize.filter((value) => size !== value))
              }
            >
              Remove
            </Button>
            <Button variant='outline-secondary' onClick={() => setArrSize([])}>
              Clear
            </Button>
          </InputGroup>
          <div>
            {arrSize.map((item, index) => {
              return (
                <Badge className='bg-secondary m-1' key={index}>
                  {item}
                </Badge>
              );
            })}
          </div>
          <Form.Label>Color</Form.Label>
          <InputGroup>
            <Form.Control
              type='text'
              placeholder='Enter color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Button
              variant='outline-secondary'
              onClick={() => setArrColor([...arrColor, color])}
            >
              Add
            </Button>
            <Button
              variant='outline-secondary'
              onClick={() =>
                setArrColor(arrColor.filter((value) => value !== color))
              }
            >
              Remove
            </Button>
            <Button variant='outline-secondary' onClick={() => setArrColor([])}>
              Clear
            </Button>
          </InputGroup>
          <div>
            {arrColor.map((item, index) => {
              return (
                <Badge className='bg-secondary m-1' key={index}>
                  {item}
                </Badge>
              );
            })}
          </div>
          <Form.Label>Type</Form.Label>
          <Form.Control
            as='select'
            defaultValue=''
            onChange={(e) => setType(e.target.value)}
          >
            <option value=''>please select</option>
            {types.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.type}
                </option>
              );
            })}
          </Form.Control>
          <Form.Label>Price (vnd)</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter price'
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            role='5'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
          <div className='mt-2 d-flex justify-content-center'>
            <Button
              variant='primary'
              type='submit'
              className='w-75 mx-auto'
              disabled={loading}
            >
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
          <div className='mt-2 d-flex justify-content-center'>
            <Button
              variant='secondary'
              type='button'
              className='w-75 mx-auto'
              onClick={() => props.cancel(false)}
            >
              Cancel
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
