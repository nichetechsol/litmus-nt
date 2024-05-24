import  { FC, Fragment } from 'react';
import { Basicarea, Datetimexaxis, Github, Negative, Nullarea, Spiline, Stacked } from './areadata';
import Pageheader from '../../../../components/common/pageheader/pageheader';


interface AreachartProps {}

const Areachart: FC<AreachartProps> = () =>{
  return (
  <Fragment>
     <Pageheader currentpage="Apex Area Charts" activepage="Apex Charts" mainpage="Apex Area Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-basic">
                                <Basicarea/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Spline Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-spline">
                                <Spiline/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Area Chart With Negative Values</div>
                        </div>
                        <div className="box-body">
                            <div id="area-negative">
                                <Negative/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Selection-Github Style Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="chart-years">
                                <Github/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Stacked Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-stacked">
                                <Stacked/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Area Chart With Null Values</div>
                        </div>
                        <div className="box-body">
                            <div id="area-irregular">
                                <Nullarea/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Area Chart-Datetime X-Axis Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="area-null">
                                <Datetimexaxis/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Areachart;
