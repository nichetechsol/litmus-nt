import  { FC, Fragment, useState } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { BasicTable, ResponsiveDataTable, columns, data } from './datatablesdata';
import { ReactTabulator } from 'react-tabulator';


interface DatatablesProps {}

const Datatables: FC<DatatablesProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
	const [pageSize] = useState(10);
	const [totalPages] = useState(1);

	const handlePageChange = (page:any) => {
		setCurrentPage(page);
	};
  return(
  <Fragment>
      <>
      <Pageheader currentpage="Data Tables" activepage="Tables" mainpage="Data Tables" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic DataTable</h5>
            </div>
            <div className="box-body">
              <div className="overflow-hidden">
                <BasicTable/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Sortable DataTable</h5>
            </div>
            <div className="box-body space-y-3">
              <div className="overflow-hidden table-bordered">
                <div id="sort-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                <ReactTabulator className="table-hover table-bordered"
                                        data={data}
                                        columns={columns} 
                                        options={{pagination: 'local',
                                            paginationSize: pageSize,
                                            paginationSizeSelector: [10, 20, 50, 100], // Define available page sizes
                                            paginationInitialPage: currentPage,
                                            paginationButtonCount: 5, // Number of pagination buttons to display
                                            paginationDataReceived: { last_page: totalPages },
                                            paginationDataSent: { page: currentPage, size: pageSize }}}
                                            onPageChange={(data:any) => handlePageChange(data.page)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Responsive DataTable</h5>
            </div>
            <div className="box-body space-y-3">
              <div className="overflow-hidden">
                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                <ResponsiveDataTable/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  </Fragment>
);}

export default Datatables;
