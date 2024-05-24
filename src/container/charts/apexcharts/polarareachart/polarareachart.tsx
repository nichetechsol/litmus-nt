import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Basicpolararea, Monochromepolar } from './polarareadata';


interface PolarareachartProps {}

const Polarareachart: FC<PolarareachartProps> = () => {
  return(
  <Fragment>
       <Pageheader currentpage="Apex Polararea Charts" activepage="Apex Charts" mainpage="Apex Polararea Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Polar Area Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="polararea-basic">
                                <Basicpolararea/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Polar Area Monochrome Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="polararea-monochrome">
                                <Monochromepolar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Polarareachart;
