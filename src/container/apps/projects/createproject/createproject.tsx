import  { FC, Fragment, useState } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import Select from "react-select";
import Editordata, { multiselectdata } from './createdata';
import DatePicker from 'react-datepicker';
import CreatableSelect from 'react-select/creatable';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

interface CreateprojectProps {}

const Createproject: FC<CreateprojectProps> = () => {
            //
            const components = {
                DropdownIndicator: null,
              };
            
              const createOption = (label:any) => ({
                label,
                value: label,
              });
            
              const [inputValue, setInputValue] = useState('');
              const [value, setValue] = useState([
                createOption("Marketing"),
                createOption(" Sales"),
                createOption(" Development"),
                createOption(" Design"),
                createOption(" Research")
              ]);
              const handleKeyDown = (event:any) => {
                if (!inputValue) return;
                switch (event.key) {
                  case 'Enter':
                  case 'Tab':
                    setValue((prev) => [...prev, createOption(inputValue)]);
                    setInputValue('');
                    event.preventDefault();
                }
              };
              const [files, setFiles] = useState<any>([]);
              const [startDate, setStartDate] = useState(new Date());
              const [startDate1, setStartDate1] = useState(new Date());

  const handleDateChange = (date:any) => {
      // Ensure date is defined before setting it
      if (date) {
          setStartDate(date);
      }
  };
  const handleDateChange1 = (date1:any) => {
    // Ensure date is defined before setting it
    if (date1) {
        setStartDate1(date1);
    }
};
  const Data = [
    { value: 1, label: 'High' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Medium' },
];
const Data1 = [
    { value: 1, label: 'Inprogress' },
    { value: 2, label: 'On hold' },
    { value: 3, label: 'completed' },
];



  return(
  <Fragment>
     <Pageheader currentpage="Create Project" activepage="Projects" mainpage="Create Project" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Create Project
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="input-label" className="form-label">Project Name :</label>
                                    <input type="text" className="form-control" id="input-label" placeholder="Enter Project Name" />
                                </div>
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="input-label1" className="form-label">Project Manager :</label>
                                    <input type="text" className="form-control" id="input-label1" placeholder="Project Manager Name" />
                                </div>
                                <div className="xl:col-span-4 col-span-12">
                                    <label htmlFor="input-label1" className="form-label">Client / Stakeholder :</label>
                                    <input type="text" className="form-control" placeholder="Enter Client Name" />
                                </div>
                                <div className="xl:col-span-12 col-span-12 mb-4">
                                    <label htmlFor="text-area" className="form-label">Project Description :</label>
                                    <div id="project-descriptioin-editor">
                                         <Editordata placeholder={'Write something...'} />
                                    </div>
                                </div>

                                <div className="xl:col-span-6 col-span-12">
                                    <label className="form-label">Start Date :</label>
                                    <div className="form-group">
                                        <div className="input-group !flex-nowrap">
                                            <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                            <DatePicker selected={startDate}
                                                placeholderText='Choose date and time'
                                                onChange={handleDateChange}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="form-label">End Date :</label>
                                    <div className="form-group">
                                        <div className="input-group !flex-nowrap">
                                            <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                            <DatePicker
                                            selected={startDate1}
                                                placeholderText='Choose date and time'
                                                onChange={handleDateChange1}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="form-label">Status :</label>
                                    <Select  name="colors" options={Data1} className="" classNamePrefix="Select2"
                                         />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="form-label">Priority :</label>
                                    <Select  name="colors" options={Data} className="" classNamePrefix="Select2"
                                        />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                <label className="form-label">Assigned To</label>
                                    <Select isMulti name="colors" options={multiselectdata} className="" classNamePrefix="Select2"
                                        defaultValue={[multiselectdata[0], multiselectdata[9], multiselectdata[4]]} />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <label className="form-label">Tags</label>
                                    <CreatableSelect
                                                components={components}
                                                classNamePrefix='react-select'
                                                inputValue={inputValue}
                                                isClearable
                                                isMulti
                                                menuIsOpen={false}
                                                onChange={(newValue) => {
                                                    if (Array.isArray(newValue)) {
                                                    setValue(newValue);
                                                    } else {
                                                    setValue([]);
                                                    }
                                                }}
                                                onInputChange={(newValue) => setInputValue(newValue)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Type something and press enter..."
                                                value={value}
                                                />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="text-area" className="form-label">Attachments</label>
                                    <FilePond className="multiple-filepond"
                                                            files={files}
                                                            onupdatefiles={setFiles}
                                                            allowMultiple={true}
                                                            maxFiles={6}
                                                            name="files"
                                                            labelIdle='Drag & Drop your file here or click '
                                                        />
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="button" className="ti-btn ti-btn-primary btn-wave ms-auto float-right">Create Project</button>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Createproject;
