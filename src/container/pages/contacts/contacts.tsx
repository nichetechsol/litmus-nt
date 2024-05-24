import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { contactsdata } from './contactsdata';
// import Pageheader from '../../../components/common/pageheader/pageheader';


interface ContactsProps { }

const Contacts: FC<ContactsProps> = () => {
  return (
    <Fragment>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <div className="box mt-6">
            <div className="box-body">
              <div className="contact-header">
                <div className="sm:flex block items-center justify-between">
                  <div className="h5 font-semibold mb-0">Contacts</div>
                  <div className="flex sm:mt-0 mt-2 items-center">
                    <div className="input-group">
                      <input type="text" className="form-control !rounded-s-sm w-full !bg-light !border-0" placeholder="Search Contact" aria-describedby="search-contact-member" />
                      <button aria-label="button" type="button" className="ti-btn ti-btn-light  !rounded-s-none !mb-0" id="search-contact-member"><i className="ri-search-line text-[#8c9097] dark:text-white/50"></i></button>
                    </div>
                    <div className="hs-dropdown ti-dropdown ms-2">
                      <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-primary w-[2.313rem] h-[2.313rem]" aria-expanded="false">
                        <i className="ti ti-dots-vertical"></i>
                      </button>
                      <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" to="#">Delete All</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" to="#">Copy All</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" to="#">Move To</Link></li>
                      </ul>
                    </div>
                    <div className="hs-tooltip ti-main-tooltip">
                      <button type="button" className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-secondary !ms-2 w-[2.313rem] h-[2.313rem]"><i className="ri-add-line"></i>
                        <span
                          className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                          role="tooltip">
                          Add Contacts
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {contactsdata.map((idx) => (
          <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12" key={Math.random()}>
            <div className="box">
              <div className="box-body contact-action">
                <div className="contact-overlay"></div>
                <div className="flex items-start ">
                  <div className="flex flex-grow flex-wrap gap-2">
                    <div className="avatar avatar-xl avatar-rounded me-3">
                      <img src={idx.src} alt="" />
                    </div>
                    <div>
                      <h6 className=" mb-1 font-semibold text-[1rem]">
                        {idx.class}
                      </h6>
                      <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">{idx.email}</p>
                      <p className="font-semibold text-[0.6875rem] mb-0 !text-primary">
                        {idx.phn}
                      </p>
                    </div>
                  </div>
                  <div>
                    {idx.icon}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 contact-hover-buttons">
                  <button type="button" className="ti-btn btn-sm ti-btn-light contact-hover-btn !py-1 !px-2 !text-[0.75rem] !font-medium">
                    View Contact
                  </button>
                  <div className="hs-dropdown ti-dropdwon contact-hover-dropdown">
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                      <i className="ri-more-2-fill"></i>
                    </button>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                      <li><Link className="ti-dropdown-item flex !gap-x-0 !px-[0.9375rem] !text-[0.8125rem] !font-medium" to="#"><i className="ri-share-line me-2 align-middle inline-block"></i>Share</Link></li>
                      <li><Link className="ti-dropdown-item flex !gap-x-0" to="#"><i className="ri-phone-line me-2 align-middle inline-block"></i>Call</Link></li>
                      <li><Link className="ti-dropdown-item flex !gap-x-0" to="#"><i className="ri-chat-2-line me-2 align-middle inline-block"></i>Message</Link></li>
                      <li><Link className="ti-dropdown-item flex !gap-x-0" to="#"><i className="ri-video-chat-line me-2 align-middle inline-block"></i>Video Call</Link></li>
                      <li><Link className="ti-dropdown-item flex !gap-x-0" to="#"><i className="ri-delete-bin-5-line me-2 align-middle inline-block"></i>Delete</Link></li>
                      <li><Link className="ti-dropdown-item flex !gap-x-0" to="#"><i className="ri ri-heart-3-line me-2 align-middle inline-block"></i>Favourite</Link></li>
                    </ul>
                  </div>
                  <button aria-label="button" className="ti-btn !py-[0.14rem] !px-2 ti-btn-light contact-hover-dropdown1" type="button">
                    <i className="ri-heart-3-fill text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
          <div className="box">
            <div className="box-body contact-action">
              <div className="contact-overlay"></div>
              <div className="flex items-start">
                <div className="flex flex-grow flex-wrap gap-2">
                  <div className="avatar avatar-xl avatar-rounded me-3 bg-primary text-white font-medium"> SJ </div>
                  <div> <h6 className="text-[1rem] mb-1 font-semibold"> Shensovic Jeremy </h6>
                    <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">shensovicjeremy@gmail.com</p>
                    <p className="font-semibold text-[0.6875rem] mb-0 !text-primary"> +1(555) 238 2342 </p></div> </div>
                <div> <i className="ri-heart-3-line text-[1rem] text-[#8c9097] dark:text-white/50"></i> </div> </div>
              <div className="flex items-center justify-center gap-2 contact-hover-buttons">
                <button type="button" className="ti-btn btn-sm ti-btn-light contact-hover-btn !py-1 !px-2 !text-[0.75rem] !font-medium"> View Contact
                </button> <div className="hs-dropdown ti-dropdwon contact-hover-dropdown">
                  <button className="ti-btn ti-btn-sm ti-btn-light" aria-label="button" type="button" aria-expanded="false">
                    <i className="ri-more-2-fill"></i> </button>
                  <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                    <li><a className="ti-dropdown-item flex !gap-x-0 !px-[0.9375rem] !text-[0.8125rem] !font-medium" href="#">
                      <i className="ri-share-line me-2 align-middle inline-block"></i>Share</a></li>
                    <li><a className="ti-dropdown-item flex !gap-x-0" href="#">
                      <i className="ri-phone-line me-2 align-middle inline-block"></i>Call</a></li>
                    <li><a className="ti-dropdown-item flex !gap-x-0" href="#">
                      <i className="ri-chat-2-line me-2 align-middle inline-block"></i>Message</a></li>
                    <li><a className="ti-dropdown-item flex !gap-x-0" href="#">
                      <i className="ri-video-chat-line me-2 align-middle inline-block"></i>Video Call</a></li>
                    <li><a className="ti-dropdown-item flex !gap-x-0" href="#">
                      <i className="ri-delete-bin-5-line me-2 align-middle inline-block"></i>Delete</a></li>
                    <li><a className="ti-dropdown-item flex !gap-x-0" href="#">
                      <i className="ri ri-heart-3-line me-2 align-middle inline-block"></i>Favourite</a></li>
                  </ul>
                </div>
                <button aria-label="button" className="ti-btn !py-[0.14rem] !px-2 ti-btn-light contact-hover-dropdown1" type="button">
                  <i className="ri-heart-3-fill text-danger"></i> </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation" className="mb-4">
        <ul className="ti-pagination !justify-end py-[0.375rem] px-3 text-[1rem] flex flex-row">
          <li className="page-item disabled"><Link className="page-link py-[0.375rem] px-3" to="#">Previous</Link></li>
          <li className="page-item"><Link className="page-link py-[0.375rem] px-3" to="#">1</Link></li>
          <li className="page-item"><Link className="page-link py-[0.375rem] px-3" to="#">2</Link></li>
          <li className="page-item"><Link className="page-link py-[0.375rem] px-3" to="#">Next</Link></li>
        </ul>
      </nav>
    </Fragment>
  );
}

export default Contacts;
