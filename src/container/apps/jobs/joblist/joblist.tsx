import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Link } from 'react-router-dom';
import { Joblistdata } from './joblistdata';


interface JoblistProps {}

const Joblist: FC<JoblistProps> = () =>{
  return(
  <Fragment>
      <Pageheader currentpage="Job List" activepage="Jobs" mainpage="Job List" />
            <div className="grid grid-cols-12">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box  overflow-hidden">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                All Jobs List
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link to={`${import.meta.env.BASE_URL}apps/jobs/jobpost/`}  className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]">
                                    <i className="ri-add-line  align-middle"></i>Post Job
                                </Link>
                                <div>
                                    <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                </div>
                                <div className="hs-dropdown ti-dropdown">
                                    <Link to="#" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]" aria-expanded="false">
                                        Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                    </Link>
                                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                        <li><Link className="ti-dropdown-item" to="#">Posted Date</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">Status</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">Department</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">Job Type</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">Newest</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">Oldest</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <div className="table-responsive">

                                <table className="table table-hover whitespace-nowrap min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="row" className="!ps-6"><input className="form-check-input" type="checkbox" id="checkboxNoLabeljob1" value="" aria-label="..." /></th>
                                            <th scope="col" className="text-start">Job Title</th>
                                            <th scope="col" className="text-start">Company</th>
                                            <th scope="col" className="text-start">Department</th>
                                            <th scope="col" className="text-start">Applications</th>
                                            <th scope="col" className="text-start">Vacancies</th>
                                            <th scope="col" className="text-start">Status</th>
                                            <th scope="col" className="text-start">Job Type</th>
                                            <th scope="col" className="text-start">Posted Date</th>
                                            <th scope="col" className="text-start">Expires on</th>
                                            <th scope="col" className="text-start">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Joblistdata.map((idx)=>(
                                        <tr className="border-t hover:bg-gray-200 dark:hover:bg-light" key={Math.random()}>
                                            <td className="!ps-6">{idx.checked}</td>
                                            <td>
                                                <div className="flex">
                                                    <span className={`avatar avatar-md !rounded-full bg-primary/10 !fill-primary`}><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="var(--primary-color)" d={idx.class2}></path></svg></span>
                                                    <div className="ms-2">
                                                        <p className="font-semibold mb-0 flex items-center"><Link to={`${import.meta.env.BASE_URL}apps/jobs/jobdetails/`}>{idx.class}</Link></p>
                                                        <p className="text-[0.75rem] text-muted mb-0">{idx.class1}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center">
                                                    <span className="avatar avatar-sm p-1 me-1 bg-light !rounded-full">
                                                        <img src={idx.src} alt="" />
                                                    </span>
                                                    <Link to="#" className="font-semibold mb-0">{idx.text1}</Link>
                                                </div>
                                            </td>
                                            <td>
                                                {idx.text3}
                                            </td>
                                            <td>{idx.number}</td>
                                            <td>{idx.number1}</td>
                                            <td><span className={`badge !rounded-full bg-${idx.color1}/10 text-${idx.color1}`}>{idx.text}</span></td>
                                            <td>{idx.data}</td>
                                            <td>
                                                {idx.data1}
                                            </td>
                                            <td><span className={`badge bg-${idx.color1}/10 text-${idx.color1}`}><i className="bi bi-clock me-1"></i>{idx.text2}</span></td>
                                            <td>
                                                <div className='space-x-2 rtl:space-x-reverse'>
                                                <Link to={`${import.meta.env.BASE_URL}apps/jobs/jobdetails/`} className="ti-btn ti-btn-icon ti-btn-sm ti-btn-primary">
                                                    <i className="ri-eye-line"></i>
                                                </Link>
                                                <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-info">
                                                    <i className="ri-edit-line"></i>
                                                </Link>
                                                <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-danger">
                                                    <i className="ri-delete-bin-line"></i>
                                                </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-footer border-t-0">
                            <div className="flex items-center flex-wrap overflow-auto">
                                <div className="mb-2 sm:mb-0">
                                    Showing <b>1</b> to <b>10</b> of <b>10</b> entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                                </div>
                                <div className="ms-auto">
                                    <nav aria-label="Page navigation">
                                        <ul className="ti-pagination  mb-0">
                                            <li className="page-item disabled"><Link className="page-link px-3 py-[0.375rem]" to="#">Previous</Link></li>
                                            <li className="page-item"><Link className="page-link active px-3 py-[0.375rem]" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">4</Link></li>
                                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">5</Link></li>
                                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Joblist;
