import React, { useEffect, useState } from "react";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);

    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navebar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "fill !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit">
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://g4.dcdn.lt/images/pix/1200x799/auicSHIUw-Y/mesainis-90881337.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt="..."/>
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1303021179/photo/different-tipes-of-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=dl1XAmFKwCuKMuR9OdML_ndDzxKpwCNCOQvTqUb2KNQ="
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt="..."/>
            </div>
            <div className="carousel-item">
              <img
                src="https://t3.ftcdn.net/jpg/08/54/89/76/360_F_854897614_T2ekqPihVc6hsmrMHr2dLEBTI5Ox49lW.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt="..."/>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true">
              </span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next">
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                            
                          ></Card>
                        </div>
                      );
                    })}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
