import  { FC, Fragment } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { Chartjsbar, Chartjsbubble, Chartjsdonut, Chartjsline, Chartjsmixed, Chartjspie, Chartjspolar, Chartjsradial, Chartjsscatter } from './chartjsdata';


interface ChartjsProps {}

const Chartjs: FC<ChartjsProps> = () =>{
  return (
  <Fragment>
       <Pageheader currentpage="Chartjs" activepage="Charts" mainpage="Chartjs" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Line Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjsline/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Bar Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjsbar/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Pie Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjspie/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Doughnut Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjsdonut/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Mixed Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjsmixed/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Polar Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjspolar/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Radial Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjsradial/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Scatter Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjsscatter/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Chartjs Bubble Chart</div>
                        </div>
                        <div className="box-body">
                        <Chartjsbubble/>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Chartjs;
