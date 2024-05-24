import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Bubble3D, Simplebubble } from './bubblechartdata';


interface BubblechartProps {}

const Bubblechart: FC<BubblechartProps> = () => {
  return(
  <Fragment>
      <Pageheader currentpage="Apex Bubble Charts" activepage="Apex Charts" mainpage="Apex Bubble Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Simple Bubble Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bubble-simple">
                                <Simplebubble/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">3D Bubble Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="bubble-3d">
                                <Bubble3D/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Bubblechart;
