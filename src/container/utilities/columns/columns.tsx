import  { FC, Fragment } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import media25 from "../../../assets/images/media/media-25.jpg";
import media26 from "../../../assets/images/media/media-26.jpg";
import media27 from "../../../assets/images/media/media-27.jpg";
import media28 from "../../../assets/images/media/media-28.jpg";
import media29 from "../../../assets/images/media/media-29.jpg";
import media30 from "../../../assets/images/media/media-30.jpg";
import media31 from "../../../assets/images/media/media-31.jpg";


interface ColumnsProps {}

const Columns: FC<ColumnsProps> = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Columns" activepage="Utilities" mainpage="Columns" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Based On Column Count</h5>
                        </div>
                        <div className="box-body">
                            <div className="relative">
                                <div className="absolute inset-0 -top-8 -bottom-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    <div className="bg-stripes-primary dark:bg-stripes-primary opacity-75 w-full h-full"></div>
                                    <div className="hidden sm:block bg-stripes-primary dark:bg-stripes-primary opacity-75 w-full h-full"></div>
                                    <div className="hidden sm:block bg-stripes-primary dark:bg-stripes-primary opacity-75 w-full h-full"></div>
                                </div>
                                <div className="relative columns-1 sm:columns-3 gap-8">
                                    <div className="relative aspect-w-16 aspect-h-9">
                                        <img className="w-full object-cover rounded-sm" src={media30} alt="Image Description" />
                                    </div>
                                    <div className="relative aspect-w-1 aspect-h-1 mt-8">
                                        <img className="w-full object-cover rounded-sm" src={media29} alt="Image Description" />
                                    </div>
                                    <div className="relative aspect-w-1 aspect-h-1 mt-8">
                                        <img className="w-full object-cover rounded-sm" src={media28} alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8 sm:mt-0">
                                        <img className="w-full object-cover rounded-sm" src={media27} alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-16 aspect-h-9 mt-8">
                                        <img className="w-full object-cover rounded-sm" src={media30} alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8">
                                        <img className="w-full object-cover rounded-sm" src={media26} alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8 sm:mt-0">
                                        <img className="w-full object-cover rounded-sm" src={media29} alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-1 aspect-h-1 mt-8">
                                        <img className="w-full object-cover rounded-sm" src={media31} alt="Image Description" />
                                    </div>
                                    <div className="hidden sm:block relative aspect-w-16 aspect-h-9 mt-8">
                                        <img className="w-full object-cover rounded-sm" src={media25} alt="Image Description" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Based On Column Width</h5>
                        </div>
                        <div className="box-body">
                            <div className="relative rounded-sm overflow-auto max-h-[800px]">
                                <div className="relative">
                                    <div className="columns-3xs gap-8 space-y-8">
                                        <div className="relative aspect-w-16 aspect-h-9">
                                            <img className="w-full object-cover rounded-sm" src={media26} alt="Image Description" />
                                        </div>
                                        <div className="relative aspect-w-1 aspect-h-1">
                                            <img className="w-full object-cover rounded-sm" src={media27} alt="Image Description" />
                                        </div>
                                        <div className="relative hidden sm:block aspect-w-1 aspect-h-1">
                                            <img className="w-full object-cover rounded-sm" src={media28} alt="Image Description" />
                                        </div>
                                        <div className="relative hidden sm:block aspect-w-16 aspect-h-9">
                                            <img className="w-full object-cover rounded-sm" src={media29} alt="Image Description" />
                                        </div>
                                        <div className="relative hidden sm:block aspect-w-16 aspect-h-9">
                                            <img className="w-full object-cover rounded-sm" src={media25} alt="Image Description" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Columns;
