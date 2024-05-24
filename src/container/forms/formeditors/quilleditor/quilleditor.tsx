import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import Editor from '../quilldata';
import Editor1 from '../bubbledata';


interface QuilleditorProps {}

const Quilleditor: FC<QuilleditorProps> = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Quill Editor" activepage="Form Editors" mainpage="Quill Editor" />
            <div className="grid grid-cols-12 gp-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Quill Snow Editor
                            </div>
                        </div>
                        <div className="box-body">
                            <Editor placeholder={"Write something..."} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gp-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Quill Bubble Editor
                            </div>
                        </div>
                        <div className="box-body">
                            <Editor1 placeholder={"Write something..."} />
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Quilleditor;
