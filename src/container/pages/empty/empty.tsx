import  { FC, Fragment } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';


interface EmptyProps {}

const Empty: FC<EmptyProps> = () =>{
  return (
  <Fragment>
     <Pageheader currentpage="Empty" activepage="Pages" mainpage="Empty" />
  </Fragment>
);}

export default Empty;
