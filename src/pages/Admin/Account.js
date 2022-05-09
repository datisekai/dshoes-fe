import { Button, Modal } from "react-bootstrap";
import TableAccount from "../../components/Admin/table/TableAccounts";
import { useEffect, useState } from "react";
import FormAddUser from "../../components/Admin/form/FormAddUser";

export default function Account() {
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  return (
    <div className='pt-5 pb-4 tab background'>
      <div className='d-inline text-light'>
        <Button
          variant='outline-primary'
          style={{ backgroundColor: "#2f3ab2" }}
          className='text-light ms-2'
          onClick={() => setShow(true)}
        >
          ADD NEW USER
        </Button>
      </div>
      <div className='bg-box mt-3 mx-2 rounded'>
        <TableAccount reload={reload} />
      </div>
      <Modal show={show} onHide={() => setShow(false)} size='md' centered>
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddUser
            cancel={() => setShow(false)}
            reload={(data) => setReload(data)}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
