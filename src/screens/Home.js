import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousal from '../components/Carousal';

function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setfoodCat] = useState([])
  const [foodItem, setfoodItem] = useState([])

  const loadData = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      response = await response.json()
      // console.log(response[0],response[1])
      // setfoodCat(data.categories)
      // setfoodItem(data.items)
      setfoodItem(response[0])
      setfoodCat(response[1])
    } catch (error) {
      console.log('Error:', error)
    }
  }



  useEffect(() => {
    loadData()
    // console.log('Hello')
    // fetch('http://localhost:5000/api/foodData')
    //.then(response => response.json())
    //.then(data => {
    //   console.log(data)
    //   setfoodCat(data.categories)
    //   setfoodItem(data.items)
    // })
    //.catch(error => console.log('Error:', error))
    // }, []
  }, [])





  return (
    <>
      <div className=''>
        <div>
          <Navbar />
        </div>

        <div>
          {/* corousel component */}
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ ObjectFit: "contain !important" }}>

            <div className="carousel-inner" id="carosel">
              <div className='carousel-caption' style={{ zIndex: '10' }}>
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                  {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                </div>

              </div>
              <div className="carousel-item active">
                <img src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hammomos-494706_1280.jpg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className='m-3'>
          {foodCat !== [] ? (
            foodCat.map((data) => (
              <div className='row mb-3'>
                <div key={data._id}>
                  <div className='fs m-3'>{data.CategoryName}</div>
                </div>

                <hr />
                {foodItem !== [] ?
                  foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                            {/* // imgSrc={filterIems.img} */}
                            
                        </div>
                      )
                    })
                  : <div>no data </div>}
              </div>
            ))
          ) : (
            <div>No categories found</div>
          )}
        </div>



        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
