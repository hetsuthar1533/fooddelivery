import React from 'react'

function Carousal() {
  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ ObjectFit: "contain !important" }}>

        <div className="carousel-inner" id="carosel">
          <div className='carousel-caption' style={{ zIndex: '10' }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
            </form>

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
  )
}

export default Carousal
