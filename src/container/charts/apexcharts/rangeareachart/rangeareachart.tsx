import  { FC, Fragment } from 'react';
import { Basicrangearea, Comborangearea } from './rangeareadata';
import Pageheader from '../../../../components/common/pageheader/pageheader';


interface RangeareachartProps {}

const Rangeareachart: FC<RangeareachartProps> = () => {
  return(
  <Fragment>
      <Pageheader currentpage="Apex Rangearea Charts" activepage="Apex Charts" mainpage="Apex Rangearea Charts" />

<div className="grid grid-cols-12 gap-x-6">
     <div className="xl:col-span-6 col-span-12">
         <div className="box custom-box">
             <div className="box-header">
                 <div className="box-title">
                     Basic Range Area Chart
                 </div>
             </div>
             <div className="box-body">
                 <div id="rangearea-basic">
                 <Basicrangearea/>
                 </div>
             </div>
         </div>
     </div>
     <div className="xl:col-span-6 col-span-12">
         <div className="box custom-box">
             <div className="box-header">
                 <div className="box-title">
                     Combo Range Area Chart
                 </div>
             </div>
             <div className="box-body">
                 <div id="rangearea-combo">
                 <Comborangearea/>
                 </div>
             </div>
         </div>
     </div>
 </div>

  </Fragment>
);}

export default Rangeareachart;
