import React , {useState, useEffect}from 'react'
import Cards from '../../components/Cards';
import {FaFilter} from 'react-icons/fa'

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption,setSortOption]= useState("default")


    //pagination

    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage] = useState(6)


    //loading data
    useEffect(()=>{
        //fetch data
        const fetchData = async()=> {
            try{
                const response = await fetch('http://localhost:4000/menu');
                const data = await response.json();
                /* console.log(data) */
                setMenu(data)
                setFilteredItems(data)
            }catch(err){
                console.log("Error fetching data", err)
        }
    }
    //call the function
    fetchData()
    },[])

    //filter data based on category
    const filterItems = (category) => {
        const filtered = category === 'all' ? menu : menu.filter((item)=> item.category === category)

        setFilteredItems(filtered)
        setSelectedCategory(category)
        setCurrentPage(1)
    };

    //show all data
    const showAllItems = () => {
        setFilteredItems(menu)
        setSelectedCategory('all')
        
        setCurrentPage(1)
    };

    //sort

    const handleSortChange = (option) =>{
        setSortOption(option)
        let sortedItems = [...filteredItems];

        //logic
        switch(option){
            case "A-Z":
                sortedItems = sortedItems.sort((a,b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems = sortedItems.sort((a,b) => b.name.localeCompare(a.name))
                break;
            case "Low-high":
                sortedItems = sortedItems.sort((a,b) => a.price - b.price)
                break;
            case "High-low":
                sortedItems = sortedItems.sort((a,b) => b.price - a.price)
                break;
            default:
                sortedItems = sortedItems.sort((a,b) => a.name.localeCompare(b.name))
                break;
        }
        setFilteredItems(sortedItems)
        setCurrentPage(1)
    }

    //pagination logic

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className=''>
        <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='flex flex-col justify-center py-48 items-center gap-8'>
            {/* Text    */}
            <div className='text-center space-y-7 px-4'>
                    <h1 className='md:text-5x1 text-4xl font-bold md:leading-snug leading-snug'>
                        Lorem ipsum dolor sit amet consectetur
                    </h1>
                    <p className='text-xl text-[#4A4A4A] md:w-4/5 mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, sit!</p>
                    <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>Order Now</button>
            </div>
        </div>
        </div>
        

        {/* Menu shop */}

        <div className='section-container'>
            {/* filter and sort */}
           
            <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                 {/* button */}
                <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                    <button onClick={showAllItems} className={selectedCategory=== 'all' ? "active" : ""}>All</button>
                    <button onClick={()=> filterItems("salad")} className={selectedCategory=== 'salad' ? "active" : ""}>Salad</button>
                    <button onClick={()=> filterItems("pizza")} className={selectedCategory=== 'pizza' ? "active" : ""}>Pizza</button>
                    <button onClick={()=> filterItems("soup")} className={selectedCategory=== 'soup' ? "active" : ""}>Soup</button>
                    <button onClick={()=> filterItems("dessert")} className={selectedCategory=== 'dessert' ? "active" : ""}>Desserts</button>
                    <button onClick={()=> filterItems("drinks")} className={selectedCategory=== 'drinks' ? "active" : ""}>Drinks</button>
                </div>

                {/* sort */}
                <div className='flex justity-end mb-4 rounded-sm'>
                   <div className='bg-green p-2'>
                        <FaFilter className='h-4 w-4 text-white '/>
                    </div>     

                    <select name='sort' id='sort' onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className='bg-green text-white px-2 py-1 rounded-sm'>
                        <option value='default'>Default</option>
                        <option value='A-Z'>A-Z</option>
                        <option value='Z-A'>Z-A</option>
                        <option value='Low-high'>Low-high</option>
                        <option value='High-low'>High-low</option>
                    </select>
                </div>
            </div>
                
            
           
          


            {/* products card */}
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                {
                    currentItems.map((item, index) => {
                        return (
                           <Cards key={item._id} item={item}/>
                        )
                    })
                }
            </div>
        </div>

        {/* Pagination */}
        <div className='flex justify-center my-8'>
            {
                Array.from({length: Math.ceil(filteredItems.length / itemPerPage)}).map((_, index)=>(
                    <button key={index+1} onClick={()=> paginate(index + 1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200" }`}> 
                        {index + 1}
                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default Menu