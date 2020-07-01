window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("hidePreloader");
});

// CreateCars IIFE
const CreateCars = (() => {
  // car data
  const cars = [];
  // car class
  class Car {
    constructor(make, country, img, special, model, price, type, trans, gas) {
      this.make = make;
      this.country = country;
      this.img = img;
      this.special = special;
      this.model = model;
      this.price = price;
      this.type = type;
      this.trans = trans;
      this.gas = gas;
    }
  }

  // car creation function
  // In order not to have undefined values ,
  // I define a default values
  function makeCar(make, country, img = "../img/car-default.jpeg", special = true, model = "new model", price = 10000, type = "sedan", trans = "automatic", gas = "50") {
    const car = new Car(make, country, img, special, model, price, type, trans, gas);
    cars.push(car);
  }

  // produce cars
  function produceCars() {
    makeCar("chevy", "american");
    makeCar("mercedes", "german", "../img/car-german-1.jpeg", true);
    makeCar("bora", "german", "../img/car-german-2.jpeg");
    makeCar("volkswagen", "german", "../img/car-german-3.jpeg", false, "some model");
    makeCar("BMW", "german", "../img/car-german-4.jpeg", undefined, "other model");
    makeCar("Jetta", "german", "../img/car-german-5.jpeg", false);
    makeCar("chevy", "american", "../img/car-american-1.jpeg");
    makeCar("ford", "american", "../img/car-american-2.jpeg", false);
    makeCar("Explorer", "american", "../img/car-american-3.jpeg", false);
    makeCar("delta", "american", "../img/car-american-4.jpeg", false);
    makeCar("smoecar", "american", "../img/car-american-5.jpeg", false);
  }

  produceCars();

  // special cars
  const specialCars = cars.filter(item => item.special === true);

  // console.log(specialCars);

  return {
    cars,
    specialCars
  };
})();

// DisplaySpecialCars IIFE
const DisplaySpecialCars = (CreateCarsModule => {
  const info = document.querySelector(".featured-info");

  // document loaded event
  document.addEventListener("DOMContentLoaded", () => {
    info.innerHTML = "";

    let specialCars = CreateCarsModule.specialCars;
    specialCars.forEach(car => {
      info.innerHTML += `<!-- single item -->
            <div class="featured-item my-3 d-flex p-2 text-capitalize align-items-baseline flex-wrap">
              <span data-img="${car.img}" class="featured-icon mr-2"><i class="fas fa-car"></i></span>
              <h5 class="font-weight-bold mx-1">${car.make}</h5>
              <h5 class="mx-1">${car.model}</h5>
            </div>
            <!-- end of single item -->`;
    });

    info.addEventListener("click", event => {
      if (event.target.parentElement.classList.contains("featured-icon")) {
        const imageId = event.target.parentElement.dataset.img;
        document.querySelector(".featured-photo").src = imageId;
      }
    });
  });
})(CreateCars);

// DisplayCars IIFE
const DisplayCars = (CreateCars => {
  const cars = CreateCars.cars;
  showCars(cars);
})(CreateCars);

// filter cars IIFE
const FilterCars = (CreateCars => {
  const filter = document.querySelectorAll(".filter-btn");

  filter.forEach(btn => {
    btn.addEventListener("click", event => {
      const filterType = event.target.dataset.filter;
      const cars = CreateCars.cars;

      const german = cars.filter(car => car.country === filterType);
      const american = cars.filter(car => car.country === filterType);

      switch (filterType) {
        case "all":
          showCars(cars);
          break;
        case "german":
          showCars(german);
          break;
        case "american":
          showCars(american);
          break;
        default:
          showCars(cars);
          break;
      }

      // if (filterType === "german") {
      //   showCars(german);
      // } else if (filterType === "american") {
      //   showCars(american);
      // } else {
      //   showCars(cars);
      // }
    });
  });
})(CreateCars);

function showCars(cars) {
  const inventory = document.querySelector(".inventory-container");
  inventory.innerHTML = "";

  cars.forEach(car => {
    inventory.innerHTML += `<!-- single car -->
        <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${car.country}">
          <div class="card car-card">
            <img src="${car.img}" class="card-img-top car-img" alt="" />
            <!-- card body  -->
            <div class="card-body">
              <div class="car-info d-flex justify-content-between">
                <!-- first flex child -->
                <div class="car-text text-uppercase">
                  <h6 class="font-weight-bold">${car.make}</h6>
                  <h6>${car.model}</h6>
                </div>
                <!-- second flex child -->
                <h5 class="car-value align-self-center py-2 px-3">
                  $
                  <span class="car-price">${car.price}</span>
                </h5>
              </div>
            </div>
            <!-- end of card body  -->
            <!-- card footer -->
            <card-footer class="text-capitalize d-flex justify-content-between">
              <p>
                <span><i class="fas fa-car"></i>${car.type}</span>
              </p>
              <p>
                <span><i class="fas fa-cogs"></i>${car.trans}</span>
              </p>
              <p>
                <span><i class="fas fa-gas-pump"></i>${car.gas}</span>
              </p>
            </card-footer>
            <!-- end of card footer -->
          </div>
        </div>
        <!-- end single car -->`;
  });
}
