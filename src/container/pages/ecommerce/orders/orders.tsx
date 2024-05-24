import  { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import ecommerceimg1 from "../../../../assets/images/ecommerce/png/1.png";
import ecommerceimg2 from "../../../../assets/images/ecommerce/png/2.png";
import ecommerceimg3 from "../../../../assets/images/ecommerce/png/3.png";
import ecommerceimg4 from "../../../../assets/images/ecommerce/png/4.png";
import ecommerceimg7 from "../../../../assets/images/ecommerce/png/7.png";
import ecommerceimg8 from "../../../../assets/images/ecommerce/png/8.png";
import ecommerceimg9 from "../../../../assets/images/ecommerce/png/9.png";
import ecommerceimg10 from "../../../../assets/images/ecommerce/png/10.png";
import ecommerceimg11 from "../../../../assets/images/ecommerce/png/11.png";
import ecommerceimg13 from "../../../../assets/images/ecommerce/png/13.png";
import ecommerceimg14 from "../../../../assets/images/ecommerce/png/14.png";
import ecommerceimg16 from "../../../../assets/images/ecommerce/png/16.png";


interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Orders" activepage="Ecommerce" mainpage="Orders" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-body flex items-center flex-wrap">
                            <div className="flex-grow">
                                <span className="mb-0 text-[0.875rem] text-[#8c9097] dark:text-white/50">Total number of orders placed upto now : <span className="font-semibold text-success">28</span></span>
                            </div>
                            <div className="hs-dropdown ti-dropdown">
                                <Link to="#"
                                    className="ti-btn ti-btn-light sm:!m-0 !mb-3 !gap-0 !font-medium dark:text-defaulttextcolor/70"
                                    aria-expanded="false">
                                    Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                </Link>
                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Date</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Price</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Category</Link></li>
                                </ul>
                            </div>
                            <div className="flex items-center ms-2" role="search">
                                <input className="form-control !rounded-sm me-2 dark:text-defaulttextcolor/70" type="search" placeholder="Search" aria-label="Search" />
                                <button className="ti-btn ti-btn-light dark:text-defaulttextcolor/70 !mb-0" type="submit">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header block !justify-start">
                            <div className="sm:flex block items-center w-full">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg1} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Denim Zep.Co Sweat Shirt</span>
                                    </Link>
                                    <span className="block text-success">$1,299</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1203</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="delivery-date text-center ms-auto">
                                    <span className="text-[1.125rem] text-primary font-bold">13</span>
                                    <span className="font-semibold">Dec</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block items-center w-full justify-between">
                            <div><span className="text-[#8c9097] dark:text-white/50 me-2">Status :</span><span className="badge bg-success/10 text-success">Shipped</span></div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-danger">Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header block !justify-start">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg2} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Jimmy Lolfiger Jacket</span>
                                    </Link>
                                    <span className="block text-success">$499</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-2936</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="delivery-date text-center ms-auto">
                                    <span className="text-[1.125rem] text-primary font-bold">25</span>
                                    <span className="font-semibold">Nov</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block items-center w-full justify-between">
                            <div>
                                <span className="text-[#8c9097] dark:text-white/50 me-2">Status :</span>
                                <span className="badge bg-primary/10 text-primary">Confirmed</span>
                            </div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-danger">Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header block !justify-start">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg3} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Louie Phillippe Coat</span>
                                    </Link>
                                    <span className="block text-success">$1,899</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1855</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <span className="badge bg-success text-white">Delivered</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block justify-between items-center">
                            <div className="text-[0.6875rem]">
                                <span>Delivered on:</span>
                                <span className="font-semibold">29,Oct 2022 - 12:47PM</span>
                            </div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 ti-btn-primary !text-[0.75rem] !font-medium">Rate Product<i className="bi bi-star-fill ms-2 text-xs text-warning"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg4} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Denim Corp</span>
                                    </Link>
                                    <span className="block text-success">$2,499</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1234</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <span className="badge bg-danger text-white">Cancelled</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="ltr:float-right rtl:float-left">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-light">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg13} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Orange Watch</span>
                                    </Link>
                                    <span className="block text-success">$249</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1645</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <span className="badge bg-success text-white">Delivered</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block justify-between items-center">
                            <div className="text-[0.6875rem]">
                                <span>Delivered on:</span>
                                <span className="font-semibold">4,Nov 2022 - 10:24AM</span>
                            </div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 ti-btn-primary !text-[0.75rem] !font-medium">Rate Product<i className="bi bi-star-fill ms-2 text-xs text-warning"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg8} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Pufa Sweat Shirt</span>
                                    </Link>
                                    <span className="block text-success">$2,399</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1346</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="delivery-date text-center ms-auto">
                                    <span className="text-[1.125rem] text-primary font-bold">16</span>
                                    <span className="font-semibold">Jan</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block items-center w-full justify-between">
                            <div><span className="text-[#8c9097] dark:text-white/50 me-2">Status :</span><span className="badge bg-success/10 text-success">Shipped</span></div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-danger">Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg9} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Bluberry Co.In</span>
                                    </Link>
                                    <span className="block text-success">$499</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-2936</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="delivery-date text-center ms-auto">
                                    <span className="text-[1.125rem] text-primary font-bold">19</span>
                                    <span className="font-semibold">Dec</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block items-center w-full justify-between">
                            <div><span className="text-[#8c9097] dark:text-white/50 me-2">Status :</span><span className="badge bg-warning/10 text-warning">Out For Delivery</span></div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-danger">Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg11} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Garage &amp; Co</span>
                                    </Link>
                                    <span className="block text-success">$499</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1376</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="delivery-date text-center ms-auto">
                                    <span className="text-[1.125rem] text-primary font-bold">24</span>
                                    <span className="font-semibold">Dec</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block items-center w-full justify-between">
                            <div><span className="text-[#8c9097] dark:text-white/50 me-2">Status :</span><span className="badge bg-success/10 text-success">Shipped</span></div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-danger">Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg14} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Hadimo Smart Watch(44mm)</span>
                                    </Link>
                                    <span className="block text-success">$499</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-2903</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="delivery-date text-center ms-auto">
                                    <span className="text-[1.125rem] text-primary font-bold">16</span>
                                    <span className="font-semibold">Nov</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block items-center w-full justify-between">
                            <div>
                                <span className="text-[#8c9097] dark:text-white/50 me-2">Status :</span>
                                <span className="badge bg-primary/10 text-primary">Confirmed</span>
                            </div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-danger">Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg7} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">BMW Denim JAcket</span>
                                    </Link>
                                    <span className="block text-success">$1,899</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1976</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <span className="badge bg-success text-white">Delivered</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block justify-between items-center">
                            <div className="text-[0.6875rem]">
                                <span>Delivered on:</span>
                                <span className="font-semibold">04,Nov 2022 - 03:12PM</span>
                            </div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 ti-btn-primary !text-[0.75rem] !font-medium">Rate Product<i className="bi bi-star-fill ms-2 text-xs text-warning"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full ">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg16} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Totoya Watch For Kids</span>
                                    </Link>
                                    <span className="block text-success">$799</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-8765</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <span className="badge bg-danger text-white">Cancelled</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="ltr:float-right rtl:float-left">
                                <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-light">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header !justify-start block">
                            <div className="sm:flex block items-center w-full">
                                <div className="me-2">
                                    <span className="avatar bg-light avatar-md mb-1">
                                        <img src={ecommerceimg10} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <Link to="#">
                                        <span className="text-[0.875rem] font-semibold">Garage &amp; Co</span>
                                    </Link>
                                    <span className="block text-success">$249</span>
                                </div>
                                <div className="sm:text-center">
                                    <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                    <span className="sm:block">#SPK-1645</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex items-center">
                                <div className="orders-delivery-address">
                                    <p className="mb-1 font-semibold">Delivery Address</p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        mig-1-11,monroe street, georgetown, Washington D.C
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <span className="badge bg-success text-white">Delivered</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer sm:flex block justify-between items-center">
                            <div className="text-[0.6875rem]">
                                <span>Delivered on:</span>
                                <span className="font-semibold">22,Oct 2022 - 05:15PM</span>
                            </div>
                            <div className="sm:mt-0 mt-2">
                                <button type="button" className="ti-btn !py-1 !px-2 ti-btn-primary !text-[0.75rem] !font-medium">Rate Product<i className="bi bi-star-fill ms-2 text-xs text-warning"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Orders;
