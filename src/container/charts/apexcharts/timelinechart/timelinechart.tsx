import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Advancedmultirange, Basictimeline, Multiplecolored, Timelinegrouped, Timelinegrouped1 } from './timelinedata';


interface TimelinechartProps {}

const Timelinechart: FC<TimelinechartProps> = () => {
  return(
  <Fragment>
      <Pageheader currentpage="Apex Timeline Charts" activepage="Apex Charts" mainpage="Apex Timeline Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic TImeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-basic">
                                <Basictimeline/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Multiple Colored TImeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-colors">
                                <Multiplecolored/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Multi Series Timeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-multi">
                            <Timelinegrouped1/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Advanced Timeline Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-advanced">
                            
                            <Advancedmultirange/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Timeline-Grouped Rows</div>
                        </div>
                        <div className="box-body">
                            <div id="timeline-grouped">
                                
                                <Timelinegrouped/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);
}
export default Timelinechart;
