import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Basicboxplot, Boxplothorizontal, Boxplotscatter } from './boxplotdata';


interface BoxplotchartProps {}

const Boxplotchart: FC<BoxplotchartProps> = () => {
  return(
  <Fragment>
      <Pageheader currentpage="Apex Boxplot Charts" activepage="Apex Charts" mainpage="Apex Boxplot Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Boxplot Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="boxplot-basic">
                                <Basicboxplot/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Boxplot With Scatter Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="boxplot-scatter">
                                <Boxplotscatter/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Horizontal Boxplot Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="boxplot-horizontal">
                                <Boxplothorizontal/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Boxplotchart;
