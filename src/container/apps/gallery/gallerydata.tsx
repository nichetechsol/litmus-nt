import  {  Fragment, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import media1 from "../../../assets/images/media/media-40.jpg";
import media2 from "../../../assets/images/media/media-41.jpg";
import media3 from "../../../assets/images/media/media-42.jpg";
import media4 from "../../../assets/images/media/media-43.jpg";
import media5 from "../../../assets/images/media/media-44.jpg";
import media6 from "../../../assets/images/media/media-45.jpg";
import media7 from "../../../assets/images/media/media-46.jpg";
import media8 from "../../../assets/images/media/media-60.jpg";
import { Link } from 'react-router-dom';

export const LightboxGallery1 = () => {

    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to="#" data-gallery="gallery1" className="glightbox box">
                        <img src={media1} alt='media1' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to="#" data-gallery="gallery1" className="glightbox box">
                        <img src={media2} alt='media2' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to="#" data-gallery="gallery1" className="glightbox box">
                        <img src={media3} alt='media3' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to="#" data-gallery="gallery1" className="glightbox box">
                        <img src={media4} alt='media4' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to="#" data-gallery="gallery1" className="glightbox box">
                        <img src={media5} alt='media5' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to='#' data-gallery="gallery1" className="glightbox box">
                        <img src={media6} alt='media6' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to='#' data-gallery="gallery1" className="glightbox box">
                        <img src={media7} alt='media6' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                    <Link to='#' data-gallery="gallery1" className="glightbox box">
                        <img src={media8} alt='media6' className="" onClick={() => setOpen(true)} />
                    </Link>
            </div>

            <Lightbox open={open} close={() => setOpen(false)} plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]} zoom={{
                maxZoomPixelRatio: 10,
                scrollToZoom: true
            }}
                slides={[{ src: media1}, { src: media2 }, { src: media3 }, { src: media4 }, { src: media5 },
                 { src: media6 }, { src: media7 }, 
                 { src: media8 },]} />

        </Fragment>
    );
};