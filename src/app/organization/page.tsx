'use client'
import { modal1, modal10, modal11, modal12, modal13, modal2, modal3, modal4, modal5, modal6, modal7, modal8, modal9 } from '@/shared/data/prism/advance-uiprism'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Showcode from '@/shared/layout-components/showcode/showcode'
import Link from 'next/link'
import React, { Fragment } from 'react'


 function organization() {
  return (
    <>
    <Seo title={"Contacts"} />
    <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-body !p-0">
                            <div className="p-4 grid border-b border-dashed dark:border-defaultborder/10">
                                <Link href="#!" className="hs-dropdown-toggle py-2  px-3 ti-btn bg-primary text-white !font-medium w-full !mb-0" data-hs-overlay="#todo-compose"><i className="ri-add-circle-line !text-[1rem]"></i>Add Organization
                                </Link>
                                <div id="todo-compose" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title text-[1rem] font-semibold" id="mail-ComposeLabel">Add Organization</h6>
                                                <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#todo-compose">
                                                    <span className="sr-only">Close</span>
                                                    <i className="ri-close-line"></i>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body !overflow-visible px-4">
                                                <div className="grid grid-cols-12 gap-2">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Task Name</label>
                                                        <input type="text" className="form-control w-full" id="task-name" placeholder="Task Name" />
                                                    </div>

                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Task Name</label>
                                                        <select className='form-select'>
                                                            <option>No options</option>
                                                        </select>
                                                        <div className='flex justify-between mt-4'>
                                                        <div className="alert alert-solid-primary alert-dismissible fade show flex" role="alert" id="dismiss-alert2"><div className="sm:flex-shrink-0"> A simple </div><div className="ms-auto"><div className="mx-1 my-1"><button type="button" className="inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600" data-hs-remove-element="#dismiss-alert2"><span className="sr-only">Dismiss</span><svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path></svg></button></div></div></div>
                                                        <div className="alert alert-solid-primary alert-dismissible !ms-2 fade show flex" role="alert" id="dismiss-alert2"><div className="sm:flex-shrink-0"> A simple </div><div className="ms-auto"><div className="mx-1 my-1"><button type="button" className="inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600" data-hs-remove-element="#dismiss-alert2"><span className="sr-only">Dismiss</span><svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path></svg></button></div></div></div>
                                                        <div className="alert alert-solid-primary alert-dismissible !ms-2 fade show flex" role="alert" id="dismiss-alert2"><div className="sm:flex-shrink-0"> A simple </div><div className="ms-auto"><div className="mx-1 my-1"><button type="button" className="inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600" data-hs-remove-element="#dismiss-alert2"><span className="sr-only">Dismiss</span><svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path></svg></button></div></div></div>
                                                        </div>
                                                        
                                                    </div>

                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Task Name</label>
                                                        <input type="text" className="form-control w-full" id="task-name" placeholder="Task Name" />
                                                    </div>


                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Task Name</label>
                                                        <input type="text" className="form-control w-full" id="task-name" placeholder="Task Name" />
                                                    </div>
                                                   
                                                    
                                                   
                                                   
                                                </div>
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button"
                                                    className="hs-dropdown-toggle ti-btn  ti-btn-light align-middle"
                                                    data-hs-overlay="#todo-compose">
                                                    Cancel
                                                </button>
                                                <button type="button" className="ti-btn bg-primary text-white !font-medium">Create</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
                                <div className="input-group">
                                    <input type="text" className="form-control w-full !rounded-md !bg-light border-0 !rounded-e-none" placeholder="Search Task Here" aria-describedby="button-addon2" />
                                    <button type="button" aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" id="button-addon2"><i className="ri-search-line text-[#8c9097] dark:text-white/50"></i></button>
                                </div>
                            </div>
                            <div className="p-4 task-navigation border-b border-dashed dark:border-defaultborder/10">
                                <ul className="list-none task-main-nav mb-0">
                                    <li className="!px-0 !pt-0">
                                        <span className="text-[.6875rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] font-semibold"> Organization</span>
                                    </li>
                                    <li className="active">
                                        <Link href="#!">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-task-line align-middle text-[.875rem]"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    All Tasks
                                                </span>
                                                <span className="badge bg-success/10 text-success rounded-full">167</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-star-line align-middle text-[.875rem]"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    Starred
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-delete-bin-5-line align-middle text-[.875rem]"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    Trash
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                 
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-9 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body !p-0">
                                    <div className="md:flex px-4 py-6 items-center justify-between">
                                        <div>
                                            <h6 className="font-semibold mb-0 text-[1rem]">Organization</h6>
                                        </div>
                                        
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            
                                    <div className="grid grid-cols-12 gap-x-6" id="tasks-container">
                                        <div className="xl:col-span-4 col-span-12 task-card">
                                        <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start ">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/4.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" mb-1 font-semibold text-[1rem]"> Melissa Jane </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">melissajane2134@gmail.com</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className="xl:col-span-4 col-span-12 task-card">
                                        <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start ">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/4.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" mb-1 font-semibold text-[1rem]"> Melissa Jane </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">melissajane2134@gmail.com</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className="xl:col-span-4 col-span-12 task-card">
                                        <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start ">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/4.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" mb-1 font-semibold text-[1rem]"> Melissa Jane </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">melissajane2134@gmail.com</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
                                            
                                        
                                        
                                        
                               
                                
                            
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            </>
  )
}

organization.layout = "Contentlayout";
export default organization;
