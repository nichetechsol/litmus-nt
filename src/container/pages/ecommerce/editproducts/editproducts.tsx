import  { FC, Fragment, useState } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import Producteditor, { Availabilitydata, Branddata, Categorydata, Colorsdata, Genderdata, Productsdata, Publisheddata, Sizedata } from './editproductdata';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);


interface EditproductsProps {}

const Editproducts: FC<EditproductsProps> = () =>{ 
  const [files, setFiles] = useState<any>([]);
  const [files1, setFiles1] = useState<any>([]);
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: Date | null) => {
      // Ensure date is defined before setting it
      if (date) {
          setStartDate(date);
      }
  };
  const [startDate1, setStartDate1] = useState(new Date());
  const handleDateChange1 = (date: Date | null) => {
      // Ensure date is defined before setting it
      if (date) {
          setStartDate1(date);
      }
  };
  return(
  <Fragment>
                <Pageheader currentpage="Edit Products" activepage="Ecommerce" mainpage="Edit Products" />
            <div className="grid grid-cols-12">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-body add-products !p-0">
                            <div className="p-6">
                                <div className="grid grid-cols-12 gap-y-4 md:gap-[3rem]">
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-name-add" className="form-label">Product Name</label>
                                                <input type="text" className="form-control" id="product-name-add" placeholder="Name" defaultValue="Light Blue Sweat Shirt" />
                                                <label htmlFor="product-name-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] text-muted mb-0">*Product Name should not exceed 30 characters</label>
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-category-add" className="form-label">Category</label>
                                                <Select isSearchable name="colors" options={Categorydata} className=""
                                                            menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Categorydata[5]]}
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-gender-add" className="form-label">Gender</label>
                                                <Select name="colors" options={Genderdata} className="" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select" defaultValue={[Genderdata[1]]}
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-size-add" className="form-label">Size</label>
                                                <Select name="colors" options={Sizedata} className="" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select" defaultValue={[Sizedata[3]]}
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-brand-add" className="form-label">Brand</label>
                                                <Select name="colors" options={Branddata} className="" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select" defaultValue={[Branddata[5]]}
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12 color-selection">
                                                <label htmlFor="product-color-add" className="form-label">Colors</label>
                                                <Select name="colors" options={Colorsdata} className="" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select" defaultValue={[Colorsdata[7]]}
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-cost-add" className="form-label">Enter Cost</label>
                                                <input type="text" className="form-control" id="product-cost-add" placeholder="Cost" defaultValue="$1299.99" />
                                                <label htmlFor="product-cost-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] text-muted mb-0">*Mention final price of the product</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-description-add" className="form-label">Product Description</label>
                                                <textarea className="form-control" id="product-description-add" rows={2} defaultValue="Ultra Soft: The fabric is extremely soft and comfortable, keeping you at ease for hours"></textarea>
                                                <label htmlFor="product-description-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] text-muted mb-0">*Description should not exceed 500 letters</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label className="form-label">Product Features</label>
                                                <div id="product-features">
                                                <Producteditor/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-4 col-span-12">
                                                <label htmlFor="product-actual-price" className="form-label">Actual Price</label>
                                                <input type="text" className="form-control" id="product-actual-price" placeholder="Actual Price" defaultValue="$1,499.90" />
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <label htmlFor="product-dealer-price" className="form-label">Dealer Price</label>
                                                <input type="text" className="form-control" id="product-dealer-price" placeholder="Dealer Price" defaultValue="$1,299.99" />
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <label htmlFor="product-discount" className="form-label">Discount</label>
                                                <input type="text" className="form-control" id="product-discount" placeholder="Discount in %" defaultValue="0.75%" />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-type" className="form-label">Product Type</label>
                                                <input type="text" className="form-control" id="product-type" placeholder="Type" defaultValue="Watch" />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-weight" className="form-label">Item Weight</label>
                                                <input type="text" className="form-control" id="product-weight" placeholder="Weight in gms" defaultValue="180gms" />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                <p className="font-semibold mb-2 text-[.875rem]">Product Images :</p>
                                                <FilePond className="multiple-filepond"
                                                            files={files}
                                                            onupdatefiles={setFiles}
                                                            allowMultiple={true}
                                                            maxFiles={6}
                                                            // server="/api"
                                                            name="files" 
                                                            labelIdle='Drag & Drop your file here or click '
                                                        />
                                            </div>
                                            <label className="xl:col-span-12 col-span-12 form-label opacity-[0.5] mt-3">Minimum 0f 6 images are need to be uploaded,make sure the image size match the proper background size and all images should be uniformly maintained with width and height to the image container,image size should not exceed 2MB,once uploaded to change the image you need to wait minimum of 24hrs. </label>
                                            <div className="xl:col-span-12 col-span-12 product-documents-container">
                                                <p className="font-semibold mb-2 text-[.875rem]">Warrenty Documents :</p>
                                                <FilePond className="multiple-filepond"
                                                            files={files1}
                                                            onupdatefiles={setFiles1}
                                                            allowMultiple={true}
                                                            maxFiles={6}
                                                            name="files"
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
                                                            selected={startDate1}
                                                            onChange={handleDateChange1}
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            timeCaption="Time"
                                                            dateFormat="h:mm aa"
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-status-add" className="form-label">Published Status</label>
                                                <Select name="colors" options={Publisheddata} className="" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select" defaultValue={[Publisheddata[2]]}
                                                        />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-tags" className="form-label">Product Tags</label>
                                                <Select isMulti name="colors" options={Productsdata} defaultValue={[Productsdata[0], Productsdata[3]]}
                                                            className="" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                        />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-availability" className="form-label">Availability</label>
                                                <Select name="colors" options={Availabilitydata}
                                                            className="" isSearchable
                                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                        />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 border-t border-dashed dark:border-defaultborder/10 sm:flex justify-end">
                                <button type="button" className="ti-btn ti-btn-primary m-1">Add Product<i className="bi bi-plus-lg ms-2"></i></button>
                                <button type="button" className="ti-btn ti-btn-success m-1">Save Product<i className="bi bi-download ms-2"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);
}
export default Editproducts;
