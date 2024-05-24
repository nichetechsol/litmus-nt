import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Basicradar, Multipleradar, Polygonradar } from './radardata';


interface RadarchartProps {}

const Radarchart: FC<RadarchartProps> = () => {
  return(
  <Fragment>
    <Pageheader currentpage="Apex Radar Charts" activepage="Apex Charts" mainpage="Apex Radar Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Radar Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="radar-basic">
                                <Basicradar/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Radar Chart-Multiple Series</div>
                        </div>
                        <div className="box-body">
                            <div id="radar-multiple">
                                <Multipleradar/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Radar Chart Polygon Fill</div>
                        </div>
                        <div className="box-body">
                            <div id="radar-polygon">
                                <Polygonradar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Radarchart;
