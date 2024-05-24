import  { FC, Fragment } from 'react';
import { Basicscatter, Datetimescatter, Imagefillescatter } from './scatterdata';
import Pageheader from '../../../../components/common/pageheader/pageheader';


interface ScatterchartProps {}

const Scatterchart: FC<ScatterchartProps> = () => {
  return(
  <Fragment>
        <Pageheader currentpage="Apex Scatter Charts" activepage="Apex Charts" mainpage="Apex Scatter Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Scatter Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="scatter-basic">
                                <Basicscatter/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Datetime Scatter Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="scatter-datetime">
                                <Datetimescatter/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Image Fill Scatter Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="scatter-image">
                                <Imagefillescatter/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Scatterchart;
