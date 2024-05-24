import  { FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Listdata } from './productlistdata';


interface ProductlistProps {}

const Productlist: FC<ProductlistProps> = () => {
  const [manageListData, setManageListData] = useState([...Listdata]);
    const handleDelete = (idToRemove: number) => {
        const updatedListData = manageListData.filter((item) => item.id !== idToRemove);
        setManageListData(updatedListData);
    };

    const [selectAllChecked, setSelectAllChecked] = useState(false);

    // Create a state variable to track selected items
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    // Function to handle the "Select All" checkbox click event
    const handleSelectAllClick = () => {
        setSelectAllChecked(!selectAllChecked);

        // Update the state of individual checkboxes in the tbody
        if (selectAllChecked) {
            setSelectedItems([]);
        } else {
            const allIds = manageListData.map((item) => item.id);
            setSelectedItems(allIds);
        }
    };

    // Function to handle individual checkbox clicks
    const handleCheckboxClick = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }

        // Check if all individual checkboxes are selected and update the "Select All" checkbox accordingly
        const allSelected = selectedItems.length === manageListData.length;
        setSelectAllChecked(allSelected);
    };
  return(
  <Fragment>
                <Pageheader currentpage="Product List" activepage="Ecommerce" mainpage="Product List" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Products List
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="table-responsive mb-4">
                                <table className="table whitespace-nowrap table-bordered min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="!text-start">
                                                <input className="form-check-input check-all"  onChange={handleSelectAllClick}
                                                    checked={selectAllChecked} type="checkbox" id="all-products" value="" aria-label="..." />
                                            </th>
                                            <th scope="col" className="text-start">Product</th>
                                            <th scope="col" className="text-start">Category</th>
                                            <th scope="col" className="text-start">Price</th>
                                            <th scope="col" className="text-start">Stock</th>
                                            <th scope="col" className="text-start">Gender</th>
                                            <th scope="col" className="text-start">Seller</th>
                                            <th scope="col" className="text-start">Published</th>
                                            <th scope="col" className="text-start">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {manageListData.map((idx) => (
                                        <tr className="product-list" key={Math.random()}>
                                            <td className="product-checkbox"><input className="form-check-input" type="checkbox" id={idx.id.toString()}
                                                        defaultValue=""
                                                        aria-label="..."
                                                        onChange={() => handleCheckboxClick(idx.id)}
                                                        checked={selectedItems.includes(idx.id)}/></td>
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="me-2">
                                                        <span className="avatar avatar-md avatar-rounded">
                                                            <img src={idx.src} alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="font-semibold">
                                                        {idx.product}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-light text-default">{idx.category}</span>
                                            </td>
                                            <td>{idx.price}</td>
                                            <td>{idx.stock}</td>
                                            <td>{idx.gender}</td>
                                            <td>{idx.seller}</td>
                                            <td>{idx.date}</td>
                                            <td>
                                                <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                                    <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}pages/ecommerce/editproducts`}
                                                        className="ti-btn ti-btn-wave  !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"><i
                                                            className="ri-pencil-line"></i></Link>
                                                    <Link aria-label="anchor" to="#" onClick={() => handleDelete(idx.id)}
                                                        className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"><i
                                                            className="ri-delete-bin-line"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="sm:flex items-center justify-between flex-wrap">
                                <nav aria-label="Page navigation" className="">
                                    <ul className="ti-pagination mb-0 flex flex-row rounded-sm text-[1rem] !ps-0">
                                        <li className="page-item disabled">
                                            <Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">
                                                Previous
                                            </Link>
                                        </li>
                                        <li className="page-item active"><Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">1</Link></li>
                                        <li className="page-item"><Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">2</Link></li>
                                        <li className="page-item sm:block hidden "><Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">3</Link></li>
                                        <li className="page-item">
                                            <Link className="page-link !text-primary !py-[0.375rem] !px-[0.75rem]" to="#">
                                                next
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                                <button type="button" className="ti-btn bg-danger text-white !font-medium m-1" >Delete All</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);
}
export default Productlist;
