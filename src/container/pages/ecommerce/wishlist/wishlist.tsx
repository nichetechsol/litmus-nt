import  { FC, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Link } from 'react-router-dom';
import { AddToCart, ProductReduxData } from "../../../../redux/action";
import { Maindata } from '../ecommercedata';
import Swal from 'sweetalert2';
interface WishlistProps {}

const Wishlist: FC<WishlistProps> = ({ AddToCart }: any) => {
    function Confirmalert(id:string) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Remove'
        }).then((result) => {
          if (result.isConfirmed) {
            handleRemove(id);
          }
        });
      }
      //search function
      const [allData, setAllData] = useState(Maindata);

      function handleRemove(id: string) {
          const newList = allData.filter((idx: any) => idx.id !== id);
          setAllData(newList);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success'
          });
      }
      const allElement2: any = [];
      const myfunction = (InputData: string) => {
          let allElement;
          for (allElement of allData) {
              if (allElement.title[0] == " ") {
                  allElement.title = allElement.title.trim();
              }
              if (allElement.title.toLowerCase().includes(InputData.toLowerCase())) {
                  if (allElement.title.toLowerCase().startsWith(InputData.toLowerCase())) {
                      allElement2.push(allElement);
                  }
              }
  
          }
          setAllData(allElement2);
      };
  return(
  <Fragment>
            <Pageheader currentpage="Wishlist" activepage="Ecommerce" mainpage="Wishlist" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-body sm:flex items-center justify-between">
                            <div className="text-[.9375rem] mb-0">Total <span className="badge bg-success text-white">12</span> products are wishlisted</div>
                            <div className="flex" role="search">
                                <input className="form-control form-control-sm me-2 !rounded-sm" type="search" placeholder="Search" aria-label="Search" onChange={(ele) => { myfunction(ele.target.value); }}/>
                                <button className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-light" type="submit">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {allData ? allData.map((idx:any) => (
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12" key={Math.random()}>
                    <div className="box product-card">
                        <div className="box-body">
                            <Link to="#" className="product-image">
                                <img src={idx.preview} className="card-img mb-3 rounded-sm" alt="..." />
                            </Link>
                            <div className="product-icons">
                                <Link aria-label="anchor"  onClick={() => Confirmalert(idx.id)} to="#" className="wishlist btn-delete"><i className="ri-close-line"></i></Link>
                            </div>
                            <p className="product-name font-semibold mb-0 flex items-center justify-between">{idx.title}<span className="ltr:float-right rtl:float-left text-warning text-xs">4.2<i className="ri-star-s-fill align-middle ms-1"></i></span></p>
                            <p className="product-description text-[.6875rem] text-[#8c9097] dark:text-white/50 mb-2">{idx.description}</p>
                            <p className="mb-1 font-semibold text-[1rem] flex items-center justify-between"><span>{idx.newpr}<span className="text-[#8c9097] dark:text-white/50 line-through ms-1 opacity-[0.6] inline-block">$1,799</span></span><span className="badge bg-secondary/10 text-secondary ltr:float-right rtl:float-left !text-[.625rem]">{idx.oldpr}</span></p>
                            <p className="text-[.6875rem] text-success font-semibold mb-0 flex items-center">
                                <i className="ti ti-discount-2 text-[1rem] me-1"></i>Offer Price {idx.offerprice}
                            </p>
                        </div>
                        <div className="box-footer text-center ">
                            <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart`} className="ti-btn ti-btn-primary m-1 !font-medium" onClick={() => { AddToCart(idx.id); }}><i className="ri-shopping-cart-2-line me-1 align-middle inline-block "></i>Move To Cart</Link>
                            <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/productdetails/`} className="ti-btn ti-btn-success m-1 !font-medium"><i className="ri-eye-line me-1 align-middle inline-block "></i>View Product</Link>
                        </div>
                    </div>
                </div>
                  )) : ""}
            </div>

            <nav aria-label="Page navigation" className="">
                <ul className="ti-pagination flex ltr:float-right rtl:float-left mb-4 rounded-sm text-[1rem]">
                    <li className="page-item disabled">
                        <Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">
                            Previous
                        </Link>
                    </li>
                    <li className="page-item"><Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">1</Link></li>
                    <li className="page-item "><Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">2</Link></li>
                    <li className="page-item "><Link className="page-link !py-[0.375rem] !px-[0.75rem]" to="#">3</Link></li>
                    <li className="page-item">
                        <Link className="page-link !text-primary !py-[0.375rem] !px-[0.75rem]" to="#">
                            next
                        </Link>
                    </li>
                </ul>
            </nav>
  </Fragment>
);}
const mapStateToProps = (state:any) => ({
  local_varaiable: state
});
export default connect(mapStateToProps, { AddToCart,ProductReduxData })(Wishlist);
// export default Wishlist;
