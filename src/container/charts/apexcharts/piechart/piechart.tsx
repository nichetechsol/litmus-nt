import  { FC, Fragment } from 'react';
import { Basicpiechart, Donutwithpattern, Gradientpie, Imagefilledpie, Monochrome, Simpledonut, Updatingdonut } from './piechartdata';
import Pageheader from '../../../../components/common/pageheader/pageheader';


interface PiechartProps {}

const Piechart: FC<PiechartProps> = () => {
  return(
  <Fragment>
     <Pageheader currentpage="Apex Pie Charts" activepage="Apex Charts" mainpage="Apex Pie Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="pie-basic">
                                <Basicpiechart/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Simple Donut Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="donut-simple">
                                <Simpledonut/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Updating Donut Chart</div>
                        </div>
                        <div className="box-body">
                                <Updatingdonut/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Monochrome Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="pie-monochrome">
                                <Monochrome/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Gradient Donut Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="donut-gradient">
                                <Gradientpie/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Donut Chart With Patterns</div>
                        </div>
                        <div className="box-body">
                            <div id="donut-pattern">
                                <Donutwithpattern/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Image Filled Pie Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="pie-image">
                                <Imagefilledpie/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Piechart;
