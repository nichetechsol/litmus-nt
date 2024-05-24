import  { FC, Fragment } from 'react';
import { Linearea, Linecolumnarea, Mixedlinecolumn, MultipleYaxis } from './mixeddata';
import Pageheader from '../../../../components/common/pageheader/pageheader';


interface MixedchartProps {}

const Mixedchart: FC<MixedchartProps> = () => {
  return(
  <Fragment>
     <Pageheader currentpage="Apex Mixed Charts" activepage="Apex Charts" mainpage="Apex Mixed Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Line &amp; Column Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-linecolumn">
                                <Mixedlinecolumn/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Multiple Y-Axis Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-multiple-y">
                                <MultipleYaxis/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Line &amp; Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-linearea">
                                <Linearea/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Line,Column &amp; Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="mixed-all">
                                <Linecolumnarea/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Mixedchart;
