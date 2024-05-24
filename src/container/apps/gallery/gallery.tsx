import  { FC, Fragment } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { LightboxGallery1 } from './gallerydata';


interface GalleryProps {}

const Gallery: FC<GalleryProps> = () => {
  return(
  <Fragment>
    <Pageheader currentpage="Gallery" activepage="Apps" mainpage="Gallery" />
            <div className="grid grid-cols-12 gap-x-6">
            <LightboxGallery1/>
            </div>
  </Fragment>
);}

export default Gallery;
