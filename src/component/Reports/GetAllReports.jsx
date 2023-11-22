import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { getAllReportAction, getSingleReportAction } from "../../redux/slices/reportSlice";
import DateFormatter from "../../utils/DateFormatter";
import Spinner from "../../utils/Spinner";
import { AiFillDelete } from "react-icons/ai";

const GetAllReports = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  useEffect(() => {
    dispatch(getAllReportAction(id));
  }, [dispatch,id]);

  const store = useSelector((store) => store?.category);
  const report = useSelector((state)=> state.report);
const {loading, appErr, serverErr, reports} = report
console.log(reports)

  // const { categories, loading, appErr, serverErr } = store;

  return (
    <>
      {loading ? (
        <>
          {/* <LoadingComponent /> */}
          <h1 className="text-red-800 text-center font-bold text-3xl">
            <Spinner />
          </h1>
        </>
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : reports?.data?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No Report Found
        </h2>
      ) : (
        
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Reporter
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports?.data?.map((category) => (
                      
                      <tr key={category?._id} className="bg-gray-50">
                      <Link to={`/reports/details/${category._id}`}>
                      
                          
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.reporter?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category?.reporter?.firstName}{" "}
                                {category?.reporter?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category?.reporter?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        </Link>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date={category?.createdAt} />}
                        </td>

                        <Link to={`/profile/${category?._id}`}>
                          <td className="pl-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <HiOutlinePencilAlt className="h-5 text-indigo-500" />
                          </td>
                        </Link>
                        <Link to={`/profile/${category?._id}`}>
                          <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                            <AiFillDelete className="h-5 text-red-500" />
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetAllReports;
