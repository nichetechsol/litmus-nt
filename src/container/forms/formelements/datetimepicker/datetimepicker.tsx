import  { FC, Fragment, useState } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import DatePicker from 'react-datepicker';
import {  setHours, setMinutes } from "date-fns";
interface DatetimepickerProps {}

const Datetimepicker: FC<DatetimepickerProps> = () => {
  const [startDate, setStartDate] = useState<any>(new Date());
	const [startDate1, setStartDate1] = useState<any>(new Date());
	const [startDate2, setStartDate2] = useState<any>(new Date());
	const [startDate3, setStartDate3] = useState<any>(new Date());
	const [startDate4, setStartDate4] = useState<any>(new Date());
	const [startDate5, setStartDate5] = useState<any>(new Date());

    const [startDate6, setStartDate6] = useState<any>(new Date());


    	// Date picker With Time

	    	// Date picker With Time

            const [startTime, setStartTime] = useState<any>(
                setHours(setMinutes(new Date(), 30), 17)
            );
        
                //range data picker
        
            const [dateRange, setDateRange] = useState<any>([null, null]);
            const [startsDate5, endDate] = dateRange;
        
  return(
  <Fragment>
                <Pageheader currentpage="Date Time Picker" activepage="Form Elements" mainpage="Date Time Picker" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Date picker
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                    <DatePicker placeholderText="Choose date" className="ti-form-input  focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Date picker With Time
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                    <DatePicker className="ti-form-input  focus:z-10" selected={startTime} onChange={(date) => setStartTime(date)} showTimeSelect minTime={setHours(setMinutes(new Date(), 0), 17)} maxTime={setHours(setMinutes(new Date(), 30), 20)} dateFormat="MMMM d, yyyy h:mm aa" />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Human Friendly dates
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                    <DatePicker className="ti-form-input  focus:z-10" selected={startDate1} onChange={(date2) => setStartDate1(date2)}  showTimeSelect timeFormat="p" timeIntervals={15} dateFormat="Pp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Date range picker
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                    <DatePicker className="ti-form-input  focus:z-10" placeholderText="Choose Date" selectsRange={true} startDate={startsDate5} endDate={endDate} onChange={(update) => { setDateRange(update); }} isClearable={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Time picker
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-time-line"></i> </div>
                                    <DatePicker className="ti-form-input  focus:z-10" selected={startDate3} onChange={(date) => setStartDate3(date)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Time Pickr with 24hr Format
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-time-line"></i> </div>
                                    <DatePicker className="ti-form-input  focus:z-10" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Time Picker with Limits
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-time-line"></i> </div>
                                    <DatePicker className="ti-form-input  focus:z-10" selected={startDate4} onChange={(date) => setStartDate4(date)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                DateTimePicker with Limited Time Range
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group !flex-nowrap">
                                    <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-time-line"></i> </div>
                                    <DatePicker className="ti-form-input  focus:z-10" selected={startTime} onChange={(date) => setStartTime(date)} showTimeSelect minTime={setHours(setMinutes(new Date(), 0), 17)} maxTime={setHours(setMinutes(new Date(), 30), 20)} dateFormat="MMMM d, yyyy h:mm aa" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="grid grid-cols-12">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Date Picker with week numbers
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group mb-0">
                                        <div className="input-group !flex-nowrap">
                                            <div className="input-group-text text-[#8c9097] dark:text-white/50"> <i className="ri-calendar-line"></i> </div>
                                            <DatePicker className="ti-form-input  focus:z-10" showIcon selected={startDate2} onChange={(date) => setStartDate2(date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Inline Time Picker
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group mb-0">
                                        <DatePicker className="ti-form-input focus:z-10" selected={startDate5} onChange={(date) => setStartDate5(date)} inline showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Inline Calendar
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="form-group overflow-auto">
                                <DatePicker selected={startDate6} onChange={(date) => setStartDate6(date)} inline/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Datetimepicker;
