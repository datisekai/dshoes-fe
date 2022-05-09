import TableOrders from "../../components/Admin/table/TableOrders";

export default function Orders() {
  return (
    <>
      <div className='pt-5 pb-4 tab background'>
        <div className='bg-box mt-3 mx-2 rounded'>
          <TableOrders />
        </div>
      </div>
    </>
  );
}
