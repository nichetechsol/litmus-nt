import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Basicradialbar, Circlechart, Circlegauge, Circlewithimage, Gradientcircle, Multipleradial, Semicirclegauge } from './radialbardata';


interface RadialbarchartProps {}

const Radialbarchart: FC<RadialbarchartProps> = () =>{ 
  return(
  <Fragment>
     <Pageheader currentpage="Apex radialbar Charts" activepage="Apex Charts" mainpage="Apex radialbar Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="radialbar-basic">
                                <Basicradialbar/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Multiple Radialbar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="radialbar-multiple">
                                <Multipleradial/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Circle Chart - Custom Angle</div>
                        </div>
                        <div className="box-body">
                            <div id="circle-custom">
                            <Circlechart/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Gradient Circle Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="gradient-circle">
                            <Gradientcircle/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Stroked Circular Gauge</div>
                        </div>
                        <div className="box-body">
                            <div id="circular-stroked">
                            <Circlegauge/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Circle Chart With Image</div>
                        </div>
                        <div className="box-body">
                            <div id="circle-image">
                               <Circlewithimage/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Semi Circular Gauge</div>
                        </div>
                        <div className="box-body">
                            <div id="circular-semi">
                                <Semicirclegauge/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Radialbarchart;
