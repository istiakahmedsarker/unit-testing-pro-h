import { useState } from 'react';
import PropertiesCard from '../Properties/Components/PropertiesCard/PropertiesCard';
import PropertiesCardList from '../Properties/Components/PropertiesCard/PropertiesCardList';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import TopButton from '../Properties/Components/TopButton/TopButton';
import useGetData from '../../Hooks/useGetData';
import useDebounce from '../../Hooks/useDebounce';
import PropertyFilter from '../Properties/Components/PropertyFilter/PropertyFilter';
import { IoFilter } from 'react-icons/io5';

const Properties = () => {
  const [checkboxes, setCheckboxes] = useState({
    all: true,
    rent: false,
    sale: false,
  });

  const [typeCheckboxes, setTypeCheckboxes] = useState({
    all: true,
    apartment: false,
    office: false,
    villa: false,
  });
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [isGrid, setIsGrid] = useState(false);
  const debouncedSearchValue = useDebounce(searchText, 800);
  const limit = 6;

  const checkedItem = Object.keys(checkboxes).find(
    checkbox => checkboxes[checkbox]
  );

  const typeCheckedItem = Object.keys(typeCheckboxes).find(
    checkbox => typeCheckboxes[checkbox]
  );

  const handleCheckboxChange = checkboxName => {
    const updatedCheckboxes = {};

    for (let key in checkboxes) {
      updatedCheckboxes[key] = key === checkboxName;
    }

    setCheckboxes(updatedCheckboxes);
    setActivePage(1);
  };

  const handleTypeCheckboxChange = checkboxName => {
    const updatedCheckboxes = {};

    for (let key in typeCheckboxes) {
      updatedCheckboxes[key] = key === checkboxName;
    }

    setTypeCheckboxes(updatedCheckboxes);
    setActivePage(1);
  };

  const { data: propertiesData, isPending } = useGetData({
    key: [
      'properties',
      checkedItem,
      typeCheckedItem,
      selectedOption,
      limit,
      activePage,
      debouncedSearchValue,
    ],
    api: `/properties?propertyStatus=${
      checkedItem === 'all' ? '' : checkedItem
    }&propertyType=${
      typeCheckedItem === 'all' ? '' : typeCheckedItem
    }&sort=${selectedOption}&page=${activePage}&limit=${limit}&title=${searchText}`,
  });

  // console.log(propertiesData?.data);

  // for pagination
  const totalPage = Math.ceil(
    parseInt(propertiesData?.data?.totalProperty) / limit
  );

  let pages = [];
  const totalPageCalc = () => {
    for (let x = 1; x <= totalPage; x++) {
      pages.push(x);
    }
  };
  totalPageCalc();

  const previousPage = () => {
    if (activePage === 1) return activePage;
    setActivePage(activePage - 1);
  };

  const nextPage = () => {
    if (activePage === totalPage) return activePage;
    setActivePage(activePage + 1);
  };

  if (isPending) {
    return (
      <p className="h-[90vh] flex flex-col items-center justify-center text-center">
        Loading...
      </p>
      // <video src="../../assets/Untitled design.mp4"></video>
    );
  }

  return (
    <div className="max-w-7xl xl:mx-auto mx-4 pt-8 pb-20">
      <div className="flex items-center justify-between mb-10 mt-5">
        <h3 className="text-3xl font-semibold">Properties For sale</h3>
        <button className="flex items-center gap-2 bg-stone-200 rounded-lg px-6  py-2 md:hidden ">
          <IoFilter />
          <label
            htmlFor="my-drawer-4"
            className="drawer-button cursor-pointer font-semibold"
          >
            Filter
          </label>
        </button>
      </div>
      <div className="drawer z-30 md:hidden overflow-hidden">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Sidebar content here */}

          <div className="menu w-[230px] z-50  sm:w-[300px]   gap-9 min-h-full bg-white flex flex-col shadow-sm rounded-md  text-base-content">
            <PropertyFilter
              checkboxes={checkboxes}
              typeCheckboxes={typeCheckboxes}
              searchText={searchText}
              setSearchText={setSearchText}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              handleCheckboxChange={handleCheckboxChange}
              handleTypeCheckboxChange={handleTypeCheckboxChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative items-start">
        {/* Property Filter Component */}
        <div className="md:col-span-5 lg:col-span-4 md:inline hidden sticky top-0">
          <PropertyFilter
            checkboxes={checkboxes}
            typeCheckboxes={typeCheckboxes}
            searchText={searchText}
            setSearchText={setSearchText}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            handleCheckboxChange={handleCheckboxChange}
            handleTypeCheckboxChange={handleTypeCheckboxChange}
          />
        </div>

        {!propertiesData?.data?.properties?.length ? (
          <div className="col-span-7 lg:col-span-8 sm:w-[70%] mx-auto md:w-full">
            <p className=" h-[70vh] flex-col flex items-center justify-center">
              No more items available
            </p>
          </div>
        ) : (
          <div
            className="md:col-span-7 lg:col-span-8 flex flex-col gap-16
        "
          >
            <div>
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold">
                  {/* Show for All Properties :{propertiesCards.length || 0} */}
                </h4>
                {/* toggle button for grid and list  */}
                {!isGrid ? (
                  <button
                    onClick={() => setIsGrid(true)}
                    className="text-[#eb6753] font-semibold mb-5"
                  >
                    List view
                  </button>
                ) : (
                  <button
                    onClick={() => setIsGrid(false)}
                    className="text-[#eb6753] font-semibold"
                  >
                    Grid View
                  </button>
                )}
              </div>
              {/* show card in grid view and list view */}
              {!isGrid ? (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-10 -z-30">
                  {propertiesData?.data?.properties?.map(card => (
                    <PropertiesCard key={card._id} card={card}></PropertiesCard>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col  gap-5  my-6 -z-30">
                  {propertiesData?.data?.properties?.map(card => (
                    <PropertiesCardList
                      key={card._id}
                      card={card}
                    ></PropertiesCardList>
                  ))}
                </div>
              )}
            </div>
            {/* pagination Implementation */}
            {totalPage > 1 ? (
              <div className="flex items-center justify-center gap-5">
                <button
                  className={`${
                    activePage === 1
                      ? 'disabled bg-stone-400 rounded-full opacity-50 cursor-not-allowed p-3'
                      : 'bg-white p-3 shadow-md rounded-full'
                  }`}
                  onClick={previousPage}
                >
                  <FaArrowLeft />
                </button>

                {pages.map(pageNo => (
                  <button
                    className={`${
                      activePage === pageNo
                        ? 'bg-[#EB6753] hidden md:inline font-semibold text-white px-4 py-2 rounded-full'
                        : 'px-4 py-2 hidden md:inline rounded-full font-semibold bg-white shadow-md'
                    } `}
                    key={pageNo}
                    onClick={() => setActivePage(pageNo)}
                  >
                    {pageNo}
                  </button>
                ))}
                <button className="inline md:hidden">
                  <span className="font-bold">{activePage}</span> of {totalPage}
                </button>

                <button
                  className={`${
                    activePage === totalPage
                      ? 'disabled bg-stone-400 rounded-full opacity-50 cursor-not-allowed p-3'
                      : 'bg-white p-3 shadow-md rounded-full'
                  }`}
                  onClick={nextPage}
                >
                  <FaArrowRight />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      <TopButton />
    </div>
  );
};

export default Properties;
