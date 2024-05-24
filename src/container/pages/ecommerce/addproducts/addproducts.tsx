import  { FC, Fragment, useState } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import DatePicker from 'react-datepicker';
//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { Productoptions1, Productoptions2, Productoptions3, Productoptions4, Productoptions5, Productoptions6, Productoptions7, Productoptions8 } from './addproductdata';

interface AddproductsProps {}

const Addproducts: FC<AddproductsProps> = () => {
    const [value1, setValue1] = useState('');
  const [files, setFiles] = useState<any>([]);
  const [files1, setFiles1] = useState<any>([]);
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: Date | null) => {
      // Ensure date is defined before setting it
      if (date) {
          setStartDate(date); 
      }
  };
  return(
  <Fragment>
                <Pageheader currentpage="Add Products" activepage="Ecommrece" mainpage="Add Products" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12  col-span-12">
                    <div className="box">
                        <div className="box-body add-products !p-0">
                            <div className="p-6">
                                <div className="grid grid-cols-12 md:gap-x-[3rem] gap-0">
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-name-add" className="form-label">Product Name</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-name-add" placeholder="Name" />
                                                <label htmlFor="product-name-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 !mb-0">*Product Name should not exceed 30 characters</label>
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-category-add" className="form-label">Category</label>
                                                <Select id="product-category-add" name="product-category-add" options={Productoptions1} className="w-full !rounded-md" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Category"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-gender-add" className="form-label">Gender </label>
                                                <Select name="product-gender-add" options={Productoptions2} className="w-full !rounded-md" isSearchable id="product-gender-add"
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-size-add" className="form-label">Size</label>
                                                <Select id="product-size-add" name="product-size-add" options={Productoptions3} className="w-full !rounded-md" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-brand-add" className="form-label">Brand</label>
                                                <Select name="product-brand-add" options={Productoptions4} className="w-full !rounded-md" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select" id="product-brand-add"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12 color-selection">
                                                <label htmlFor="product-color-add" className="form-label">Colors</label>
                                                <Select isMulti name="colors" options={Productoptions5} className="w-full !rounded-md" isSearchable id="product-color-add"
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-cost-add" className="form-label">Enter Cost</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-cost-add" placeholder="Cost" />
                                                <label htmlFor="product-cost-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Mention final price of the product</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-description-add" className="form-label">Product Description</label>
                                                <textarea className="form-control w-full !rounded-md" id="product-description-add" rows={2}></textarea>
                                                <label htmlFor="product-description-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Description should not exceed 500 letters</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 mb-4">
                                                <label className="form-label">Product Features</label>
                                                <div id="product-features">
                                                <ReactQuill theme="snow" value={value1} onChange={setValue1} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-4 col-span-12">
                                                <label htmlFor="product-actual-price" className="form-label">Actual Price</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-actual-price" placeholder="Actual Price" />
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <label htmlFor="product-dealer-price" className="form-label">Dealer Price</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-dealer-price" placeholder="Dealer Price" />
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <label htmlFor="product-discount" className="form-label">Discount</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-discount" placeholder="Discount in %" />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-type" className="form-label">Product Type</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-type" placeholder="Type" />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-discount" className="form-label">Item Weight</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-discount1" placeholder="Weight in gms" />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                <p className="font-semibold mb-2 text-[0.875rem]">Product Images :</p>
                                                <FilePond className="product-Images w-full"
                                                            files={files}
                                                            onupdatefiles={setFiles}
                                                            allowMultiple={true}
                                                            maxFiles={6}
                                                            // server="/api"
                                                            name="files" /* sets the file input name, it's filepond by default */
                                                            labelIdle='Drag & Drop your file here or click '
                                                        />
                                            </div>
                                            <label className="form-label opacity-[0.5] mt-4 xl:col-span-12 col-span-12">Minimum 0f 6 images are need to be uploaded,make sure the image size match the proper background size and all images should be uniformly maintained with width and height to the image container,image size should not exceed 2MB,once uploaded to change the image you need to wait minimum of 24hrs. </label>
                                            <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                <p className="font-semibold mb-2 text-[0.875rem]">Warrenty Documents :</p>
                                                 <FilePond className="product-documents w-full"
                                                            files={files1}
                                                            onupdatefiles={setFiles1}
                                                            allowMultiple={true}
                                                            maxFiles={6}
                                                            // server="/api"
                                                            name="files" /* sets the file input name, it's filepond by default */
                                                            labelIdle='Drag & Drop your file here or click '
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="publish-date" className="form-label">Publish Date</label>
                                                <DatePicker selected={startDate} onChange={handleDateChange} />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="publish-time" className="form-label">Publish Time</label>
                                                <DatePicker
                                                            selected={startDate}
                                                            onChange={handleDateChange}
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            timeCaption="Time"
                                                            dateFormat="h:mm aa"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-status-add" className="form-label">Published Status</label>
                                                <Select name="product-status-add" options={Productoptions6} className="w-full !rounded-md" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select" id="product-status-add"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-tags" className="form-label">Product Tags</label>
                                                <Select isMulti name="product-tags" options={Productoptions7} defaultValue={[Productoptions7[0], Productoptions7[3]]}
                                                            className="w-full !rounded-md" isSearchable id="product-tags"
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                        />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-status-add1" className="form-label">Availability</label>
                                                <Select name="product-status-add1" options={Productoptions8} id="product-status-add1"
                                                            className="w-full !rounded-md" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                        />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex justify-end">
                                <button type="button" className="ti-btn ti-btn-primary !font-medium m-1">Add Product<i className="bi bi-plus-lg ms-2"></i></button>
                                <button type="button" className="ti-btn ti-btn-success !font-medium m-1">Save Product<i className="bi bi-download ms-2"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Addproducts;
