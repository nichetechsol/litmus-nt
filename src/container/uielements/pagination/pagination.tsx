import  { FC, Fragment } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { Link } from 'react-router-dom';
import Showcode from '../../../components/ui/showcode/showcode';
import { page1, page2, page3, page4, page5, page6, page7, pagea, pagination15 } from '../../../components/ui/data/uielementsdata';


interface PaginationProps {}

const Pagination: FC<PaginationProps> = () =>{ 
  return(
  <Fragment>
                <Pageheader currentpage="Pagination" activepage="Ui Elements" mainpage="Pagination" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                    <Showcode title="Basic Pagination" code={page1}>
                            <nav aria-label="Page navigation">
                                <ul className="ti-pagination  mb-0">
                                    <li className="page-item disabled"><Link className="page-link px-3 py-[0.375rem]" to="#">Previous</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link></li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                    <Showcode title="Pagination With Icons" code={page2}>
                            <nav aria-label="Page navigation">
                                <ul className="ti-pagination mb-0">
                                    <li className="page-item">
                                        <Link className="page-link px-3 py-[0.375rem]" to="#" aria-label="Previous">
                                            <span aria-hidden="true"><i className="rtl:rotate-180 bx bx-chevron-left"></i></span>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link  px-3 py-[0.375rem]" to="#" aria-label="Next">
                                            <span aria-hidden="true"><i className="rtl:rotate-180 bx bx-chevron-right"></i></span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                    <Showcode title="Pagination Sizing" code={pagination15} customCardBodyClass="!flex flex-wrap justify-between gap-2">
                            <nav aria-label="...">
                                <ul className="ti-pagination pagination-sm mb-0">
                                    <li className="page-item " aria-current="page">
                                        <span className="page-link  active px-3 py-[0.375rem]">1</span>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                </ul>
                            </nav>
                            <nav aria-label="...">
                                <ul className="ti-pagination mb-0">
                                    <li className="page-item " aria-current="page">
                                        <span className="page-link  active px-3 py-[0.375rem]">1</span>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                </ul>
                            </nav>
                            <nav aria-label="...">
                                <ul className="ti-pagination pagination-lg mb-0">
                                    <li className="page-item " aria-current="page">
                                        <span className="page-link active px-3 py-[0.375rem]">1</span>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Center &amp; Right Aligned Pagination" code={page3}>
                            <nav aria-label="Page navigation" className="mb-4">
                                <ul className="ti-pagination justify-center">
                                    <li className="page-item disabled">
                                        <Link to="#" className="page-link px-3 py-[0.375rem]">Previous</Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                            <nav aria-label="Page navigation">
                                <ul className="ti-pagination sm:justify-end justify-center mb-0">
                                    <li className="page-item disabled">
                                        <Link to="#" className="page-link px-3 py-[0.375rem]">Previous</Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Active And Disable State" customCardBodyClass="flex flex-wrap" code={pagea}>
                            <nav aria-label="..." className="me-4">
                                <ul className="ti-pagination">
                                    <li className="page-item disabled">
                                        <Link to="#" className="page-link px-3 py-[0.375rem]">Previous</Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                    <li className="page-item " aria-current="page">
                                        <Link className="page-link active px-3 py-[0.375rem]" to="#">2</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                            <nav aria-label="...">
                                <ul className="ti-pagination">
                                    <li className="page-item disabled">
                                        <span className="page-link px-3 py-[0.375rem]">Previous</span>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                    <li className="page-item " aria-current="page">
                                        <span className="page-link px-3 active py-[0.375rem]">2</span>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link>
                                    </li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Showcode Style-1" code={page4}>
                            <nav aria-label="Page navigation" className="pagination-style-1">
                                <ul className="ti-pagination mb-0">
                                    <li className="page-item disabled rtl:rotate-180">
                                        <Link aria-label="anchor" className="page-link" to="#">
                                            <i className="ri-arrow-left-s-line align-middle"></i>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                    <li className="page-item "><Link className="page-link active" to="#">2</Link></li>
                                    <li className="page-item">
                                        <Link aria-label="anchor" className="page-link" to="#">
                                            <i className="bi bi-three-dots"></i>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#">21</Link></li>
                                    <li className="page-item rtl:rotate-180">
                                        <Link aria-label="anchor" className="page-link" to="#">
                                            <i className="ri-arrow-right-s-line align-middle"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Pagination Style-2" code={page5}>
                            <nav aria-label="Page navigation" className="pagination-style-2">
                                <ul className="ti-pagination mb-0 flex-wrap">
                                    <li className="page-item disabled">
                                        <Link className="page-link px-3 py-[0.375rem] !border-0" to="#">
                                            Prev
                                        </Link>
                                    </li>
                                    <li className="page-item active"><Link className="page-link px-3 py-[0.375rem] !border-0" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem] !border-0" to="#">2</Link></li>
                                    <li className="page-item">
                                        <Link aria-label="anchor" className="page-link px-3 py-[0.375rem] !border-0" to="#">
                                            <i className="bi bi-three-dots"></i>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem] !border-0" to="#">17</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link px-3 py-[0.375rem] !text-primary !border-0" to="#">
                                            next
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Pagination Style-3" code={page6}>
                            <nav aria-label="Page navigation" className="pagination-style-3">
                                <ul className="ti-pagination mb-0 flex-wrap">
                                    <li className="page-item disabled">
                                        <Link className="page-link" to="#">
                                            Prev
                                        </Link>
                                    </li>
                                    <li className="page-item "><Link className="page-link active" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                    <li className="page-item">
                                        <Link aria-label="anchor" className="page-link" to="#">
                                            <i className="bi bi-three-dots"></i>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#">16</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link !text-primary" to="#">
                                            next
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Pagination Style-4" code={page7}>
                            <nav aria-label="Page navigation" className="pagination-style-4">
                                <ul className="ti-pagination mb-0 flex-wrap">
                                    <li className="page-item disabled">
                                        <Link className="page-link" to="#">
                                            Prev
                                        </Link>
                                    </li>
                                    <li className="page-item "><Link className="page-link active" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                    <li className="page-item">
                                        <Link aria-label="anchor" className="page-link" to="#">
                                            <i className="bi bi-three-dots"></i>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#">16</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link !text-primary" to="#">
                                            next
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </Showcode>
                </div>
            </div>
  </Fragment>
);}

export default Pagination;
