import  { FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../components/common/pageheader/pageheader';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import face1 from "../../../assets/images/faces/1.jpg";
import face2 from "../../../assets/images/faces/2.jpg";
import face3 from "../../../assets/images/faces/3.jpg";
import face5 from "../../../assets/images/faces/5.jpg";
import face6 from "../../../assets/images/faces/6.jpg";
import face8 from "../../../assets/images/faces/8.jpg";
import face9 from "../../../assets/images/faces/9.jpg";
import face10 from "../../../assets/images/faces/10.jpg";
import face11 from "../../../assets/images/faces/11.jpg";
import face12 from "../../../assets/images/faces/12.jpg";
import face13 from "../../../assets/images/faces/13.jpg";
import face14 from "../../../assets/images/faces/14.jpg";
import face15 from "../../../assets/images/faces/15.jpg";
import face16 from "../../../assets/images/faces/16.jpg";
import face21 from "../../../assets/images/faces/21.jpg";
import media66 from "../../../assets/images/media/media-66.png";

interface TodolistProps {}

const Todolist: FC<TodolistProps> = () => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const handleDateChange = (date: Date | null) => {
      // Ensure date is defined before setting it
      if (date) {
          setStartDate(date);
      }
  };
  const [startDate1, setStartDate1] = useState<any>(new Date());
  const handleDateChange1 = (date: Date | null) => {
      // Ensure date is defined before setting it
      if (date) {
          setStartDate1(date);
      }
  };
  const Option1 = [
    { value: 'Angelina May', label: 'Angelina May' },
    { value: 'Kiara advain', label: 'Kiara advain' },
    { value: 'Hercules Jhon', label: 'Hercules Jhon' },
    { value: 'Mayor Kim', label: 'Mayor Kim' },
];
const Option2 = [
    { value: 'Select', label: 'Select' },
    { value: 'Critical', label: 'Critical' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
];
  return(
  <Fragment>
        <Pageheader currentpage="Todo List" activepage="Pages" mainpage="Todo List" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-body !p-0">
                            <div className="p-4 grid border-b border-dashed dark:border-defaultborder/10">
                                <Link to="#" className="hs-dropdown-toggle py-2  px-3 ti-btn bg-primary text-white !font-medium w-full !mb-0" data-hs-overlay="#todo-compose"><i className="ri-add-circle-line !text-[1rem]"></i>Create New Task
                                </Link>
                                <div id="todo-compose" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title text-[1rem] font-semibold" id="mail-ComposeLabel">Create Task</h6>
                                                <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#todo-compose">
                                                    <span className="sr-only">Close</span>
                                                    <i className="ri-close-line"></i>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body !overflow-visible px-4">
                                                <div className="grid grid-cols-12 gap-4">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Task Name</label>
                                                        <input type="text" className="form-control w-full" id="task-name" placeholder="Task Name" />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label className="ti-form-label">Assigned To</label>
                                                         <Select isMulti name="colors" options={Option1} className="!p-0 ti-form-select !rounded-s-none"
                                                    menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Option1[0]]} />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Assigned Date</label>
                                                        <div className="inline-flex w-full">
                                                            <div className="input-group-text text-[#8c9097] dark:text-white/50 !rounded-e-none border border-defaultborder"> <i className="ri-calendar-line"></i> </div>
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={handleDateChange}
                                                                timeInputLabel="Time:"
                                                                dateFormat="yy/MM/dd h:mm aa"
                                                                placeholderText='Choose date and time'
                                                                showTimeInput
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Target Date</label>
                                                        <div className="inline-flex w-full">
                                                            <div className="input-group-text text-[#8c9097] dark:text-white/50 !rounded-e-none border border-defaultborder"> <i className="ri-calendar-line"></i> </div>
                                                              <DatePicker
                                                                selected={startDate1}
                                                                onChange={handleDateChange1}
                                                                timeInputLabel="Time:"
                                                                dateFormat="yy/MM/dd h:mm aa"
                                                                placeholderText='Choose date and time'
                                                                showTimeInput
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label className="ti-form-label">Priority</label>
                                                              <Select name="colors" options={Option2} className="basic-multi-select" isSearchable
                                menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Option2[0]]}
                            />
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
                                        <span className="text-[.6875rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] font-semibold">TASKS</span>
                                    </li>
                                    <li className="active">
                                        <Link to="#">
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
                                        <Link to="#">
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
                                        <Link to="#">
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
                                    <li className="!px-0 !pt-2">
                                        <span className="text-[.6875rem] text-[#8c9097] dark:text-white/50 op-7 font-semibold">CATEGORIES</span>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[.875rem] font-semibold text-primary"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    Personal
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[.875rem] font-semibold text-secondary"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    Work
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[.875rem] font-semibold text-warning"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    Health &amp; Fitness
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[.875rem] font-semibold text-success"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    Daily Goals
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <div className="flex items-center">
                                                <span className="me-2 leading-none">
                                                    <i className="ri-price-tag-line align-middle text-[.875rem] font-semibold text-danger"></i>
                                                </span>
                                                <span className="flex-grow whitespace-nowrap">
                                                    Financial Management
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 !flex items-center justify-center">
                                <img src={media66} alt="" />
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
                                            <h6 className="font-semibold mb-0 text-[1rem]">Tasks</h6>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <nav className="-mb-0.5 sm:flex sm:space-x-6 rtl:space-x-reverse flex-wrap">
                                                <Link className="w-full flex sm:w-auto active hs-tab-active:font-semibold  hs-tab-active:text-primary hs-tab-active:bg-primary/10 rounded-md py-2 px-3 text-sm" to="#" id="alltasks-item" data-hs-tab="#all-tasks" aria-controls="all-tasks">
                                                    All Tasks
                                                </Link>
                                                <Link className="w-full flex sm:w-auto hs-tab-active:font-semibold  hs-tab-active:text-primary hs-tab-active:bg-primary/10 rounded-md  py-2 px-3  text-sm" to="#" id="pending-item" data-hs-tab="#pending" aria-controls="pending">
                                                    Pending
                                                </Link>
                                                <Link className="w-full flex sm:w-auto hs-tab-active:font-semibold  hs-tab-active:text-primary hs-tab-active:bg-primary/10 rounded-md  py-2 px-3  text-sm" to="#" id="in-progress-item" data-hs-tab="#in-progress" aria-controls="in-progress">
                                                    In Progress
                                                </Link>
                                                <Link className="w-full flex sm:w-auto hs-tab-active:font-semibold  hs-tab-active:text-primary hs-tab-active:bg-primary/10 rounded-md  py-2 px-3 text-sm" to="#" id="completed-item" data-hs-tab="#completed" aria-controls="completed">
                                                    Completed
                                                </Link>
                                            </nav>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <div className="hs-dropdown ti-dropdown">
                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-light !mb-0" aria-expanded="false">
                                                    <i className="ti ti-dots-vertical"></i>
                                                </button>
                                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" to="#">Select All</Link></li>
                                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" to="#">Share All</Link></li>
                                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" to="#">Delete All</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="tab-content task-tabs-container">
                                <div className="tab-pane show active !p-0" id="all-tasks" aria-labelledby="alltasks-item"
                                    role="tabpanel">
                                    <div className="grid grid-cols-12 gap-x-6" id="tasks-container">
                                        <div className="xl:col-span-4 col-span-12 task-card">
                                            <div className="box task-pending-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>New Project Blueprint</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">13,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">20,Nov 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
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
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-warning/10 text-warning block">High</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box task-inprogress-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Designing New Authentication Pages</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">26,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">12,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face6} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face15} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-success/10 text-success block">Low</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center">
                                                                <Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>Developing New Events in Plugin</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">5,Dec 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">10,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face5} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face8} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face11} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-primary/10 text-primary block">Medium</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12 task-card">
                                            <div className="box task-inprogress-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Design New Landing Pages </p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">21,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">28,Nov 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face1} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face5} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face12} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-primary/10 text-primary block">Medium</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>New Plugin Development</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">28,Oct 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">28,Nov 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face3} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face8} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face9} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-success/10 text-success block">Low</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>Documentation For New Template</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">25,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">10,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face8} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face10} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face11} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-danger/10 text-danger block">Critical</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12 task-card">
                                            <div className="box task-pending-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center">
                                                                <Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Updating Old Ui</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">30,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">05,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face14} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face13} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face21} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face16} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-warning/10 text-warning block">High</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>Designing Of New Ecommerce Pages</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">1,Dec 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">15,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face1} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face3} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face6} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-success/10 text-success block">Low</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box task-inprogress-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Improving Ui Of Updated Templates</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">4,Dec 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">20,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face9} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face13} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-primary/10 text-primary block">Medium</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane !p-0 hidden" id="pending" aria-labelledby="pending-item"
                                    role="tabpanel">
                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-pending-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>New Project Blueprint</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">13,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">20,Nov 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
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
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-warning/10 text-warning block">High</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-pending-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center">
                                                                <Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Updating Old Ui</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">30,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">05,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face14} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face13} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face21} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face16} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-warning/10 text-warning block">High</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane !p-0 hidden" id="in-progress" aria-labelledby="inprocess-item"
                                    role="tabpanel">
                                    <div className="grid grid-cols-12 gap-x-6">
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-inprogress-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Design New Landing Pages </p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">21,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">28,Nov 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face1} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face5} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face12} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-primary/10 text-primary block">Medium</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-inprogress-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Designing New Authentication Pages</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">26,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">12,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face6} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face15} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-success/10 text-success block">Low</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-inprogress-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] me-1 text-warning"></i></Link>Improving Ui Of Updated Templates</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">4,Dec 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">20,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face9} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face13} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-primary/10 text-primary block">Medium</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane !p-0 hidden" id="completed" aria-labelledby="completed-item"
                                    role="tabpanel">
                                    <div className="grid grid-cols-12 gap-x-6">
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>New Plugin Development</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">28,Oct 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">28,Nov 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face3} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face8} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face9} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-success/10 text-success block">Low</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>Documentation For New Template</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">25,Nov 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">10,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face8} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face10} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face11} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-danger/10 text-danger block">Critical</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center">
                                                                <Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>Developing New Events in Plugin</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">5,Dec 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">10,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face5} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face8} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face11} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-primary/10 text-primary block">Medium</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <div className="box task-completed-card">
                                                <div className="box-body">
                                                    <div className="flex justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="font-semibold mb-4 flex items-center"><Link aria-label="anchor" to="#"><i className="ri-star-s-fill text-[1rem] opacity-[0.5] me-1 text-[#8c9097] dark:text-white/50"></i></Link>Designing Of New Ecommerce Pages</p>
                                                            <p className="mb-4">Assigned On : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">1,Dec 2022</span></p>
                                                            <p className="mb-4">Target Date : <span className="text-[0.75rem] mb-1 text-[#8c9097] dark:text-white/50">15,Dec 2022</span></p>
                                                            <p className="mb-0">Assigned To :
                                                                <span className="avatar-list-stacked ms-1">
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face1} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face3} alt="img" />
                                                                    </span>
                                                                    <span className="avatar avatar-sm avatar-rounded">
                                                                        <img src={face6} alt="img" />
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div className="btn-list">
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm  ti-btn-primary me-[0.375rem]"><i className="ri-edit-line"></i></button>
                                                                <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-danger me-0"><i className="ri-delete-bin-line"></i></button>
                                                            </div>
                                                            <span className="badge bg-success/10 text-success block">Low</span>
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
                    <nav aria-label="Page navigation">
                        <ul className="ti-pagination ltr:float-right rtl:float-left mb-4">
                            <li className="page-item disabled"><Link className="page-link px-3 py-[0.375rem]" to="#">Previous</Link></li>
                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                            <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
  </Fragment>
);}

export default Todolist;
