import { FC, Fragment, useState } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import Select from 'react-select';
import { Multipleselectdata, Multipleselectdata1, Optionwithnosearch, SingleGroup, basicselect, defaultselect, multiDropdownSelect, singleselect } from './formselectdata';
import CreatableSelect from 'react-select/creatable';
interface FormselectProps { }

const Formselect: FC<FormselectProps> = () => {
  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label: any) => ({
    label,
    value: label,
  });

  const [inputValue, setInputValue] = useState<any>('');
  const [value, setValue] = useState([
    createOption("one"),
    createOption("two"),
    createOption("three")
  ]);
  const handleKeyDown = (event: any) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };
  const [inputValue1, setInputValue1] = useState<any>('');
  const [value1, setValue1] = useState([
    createOption("child-1"),
    createOption("child-2")
  ]);

  const handleKeyDown1 = (event: any) => {
    if (!inputValue1) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue1((prev) => [...prev, createOption(inputValue1)]);
        setInputValue1('');
        event.preventDefault();
    }
  };

  return (
    <Fragment>

      <Pageheader currentpage="Form Select" activepage="Form Elements" mainpage="Form Select" />
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Default Select</h5>
            </div>
            <div className="box-body">
              <Select classNamePrefix='react-select' id='react-select-3-live-region' options={defaultselect} placeholder='Open this select menu' />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Pilled Select</h5>
            </div>
            <div className="box-body">
              <Select classNamePrefix='react-select' id='react-select-3-live-region' options={defaultselect} placeholder='Open this select menu' />

            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Disabled Select</h5>
            </div>
            <div className="box-body">
              <select className="opacity-70 pointer-events-none ti-form-select rounded-sm !py-2 !px-3" disabled>
                <option>Open this select menu</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Select With Hidden Label</h5>
            </div>
            <div className="box-body">
              <label htmlFor="hs-hidden-select" className="sr-only">Label</label>
              <Select classNamePrefix='react-select' id='react-select-3-live-region' options={defaultselect} placeholder='Open this select menu' />

            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-6 xl:!col-span-4">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Select With Label</h5>
            </div>
            <div className="box-body">
              <label htmlFor="hs-select-label" className="ti-form-select rounded-sm !py-2 ">Label</label>
              <Select classNamePrefix='react-select' id='react-select-3-live-region' options={defaultselect} placeholder='Open this select menu' />

            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 xl:!col-span-4">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Select Sizes</h5>
            </div>
            <div className="box-body">
              <div className="space-y-3">
                <Select classNamePrefix='react-select' className='py-[0.15rem] !text-[12px] !px-0 ti-form-select' options={defaultselect} placeholder='Open this select menu' />
                <Select className='ti-form-select sm:p-4 !px-0 !py-2' classNamePrefix='react-select' options={defaultselect} placeholder='Open this select menu' />
                <Select className='ti-form-select sm:p-5 !px-0 !py-3 !text-[16px]' classNamePrefix='react-select' options={defaultselect} placeholder='Open this select menu' />

              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-4">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Select With Validation States</h5>
            </div>
            <div className="box-body">
              <div className="space-y-3">
                <div>
                  <label htmlFor="select-1" className="ti-form-select rounded-sm !py-2 ">Label</label>
                  <div className="relative">
                    <Select classNamePrefix='react-select' className='ti-form-select rounded-sm !py-2 !px-0 pe-16 !border-red focus:border-red focus:ring-red' aria-valid='false' options={defaultselect} placeholder='Open this select menu' />

                    <div className="absolute inset-y-0 end-7 flex items-center pointer-events-none pe-8">
                      <svg className="h-4 w-4 text-red" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-red mt-2">Please select a valid state.</p>
                </div>

                <div>
                  <label htmlFor="select-2" className="ti-form-select rounded-sm !py-2 ">Label</label>
                  <div className="relative">
                    <Select classNamePrefix='react-select'
                     className='ti-form-select rounded-sm !py-2 !px-0 pe-16 !border-green focus:border-green focus:ring-green' 
                     aria-valid='false' options={defaultselect} placeholder='Open this select menu' />
                    <div className="absolute inset-y-0 end-7 flex items-center pointer-events-none pe-8">
                      <svg className="h-4 w-4 text-green" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.6091 3.41829C13.8594 3.68621 14 4.04952 14 4.42835C14 4.80718 13.8594 5.1705 13.6091 5.43841L6.93313 12.5817C6.68275 12.8495 6.3432 13 5.98916 13C5.63511 13 5.29556 12.8495 5.04518 12.5817L2.3748 9.72439C2.13159 9.45494 1.99701 9.09406 2.00005 8.71947C2.00309 8.34488 2.14351 7.98656 2.39107 7.72167C2.63862 7.45679 2.9735 7.30654 3.32359 7.30328C3.67367 7.30002 4.01094 7.44403 4.26276 7.70427L5.98916 9.55152L11.7211 3.41829C11.9715 3.15046 12.3111 3 12.6651 3C13.0191 3 13.3587 3.15046 13.6091 3.41829Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-green mt-2">Looks good!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12  md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Tom Select Input</h5>
            </div>
            <div className="box-body">
              <CreatableSelect isMulti classNamePrefix='react-select'  />
            </div>
          </div>
        </div>
        <div className="col-span-12  md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic Tom Select</h5>
            </div>
            <div className="box-body">
              <Select classNamePrefix='react-select' className='ti-form-select rounded-sm !p-0' options={basicselect} placeholder='Select a person' />
            </div>
          </div>
        </div>
        <div className="col-span-12  md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Disabled Tom Select</h5>
            </div>
            <div className="box-body">
              <select className="ti-form-select rounded-sm" id="select-beast-disabled" autoComplete="off" disabled>
                <option defaultValue="">Select a person...</option>
                <option defaultValue="4">Thomas Edison</option>
                <option defaultValue="1">Nikola</option>
                <option defaultValue="3">Nikola Tesla</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-12  md:col-span-6 xl:!col-span-3">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Multiple Tom Select</h5>
            </div>
            <div className="box-body">
              <Select className="ti-form-select rounded-sm !p-0" isMulti options={multiDropdownSelect} classNamePrefix='react-select'
                defaultValue={[multiDropdownSelect[4]]}
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Choices Multiple Select</h5>
            </div>
            <div className="box-body">
              <label className="ti-form-select rounded-sm !py-2 ">Default Choices Select</label>
              <Select isMulti name="colors" options={Multipleselectdata} className="default basic-multi-select" id="choices-multiple-default"
                menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Multipleselectdata[0]]}
              />
              <label className="ti-form-select rounded-sm !py-2 ">With Remove Button</label>
              <Select isMulti name="colors" options={Multipleselectdata1} className="basic-multi-select" id="choices-multiple-default"
                menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Multipleselectdata1[0]]}
              />
              <label className="ti-form-select rounded-sm !py-2 ">Option groups</label>
              <SingleGroup />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Single Select</h5>
            </div>
            <div className="box-body">
              <label className="ti-form-select rounded-sm !py-2 ">Default Single Choices Select</label>
              <Select className="!p-0 place-holder" classNamePrefix='react-select' options={singleselect} />
              <label className="ti-form-select rounded-sm !py-2 ">Option groups</label>
              <SingleGroup />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Passing Through Options</h5>
            </div>
            <div className="box-body">
              <CreatableSelect
                components={components}
                classNamePrefix='react-select'
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => {
                  // Ensure newValue is an array (or empty array) of objects
                  if (Array.isArray(newValue)) {
                    setValue(newValue);
                  } else {
                    // Handle the case when newValue is not an array
                    setValue([]);
                  }
                }}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Type something and press enter..."
                value={value}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title"> Email Address Only</h5>
            </div>
            <div className="box-body">
              <input className="ti-form-input" id="choices-text-email-filter" type="text" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title"> Options added via config with no search</h5>
            </div>
            <div className="box-body">
              <Select isClearable name="choices-single-no-search" options={Optionwithnosearch} className="default basic-multi-select" id="choices-single-no-search"
                menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Optionwithnosearch[5]]}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title"> Passing Unique Values</h5>
            </div>
            <div className="box-body">
              <CreatableSelect
                components={components}
                classNamePrefix='react-select'
                inputValue={inputValue1}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => {
                  // Ensure newValue is an array (or empty array) of objects
                  if (Array.isArray(newValue)) {
                    setValue1(newValue);
                  } else {
                    // Handle the case when newValue is not an array
                    setValue1([]);
                  }
                }}
                onInputChange={(newValue) => setInputValue1(newValue)}
                onKeyDown={handleKeyDown1}
                placeholder="Type something and press enter..."
                value={value1}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Formselect;
