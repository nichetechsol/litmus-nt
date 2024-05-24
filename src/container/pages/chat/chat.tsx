import  { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../components/common/pageheader/pageheader';
import PerfectScrollbar from 'react-perfect-scrollbar';
import media13 from "../../../assets/images/media/media-13.jpg";
import media19 from "../../../assets/images/media/media-19.jpg";
import media20 from "../../../assets/images/media/media-20.jpg";
import media52 from "../../../assets/images/media/media-52.jpg";
import media53 from "../../../assets/images/media/media-53.jpg";
import media56 from "../../../assets/images/media/media-56.jpg";
import face2 from "../../../assets/images/faces/2.jpg";
import face4 from "../../../assets/images/faces/4.jpg";
import face1 from "../../../assets/images/faces/1.jpg";
import face3 from "../../../assets/images/faces/3.jpg";
import face21 from "../../../assets/images/faces/21.jpg";
import face5 from "../../../assets/images/faces/5.jpg";
import face6 from "../../../assets/images/faces/6.jpg";
import face7 from "../../../assets/images/faces/7.jpg";
import face17 from "../../../assets/images/faces/17.jpg";
import face8 from "../../../assets/images/faces/8.jpg";
import face9 from "../../../assets/images/faces/9.jpg";
import face10 from "../../../assets/images/faces/10.jpg";
import face11 from "../../../assets/images/faces/11.jpg";
import face12 from "../../../assets/images/faces/12.jpg";
import face13 from "../../../assets/images/faces/13.jpg";
import face14 from "../../../assets/images/faces/14.jpg";
import face15 from "../../../assets/images/faces/15.jpg";
import face16 from "../../../assets/images/faces/16.jpg";
import face18 from "../../../assets/images/faces/18.jpg";
import face19 from "../../../assets/images/faces/19.jpg";
import face20 from "../../../assets/images/faces/20.jpg";
import media62 from "../../../assets/images/media/media-62.jpg";
import media63 from "../../../assets/images/media/media-63.jpg";
import media64 from "../../../assets/images/media/media-64.jpg";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  interface media {
    id: number
    src: string

}
 const Photosmediadata: media[] = [
    { id: 1, src: media56 },
    { id: 2, src: media52 },
    { id: 3, src: media53 },
    { id: 4, src: media62 },
    { id: 5, src: media63 },
    { id: 6, src: media64 },
    { id: 7, src: media13 },
    { id: 8, src: media19 },
    { id: 9, src: media20 },
];
  return(
  <Fragment>
      <Pageheader currentpage="Chat" activepage="Pages" mainpage="Chat" />
            <div className="main-chart-wrapper p-2 gap-2 lg:flex">
                <div className="chat-info border dark:border-defaultborder/10">
                    <Link aria-label="anchor" to="#" className="ti-btn bg-secondary text-white !font-medium ti-btn-icon !rounded-full chat-add-icon">
                        <i className="ri-add-line"></i>
                    </Link>
                    <div className="flex items-center justify-between w-full p-4 border-b dark:border-defaultborder/10">
                        <div>
                            <h5 className="font-semibold mb-0 text-[1.25rem] !text-defaulttextcolor dark:text-defaulttextcolor/70">Messages</h5>
                        </div>
                        <div className="hs-dropdown ti-dropdown">
                            <button aria-label="button" className="ti-btn ti-btn-icon ti-btn-secondary text-secondary"
                                type="button" aria-expanded="false">
                                <i className="ri-settings-3-line"></i>
                            </button>
                            <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                    to="#">Action</Link></li>
                                <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                    to="#">Another action</Link></li>
                                <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                    to="#">Something else here</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="chat-search p-4 border-b dark:border-defaultborder/10">
                        <div className="input-group">
                            <input type="text" className="form-control !bg-light border-0 !rounded-s-md" placeholder="Search Chat"
                                aria-describedby="button-addon2" />
                            <button aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2"><i
                                className="ri-search-line text-[#8c9097] dark:text-white/50"></i></button>
                        </div>
                    </div>
                    <nav className="flex border-b border-defaultborder dark:border-defaultborder/10" aria-label="Tabs">
                        <Link to="#" className="hs-tab-active:border-b-2 hs-tab-active:border-b-primary hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer border-e dark:border-defaultborder/10 text-defaulttextcolor py-2 px-4 flex-grow  text-sm font-medium text-center rounded-none active" id="users-item" data-hs-tab="#users-tab-pane" aria-controls="users-tab-pane">
                            <i
                                className="ri-history-line me-1 align-middle inline-block cursor-pointer w-[1.875rem] h-[1.875rem] p-[0.4rem] rounded-full hs-tab-active:bg-primary/10 bg-light"></i>Recent
                        </Link>
                        <Link to="#" className="hs-tab-active:border-b-2 hs-tab-active:border-b-primary hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer border-e dark:border-defaultborder/10 text-defaulttextcolor py-2 px-4 text-sm flex-grow font-medium text-center  rounded-none " id="groups-item" data-hs-tab="#groups-tab-pane" aria-controls="groups-tab-pane">
                            <i
                                className="ri-group-2-line me-1 align-middle inline-block w-[1.875rem] h-[1.875rem] p-[0.4rem] rounded-full hs-tab-active:bg-primary/10 bg-light"></i>Groups
                        </Link>
                        <Link to="#" className="hs-tab-active:border-b-2 hs-tab-active:border-b-primary hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor py-2 px-4 text-sm flex-grow font-medium text-center  rounded-none " id="calls-item" data-hs-tab="#calls-tab-pane" aria-controls="calls-tab-pane">
                            <i className="ri-phone-line me-1 align-middle inline-block w-[1.875rem] h-[1.875rem] p-[0.4rem] rounded-full hs-tab-active:bg-primary/10 bg-light"></i>Calls
                        </Link>
                    </nav>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade active show !border-0 chat-users-tab" id="users-tab-pane" aria-labelledby="users-item" role="tabpanel" tabIndex={0}>
                        <SimpleBar style={{ height: 500 }} id="chat-msg-scroll">
                            <ul className="list-none mb-0 mt-2 chat-users-tab" >
                                <li className="!pb-0 !pt-0">
                                    <p className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] font-semibold mb-2 opacity-[0.7]">ACTIVE CHATS</p>
                                </li>
                                <li className="checkforactive">
                                    <Link to="#">
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md online me-2 avatar-rounded">
                                                    <img src={face5} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Sujika <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">1:32PM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Need to go for lunch?</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="checkforactive">
                                    <Link to="#">
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md online me-2 avatar-rounded">
                                                    <img src={face2} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Emiley Jackson <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">12:24PM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0 chat-msg-typing ">
                                                    <span className="chat-msg text-truncate">Typing...</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                    <span
                                                        className="badge bg-success/10 !rounded-full text-success ltr:float-right rtl:float-left">2</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-msg-unread checkforactive" >
                                    <Link to="#" >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md online me-2 avatar-rounded">
                                                    <img src={face10} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    McGreggor <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">1:16PM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Nice to meet you 😊</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="checkforactive">
                                    <Link to="#" >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md online me-2 avatar-rounded">
                                                    <img src={face8} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Alissa <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">12:45PM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Chat with you
                                                        later,bye</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="!pb-0 !pt-0">
                                    <p className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] font-semibold mb-2 opacity-[0.7]">ALL CHATS</p>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#" >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded" >
                                                    <img src={face11} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Andreas <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">11:54AM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Congratulations on your new
                                                        project</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#"  >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face3} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Melissa Sean <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">9:45AM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Nice work,Congrats
                                                        👏</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#" >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face6} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Samantha Paul <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">8:31AM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Great work keep it up
                                                        :-)</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#" >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face4} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Megan Fox <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">7:23AM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">You are need to be
                                                        appreaciated for what you have done,congs</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#" >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face13} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Nicholas Sams <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">10:22AM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Great Project</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#" >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face15} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Pope Johnson <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">9:10AM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate">Hike management
                                                        fixed</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </SimpleBar>
                        </div>
                        <div className="tab-pane fade hidden !border-0 chat-groups-tab" id="groups-tab-pane" aria-labelledby="groups-item" role="tabpanel" tabIndex={0}>
                        <SimpleBar style={{ height: 500 }}>
                            <ul className="list-none mb-0 mt-2">
                                <li className="!pb-0">
                                    <p className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] font-semibold mb-1 opacity-[0.7]">MY CHAT GROUPS</p>
                                </li>
                                <li>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="mb-0">1) Family Together</p>
                                            <p className="mb-0"><span className="badge bg-success/10 text-success">4
                                                Online</span></p>
                                        </div>
                                        <div className="avatar-list-stacked my-auto">
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face2} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face8} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face2} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face10} alt="img" />
                                            </span>
                                            <Link className="avatar avatar-sm bg-primary text-white avatar-rounded"
                                                to="#">
                                                +19
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="mb-0">2) Work Buddies </p>
                                            <p className="mb-0"><span className="badge bg-secondary/10 text-secondary">32
                                                Online</span></p>
                                        </div>
                                        <div className="avatar-list-stacked my-auto">
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face1} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face7} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face3} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face9} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face12} alt="img" />
                                            </span>
                                            <Link className="avatar avatar-sm bg-primary text-white avatar-rounded"
                                                to="#">
                                                +123
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="mb-0">3) Friends Forever</p>
                                            <p className="mb-0"><span className="badge bg-warning/10 text-warning">3
                                                Online</span></p>
                                        </div>
                                        <div className="avatar-list-stacked my-auto">
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face4} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face8} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face13} alt="img" />
                                            </span>
                                            <Link className="avatar avatar-sm bg-primary text-white avatar-rounded"
                                                to="#">
                                                +15
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="mb-0">4) Social Media Deals</p>
                                            <p className="mb-0"><span className="badge bg-danger/10 text-danger">5
                                                Online</span></p>
                                        </div>
                                        <div className="avatar-list-stacked my-auto">
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face1} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face7} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face14} alt="img" />
                                            </span>
                                            <Link className="avatar avatar-sm bg-primary text-white avatar-rounded"
                                                to="#">
                                                +28
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="mb-0">4) Apartment Group</p>
                                            <p className="mb-0"><span className="badge bg-light text-dark">0 Online</span>
                                            </p>
                                        </div>
                                        <div className="avatar-list-stacked my-auto">
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face5} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face6} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face12} alt="img" />
                                            </span>
                                            <span className="avatar avatar-sm avatar-rounded">
                                                <img src={face3} alt="img" />
                                            </span>
                                            <Link className="avatar avatar-sm bg-primary text-white avatar-rounded"
                                                to="#">
                                                +53
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-none !mb-0 mt-2 ">
                                <li className="!pb-0">
                                    <p className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] font-semibold mb-1 opacity-[0.7]">GROUP CHATS</p>
                                </li>
                                <li className="checkforactive">
                                    <Link to="#" 
                                    // onclick="changeTheInfo(this,'Family Together 😍','17','online')"
                                    >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md online me-2 avatar-rounded">
                                                    <img src={face17} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold" >
                                                    Family Together 😍 <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">12:24PM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0 chat-msg-typing ">
                                                    <span className="chat-msg text-truncate">Hira Typing...</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                    <span
                                                        className="badge bg-success/10 !rounded-full !text-success ltr:float-right rtl:float-left">2</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-msg-unread checkforactive" >
                                    <Link to="#" 
                                    // onclick="changeTheInfo(this,'Work Buddies','18','online')"
                                    >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md online me-2 avatar-rounded">
                                                    <img src={face18} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold" >
                                                    Work Buddies <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">1:16PM</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span className="chat-msg text-truncate"><span
                                                        className="group-indivudial">Rams:</span>Happy to be part of
                                                        this group</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#" 
                                    // onclick="changeTheInfo(this,'Friends Forever 😎','19','offline')"
                                    >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face19} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Friends Forever 😎 <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">3 days
                                                        ago</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span
                                                        className="chat-msg text-truncate">Simon,Melissa,Amanda,Patrick,Siddique</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#"
                                    //  onclick="changeTheInfo(this,'Social Media Deals','20','offline')"
                                     >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face20} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Social Media Deals <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">5 days
                                                        ago</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span
                                                        className="chat-msg text-truncate">Kamalan,Subha,Ambrose,Kiara,Jackson</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="chat-inactive checkforactive" >
                                    <Link to="#"
                                    //  onclick="changeTheInfo(this,'Apartment Group','21','offline')"
                                    >
                                        <div className="flex items-start">
                                            <div className="me-1 leading-none">
                                                <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                    <img src={face21} alt="img" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="mb-0 font-semibold">
                                                    Apartment Group <span
                                                        className="ltr:float-right rtl:float-left text-[#8c9097] dark:text-white/50 font-normal text-[0.6875rem]">12 days
                                                        ago</span>
                                                </p>
                                                <p className="text-[0.75rem] mb-0">
                                                    <span
                                                        className="chat-msg text-truncate">Subman,Rajen,Kairo,Dibasha,Alexa</span>
                                                    <span className="chat-read-icon ltr:float-right rtl:float-left align-middle"><i
                                                        className="ri-check-double-fill"></i></span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                            </SimpleBar>
                        </div>
                        <div className="tab-pane fade hidden !border-0 chat-calls-tab" id="calls-tab-pane" role="tabpanel" aria-labelledby="calls-item" tabIndex={0}>
                        <SimpleBar style={{ height: 500 }}>
                            <ul className="list-none !mb-0 mt-2 chat-calls-tab">
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md online me-2 avatar-rounded">
                                                <img src={face5} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Sujika
                                                <span className="ms-1 incoming-call-success"><i
                                                    className="ti ti-arrow-down-left"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] !mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">Today,12:47PM</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li >
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md online me-2 avatar-rounded">
                                                <img src={face7} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Melissa
                                                <span className="ms-1 outgoing-call-failed"><i
                                                    className="ti ti-arrow-up-right"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">Today,10:27AM</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                <img src={face21} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Sharukh Sam
                                                <span className="ms-1 outgoing-call-success"><i
                                                    className="ti ti-arrow-up-right"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">Yesterday,12:45PM</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-video"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                <img src={face15} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Kiram Kumal
                                                <span className="ms-1 incoming-call-success"><i
                                                    className="ti ti-arrow-down-left"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">3 Days ago</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                <img src={face4} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Amanda Sams
                                                <span className="ms-1 incoming-call-success"><i
                                                    className="ti ti-arrow-down-left"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">22, Oct 2022</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-video"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                <img src={face16} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Azimo Peter
                                                <span className="ms-1 incoming-call-failed"><i
                                                    className="ti ti-arrow-up-right"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">24, Oct 2022</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                <img src={face8} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Sierra Adams
                                                <span className="ms-1 incoming-call-success"><i
                                                    className="ti ti-arrow-down-left"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">22, Oct 2022</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md online me-2 avatar-rounded">
                                                <img src={face3} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Dimple Kanns
                                                <span className="ms-1 incoming-call-success"><i
                                                    className="ti ti-arrow-down-left"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">13, Oct 2022</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-video"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md online me-2 avatar-rounded">
                                                <img src={face9} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Adrea Jaremiah
                                                <span className="ms-1 outgoing-call-failed"><i
                                                    className="ti ti-arrow-up-right"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">13, Sep 2022</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                <img src={face21} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Anjaneliyu
                                                <span className="ms-1 outgoing-call-success"><i
                                                    className="ti ti-arrow-up-right"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">10, July 2022</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <div className="me-1 leading-none">
                                            <span className="avatar avatar-md offline me-2 avatar-rounded">
                                                <img src={face14} alt="img" />
                                            </span>
                                        </div>
                                        <div className="flex-grow my-auto">
                                            <p className="mb-0 font-semibold">
                                                Jason Steph
                                                <span className="ms-1 incoming-call-success"><i
                                                    className="ti ti-arrow-down-left"></i></span>
                                            </p>
                                            <p className="text-[0.75rem] mb-0">
                                                <span className="text-[#8c9097] dark:text-white/50 text-truncate">1, Apr 2022</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-primary">
                                                <i className="ti ti-phone"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            </SimpleBar>
                        </div>
                    </div>
                </div>
                <div className="main-chat-area border dark:border-defaultborder/10">
                    <div className="sm:flex items-center p-2 border-b dark:border-defaultborder/10">
                        <div className="flex items-center leading-none">
                            <span className="avatar avatar-lg online me-4 avatar-rounded chatstatusperson">
                                <img className="chatimageperson" src={face2} alt="img" />
                            </span>
                            <div className="flex-grow">
                                <p className="mb-1 font-semibold text-[.875rem]">
                                    <Link to="#" className="chatnameperson responsive-userinfo-open !text-defaulttextcolor dark:text-defaulttextcolor/70">Emiley Jackson</Link>
                                </p>
                                <p className="text-[#8c9097] dark:text-white/50 mb-0 chatpersonstatus !text-defaultsize">online</p>
                            </div>
                        </div>
                        <div className="flex ms-auto">
                            <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-outline-light dark:border-defaultborder/10 !text-[0.95rem] !ms-2 font-semibold">
                                <i className="ti ti-phone dark:text-defaulttextcolor/70"></i>
                            </button>
                            <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-outline-light  !text-[0.95rem] !ms-2 font-semibold">
                                <i className="ti ti-video dark:text-defaulttextcolor/70"></i>
                            </button>
                            <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-outline-light  !text-[0.95rem] !ms-2 font-semibold responsive-userinfo-open">
                                <i className="ti ti-user-circle" id="responsive-chat-close"></i>
                            </button>
                            <div className="hs-dropdown ti-dropdown">
                                <Link aria-label="anchor" to="#"
                                    className="ti-btn ti-btn-icon ti-btn-outline-light  !text-[0.95rem] !ms-2 font-semibold"
                                    aria-expanded="false">
                                    <i className="fe fe-more-vertical text-[0.8rem]"></i>
                                </Link>
                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Profile</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Clear Chat</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Delete User</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Block User</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        to="#">Report</Link></li>
                                </ul>
                            </div>
                            <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-outline-light  !text-[0.95rem] !ms-2 font-semibold responsive-chat-close">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                    </div>
                    <PerfectScrollbar className="chat-content" id="main-chat-content">

                        <ul className="list-none">
                            <li className="chat-day-label">
                                <span>Today</span>
                            </li>
                            <li className="chat-item-start">
                                <div className="chat-list-inner">
                                    <div className="chat-user-profile">
                                        <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                                            <img className="chatimageperson" src={face2} alt="img" />
                                        </span>
                                    </div>
                                    <div className="ms-4">
                                        <span className="chatting-user-info">
                                            <span className="chatnameperson">Emiley Jackson</span> <span className="msg-sent-time">11:48PM</span>
                                        </span>
                                        <div className="main-chat-msg">
                                            <div>
                                                <p className="mb-0">Nice to meet you 😀</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="chat-item-end">
                                <div className="chat-list-inner">
                                    <div className="me-3">
                                        <span className="chatting-user-info">
                                            <span className="msg-sent-time"><span className="chat-read-mark align-middle inline-flex"><i
                                                className="ri-check-double-line"></i></span>11:50PM</span> You
                                        </span>
                                        <div className="main-chat-msg">
                                            <div>
                                                <p className="mb-0">It is a long established fact that a reader will be
                                                    distracted by the readable content of a page when looking at its
                                                    layout</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-user-profile">
                                        <span className="avatar avatar-md online avatar-rounded">
                                            <img src={face12} alt="img" />
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="chat-item-start">
                                <div className="chat-list-inner">
                                    <div className="chat-user-profile">
                                        <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                                            <img className="chatimageperson" src={face2} alt="img" />
                                        </span>
                                    </div>
                                    <div className="ms-3">
                                        <span className="chatting-user-info">
                                            <span className="chatnameperson">Emiley Jackson</span> <span className="msg-sent-time">11:51PM</span>
                                        </span>
                                        <div className="main-chat-msg">
                                            <div>
                                                <p className="mb-0">Who are you ?</p>
                                            </div>
                                            <div>
                                                <p className="mb-0">I don't know anyone named jeremiah.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="chat-item-end">
                                <div className="chat-list-inner">
                                    <div className="me-3">
                                        <span className="chatting-user-info">
                                            <span className="msg-sent-time"><span className="chat-read-mark align-middle inline-flex"><i
                                                className="ri-check-double-line"></i></span>11:52PM</span> You
                                        </span>
                                        <div className="main-chat-msg">
                                            <div>
                                                <p className="mb-0">Some of the recent images taken are nice 👌</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-user-profile">
                                        <span className="avatar avatar-md online avatar-rounded">
                                            <img src={face15} alt="img" />
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="chat-item-start">
                                <div className="chat-list-inner">
                                    <div className="chat-user-profile">
                                        <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                                            <img className="chatimageperson" src={face2} alt="img" />
                                        </span>
                                    </div>
                                    <div className="ms-3">
                                        <span className="chatting-user-info">
                                            <span className="chatnameperson">Emiley Jackson</span> <span className="msg-sent-time">11:55PM</span>
                                        </span>
                                        <div className="main-chat-msg">
                                            <div>
                                                <p className="mb-0">Here are some of them have a look</p>
                                            </div>
                                            <div>
                                                <p className="mb-0 sm:flex block">
                                                    <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}apps/gallery/`} className="avatar avatar-xl m-1 "><img src={media64} alt="" className="rounded-md" /></Link>
                                                    <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}apps/gallery/`} className="avatar avatar-xl m-1 "><img src={media63} alt="" className="rounded-md" /></Link>
                                                    <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}apps/gallery/`} className="avatar avatar-xl m-1 "><img src={media62} alt="" className="rounded-md" /></Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="chat-item-end">
                                <div className="chat-list-inner">
                                    <div className="me-4">
                                        <span className="chatting-user-info">
                                            <span className="msg-sent-time"><span className="chat-read-mark align-middle inline-flex"><i
                                                className="ri-check-double-line"></i></span>11:52PM</span> You
                                        </span>
                                        <div className="main-chat-msg">
                                            <div className="flex">
                                                <Link aria-label="anchor" to="#" className="text-white"><i
                                                    className="ri-play-circle-line align-middle"></i></Link>
                                                <span className="mx-1 flex flex-wrap">
                                                    <svg width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                    <svg className="chat_audio" width="20" height="20">
                                                        <defs></defs>
                                                        <g transform="matrix(1,0,0,1,0,0)"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            data-name="Layer 3" viewBox="0 0 24 24" width="20"
                                                            height="20">
                                                            <path
                                                                d="M6 19a1 1 0 0 1-1-1V6A1 1 0 0 1 7 6V18A1 1 0 0 1 6 19zM12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 12 18zM9 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0V20A1 1 0 0 1 9 21zM3 17a1 1 0 0 1-1-1V8A1 1 0 0 1 4 8v8A1 1 0 0 1 3 17zM21 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 21 16zM15 16a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6A1 1 0 0 1 15 16zM18 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0V17A1 1 0 0 1 18 18z"
                                                                fill="rgba(255, 255, 255, 0.5)"
                                                            ></path>
                                                        </svg></g>
                                                    </svg>
                                                </span>
                                                <Link aria-label="anchor" to="#" className="text-white"><i
                                                    className="ri-download-2-line align-middle"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-user-profile">
                                        <span className="avatar avatar-md online avatar-rounded">
                                            <img src={face15} alt="img" />
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="chat-item-start">
                                <div className="chat-list-inner">
                                    <div className="chat-user-profile">
                                        <span className="avatar avatar-md online avatar-rounded">
                                            <img className="chatimageperson" src={face2} alt="img" />
                                        </span>
                                    </div>
                                    <div className="ms-3">
                                        <span className="chatting-user-info chatnameperson">
                                            Emiley Jackson <span className="msg-sent-time">11:45PM</span>
                                        </span>
                                        <div className="main-chat-msg">
                                            <div>
                                                <p className="mb-0">Happy to talk with you,chat you later 👋</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                       
                    </PerfectScrollbar>
                    <div className="chat-footer">
                        <input className="form-control w-full !rounded-md" placeholder="Type your message here..." type="text" />
                        <Link aria-label="anchor" className="ti-btn ti-btn-icon !mx-2 ti-btn-success" to="#">
                            <i className="ri-emotion-line"></i>
                        </Link>
                        <Link aria-label="anchor" className="ti-btn bg-primary text-white  ti-btn-icon ti-btn-send" to="#">
                            <i className="ri-send-plane-2-line"></i>
                        </Link>
                    </div>
                </div>
                <div className="chat-user-details border dark:border-defaultborder/10 !p-0" id="chat-user-details">
                <PerfectScrollbar className="p-6">
                    <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-outline-light my-1 ms-2 responsive-chat-close2 xxl:hidden"> <i className="ri-close-line"></i> </button>
                    <div className="text-center mb-[3rem]">
                        <span className="avatar avatar-rounded online avatar-xxl me-2 mb-4 chatstatusperson">
                            <img className="chatimageperson" src={face2} alt="img" />
                        </span>
                        <p className="mb-1 text-[0.9375rem] font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70 leading-none chatnameperson ">Emiley Jackson</p>
                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 !mb-4"><span className="chatnameperson">emaileyjackson2134</span>@gmail.com</p>
                        <p className="text-center mb-0">
                            <button type="button" aria-label="button" className="ti-btn ti-btn-icon !rounded-full ti-btn-primary"><i
                                className="ri-phone-line"></i></button>
                            <button type="button" aria-label="button" className="ti-btn ti-btn-icon !rounded-full ti-btn-primary !ms-2"><i
                                className="ri-video-add-line"></i></button>
                            <button type="button" aria-label="button" className="ti-btn ti-btn-icon !rounded-full ti-btn-primary !ms-2"><i
                                className="ri-chat-1-line"></i></button>
                        </p>
                    </div>
                    <div className="mb-[3rem]">
                        <div className="font-semibold mb-6 dark:text-defaulttextcolor/70  text-defaultsize">Shared Files
                            <span className="badge bg-primary/10 !rounded-full text-primary ms-1">4</span>
                            <span className="ltr:float-right rtl:float-left text-[0.6875rem]"><Link to="#" className="text-primary underline"><u>View All</u></Link></span>
                        </div>
                        <ul className="shared-files list-none">
                            <li className="!mb-4">
                                <div className="flex items-center">
                                    <div className="me-2">
                                        <span className="shared-file-icon">
                                            <i className="ti ti-file-text"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-[0.75rem] font-semibold mb-0 dark:text-defaulttextcolor/70 ">Project Details.pdf</p>
                                        <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.6875rem]">24,Oct 2022 - 14:24PM</p>
                                    </div>
                                    <div className="!text-[1.125rem]">
                                        <Link aria-label="anchor" to="#"><i className="ri-download-2-line text-[#8c9097] dark:text-white/50"></i></Link>
                                    </div>
                                </div>
                            </li>
                            <li className="!mb-4">
                                <div className="flex items-center">
                                    <div className="me-2">
                                        <span className="shared-file-icon">
                                            <i className="ri-image-line"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-[0.75rem] font-semibold mb-0 dark:text-defaulttextcolor/70">Img_02.Jpg</p>
                                        <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.6875rem]">22,Oct 2022 - 10:19AM</p>
                                    </div>
                                    <div className="!text-[1.125rem]">
                                        <Link aria-label="anchor" to="#"><i className="ri-download-2-line text-[#8c9097] dark:text-white/50"></i></Link>
                                    </div>
                                </div>
                            </li>
                            <li className="!mb-4">
                                <div className="flex items-center">
                                    <div className="me-2">
                                        <span className="shared-file-icon">
                                            <i className="ri-image-line"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-[0.75rem] font-semibold mb-0 dark:text-defaulttextcolor/70">Img_15.Jpg</p>
                                        <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.6875rem]">22,Oct 2022 - 10:18AM</p>
                                    </div>
                                    <div className="!text-[1.125rem]">
                                        <Link aria-label="anchor" to="#"><i className="ri-download-2-line text-[#8c9097] dark:text-white/50"></i></Link>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <div className="me-2">
                                        <span className="shared-file-icon">
                                            <i className="ri-video-line"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-[0.75rem] font-semibold mb-0 dark:text-defaulttextcolor/70">Video_15_02_2022.MP4</p>
                                        <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.6875rem]">22,Oct 2022 - 10:18AM</p>
                                    </div>
                                    <div className="">
                                        <Link aria-label="anchor" to="#"><i className="ri-download-2-line text-[#8c9097] dark:text-white/50 !text-[1.125rem]"></i></Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-0">
                        <div className="font-semibold mb-4 text-defaultsize dark:text-defaulttextcolor/70">Photos &amp; Media
                            <span className="badge bg-primary/10 !rounded-full text-primary ms-1">22</span>
                            <span className="ltr:float-right rtl:float-left text-[0.6875rem]"><Link to="#" className="text-primary underline"><u>View All</u></Link></span>
                        </div>
                        <div className="grid grid-cols-12 gap-x-[1rem]">
                            {Photosmediadata.map((idx)=>(
                            <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-4" key={Math.random()}>
                                <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}apps/gallery/`} className="chat-media">
                                    <img src={idx.src} alt="" />
                                </Link>
                            </div>
                            ))}
                        </div>
                    </div>
                </PerfectScrollbar>
                </div>
            </div>
  </Fragment>
);}

export default Chat;
