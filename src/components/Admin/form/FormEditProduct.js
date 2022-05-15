import {
  Form,
  InputGroup,
  Button,
  Badge,
  Spinner,
  Accordion,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { productURL } from "../../../api/Admin/config";
import validateProduct from "../validateProduct";
import setHeader from "../../../api/Admin/setHeader";

export default function FormEditProduct(props) {
  //name
  const [name, setName] = useState("");
  //price
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState(1);
  const [colorValue, setColorValue] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [sizeValue, setSizeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        //call api product
        const res = await axios.get(`${productURL}/${props.id}`);
        //set data to state
        setName(res.data.product.name);
        setPrice(res.data.product.prices);
        setDescription(res.data.product.desc);
        setImages(res.data.product.image);
        setType(res.data.product.typeId._id);
        setStatus(res.data.product.status);
        setColor(res.data.color);
        setSize(res.data.size);
        //set types
        const response = await fetch(`${productURL}/types/all`);
        const data = await response.json();
        setTypes([...data.types.filter((type) => type.display === true)]);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [props.id]);
  const handleAddFile = async(e) => {
    const size = e.target.files[0].size;
    if (size > 100000) {
      toast.warning("Please choose image less than 100mb", {
        position: "top-center",
      });
      return;
    }
    const type = e.target.files[0].type;
    if (type.indexOf("image") === -1) {
      toast.warning("Please choose image file", {
        position: "top-center",
      });
      return;
    }
    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = () => {
    //   setImages((images) => [...images, reader.result]);
    // };
    try{
      setLoadingImage(true);
      delete axios.defaults.headers.common["Authorization"];
      const form = new FormData();
      const image = e.target.files[0];
      form.append("file", image);
      form.append("upload_preset", "qmpupf7a");
      const res = await axios.post("https://api.cloudinary.com/v1_1/do8rqqyn4/upload", form);
      setImages([...images, res.data.secure_url]);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoadingImage(false);
    }
    setHeader(sessionStorage.getItem("token"));
  };
  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const mess = validateProduct(
      name,
      size,
      color,
      price,
      description,
      images,
      type
    );
    if (mess !== "") {
      toast.warning(mess);
      setLoading(false);
      return;
    }
    try {
      const body = {
        name: name,
        image: images,
        prices: price,
        desc: description,
        type: type,
        color: color,
        size: size,
        status: parseInt(status),
      };
      //console.log(body);
      await axios.put(`${productURL}/${props.id}`, body);
      toast.success("Edit product success");
      props.reload(true);
      props.cancel(false);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  const add = (field) => {
    if(field==='size'){
      if(sizeValue===0 || sizeValue==='') return;
      setSize([...size, sizeValue]);
      setSizeValue('');
    }
    else if(field==='color'){
      if(colorValue==='') return;
      setColor([...color, colorValue]);
      setColorValue('');
    }
  };
  const remove = (field) => {
    if(field==='size'){
      setSize(size.filter((value) => value !== parseInt(sizeValue)));
      setSizeValue('');
    }
    else if(field==='color'){
      setColor(color.filter((value) => value !== colorValue));
      setColorValue('');
    }
  }
  return (
    <>
      <Form className='text-start' onSubmit={handleEditProduct}>
        {loading ? (
          <div className='text-center'>
            <Spinner animation='border' size='sm' /> please wating ...
          </div>
        ) : (
          <>
            <p>Id: {props.id}</p>
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
                      {
                        loadingImage?
                        <>loading ...</>:
                        images.map((image, index) => (
                          <div className='p-2' key={index}>
                            <div>
                              <img src={image} width='100' alt='' />
                            </div>
                            <div className='text-center'>
                              <b
                                className='text-danger'
                                onClick={() =>
                                  setImages(
                                    images.filter((item, i) => i !== index)
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                remove
                              </b>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <InputGroup>
                <Form.Control
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleAddFile(e)}
                  multiple
                />
              </InputGroup>
              <Form.Label>Size</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  placeholder='Enter size'
                  min={0}
                  value={sizeValue}
                  onChange={(e) => setSizeValue(e.target.value)}
                />
                <Button
                  variant='outline-secondary'
                  onClick={() => add('size')}
                >
                  Add
                </Button>
                <Button
                  variant='outline-secondary'
                  onClick={() => remove('size')}
                >
                  Remove
                </Button>
                <Button variant='outline-secondary' onClick={() => setSize([])}>
                  Clear
                </Button>
              </InputGroup>
              <div>
                {size.map((item, index) => {
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
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                />
                <Button
                  variant='outline-secondary'
                  onClick={() => add('color')}
                >
                  Add
                </Button>
                <Button
                  variant='outline-secondary'
                  onClick={() => remove('color')}
                >
                  Remove
                </Button>
                <Button
                  variant='outline-secondary'
                  onClick={() => setColor([])}
                >
                  Clear
                </Button>
              </InputGroup>
              <div>
                {color.map((item, index) => {
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
                defaultValue={type}
                onChange={(e) => setType(e.target.value)}
              >
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
              <Form.Label>Status</Form.Label>
              <Form.Control
                as='select'
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='1'>Available</option>
                <option value='0'>Unavailable</option>
              </Form.Control>
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
                  Edit
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
          </>
        )}
      </Form>
    </>
  );
}
