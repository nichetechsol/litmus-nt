'use client'
import { modal1, modal10, modal11, modal12, modal13, modal2, modal3, modal4, modal5, modal6, modal7, modal8, modal9 } from '@/shared/data/prism/advance-uiprism'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Showcode from '@/shared/layout-components/showcode/showcode'
import Link from 'next/link'
import React, { Fragment } from 'react'


 function organization() {
  return (
    <div className='p-5'>
    <Seo title={"Contacts"} />
    <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
            <div className="box mt-6">
                <div className="box-body">
                    <div className="contact-header">
                        <div className="sm:flex block items-center justify-between">
                            <div className="h5 font-semibold mb-0">All Organization</div>
                            <div className="flex sm:mt-0 mt-2 items-center">
                                <div className="input-group">
                                    <input type="text" className="form-control !rounded-s-sm w-full !bg-light dark:!bg-light !border-0" placeholder="Search Contact" aria-describedby="search-contact-member" />
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-light  !rounded-s-none !mb-0" id="search-contact-member"><i className="ri-search-line text-[#8c9097] dark:text-white/50"></i></button>
                                </div>
                                <button type="button" className={`ti-btn ti-btn-primary-full ti-btn-wave !ms-2`} data-hs-overlay="#hs-vertically-centered-modal"> <i className="ri-add-line"></i>   New</button>
                               <Showcode title="Basic Modal" customCardClass="custom-box" code={modal1}>
    <Link href="#!" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#todo-compose">Launch demo modal
    </Link>
    <div id="todo-compose" className="hs-overlay hidden ti-modal">
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold" id="mail-ComposeLabel">Modal title</h6>
            <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#todo-compose">
              <span className="sr-only">Close</span>
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="ti-modal-body px-4">
            ...
          </div>
          <div className="ti-modal-footer">
            <button type="button"
              className="hs-dropdown-toggle ti-btn  ti-btn-secondary-full align-middle"
              data-hs-overlay="#todo-compose">
              Close
            </button>
            <button type="button" className="ti-btn bg-primary text-white !font-medium">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </Showcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start ">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/4.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" mb-1 font-semibold text-[1rem]">
                                    Melissa Jane
                                </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">melissajane2134@gmail.com</p>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start ">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/15.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" text-[1rem] mb-1 font-semibold">
                                    Simon Cowall
                                </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">simoncowal111@gmail.com</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/2.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" text-[1rem] mb-1 font-semibold">
                                    Susana Sane
                                </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">susanasane@gmail.com</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/13.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className="text-[1rem] mb-1 font-semibold">
                                    Sahne Watson
                                </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">shanewatson@gmail.com</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/media/media-39.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className="text-[1rem] mb-1 font-semibold">
                                    Dwayne Happy
                                </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">dwaynehappy235@gmail.com</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/5.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className="text-[1rem] mb-1 font-semibold">
                                    Meisha Tite
                                </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">meishatite456@gmail.com</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/10.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className="text-[1rem] mb-1 font-semibold">
                                    Andrew Gerfield
                                </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">andrewgerfield00@gmail.com</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>










    </div>
</div>
  )
}

organization.layout = "Contentlayout";
export default organization;
