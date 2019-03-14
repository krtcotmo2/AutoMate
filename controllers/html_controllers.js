var express = require("express");
const router = express.Router();
const dbs = require("../models");
const connection = require("../config/connection.js");

const jwt = require("jsonwebtoken");

let secureConnection = (req, res, next) => {
  let token, decoded;
  if (req.cookies.token) {
    token = req.cookies.token;
    decoded = jwt.verify(token, "someTypeOfPW");
    req.body.userId = decoded.id;
    req.body.curCar = decoded.curCar;
  }

  if (decoded) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/", function(req, res) {
  res.render("index", {
    title: "AutoMate"
  });
});

router.get("/editCar", secureConnection, function(req, res) {
  let carID = req.body.curCar;
  if (!carID || carID === 0) {
    dbs.Manufacturer.findAll({
      order: [["manufacturerName", "ASC"]]
    }).then(function(data) {
      res.render("editCar", {
        title: "Add/Edit Car",
        manufacturer: data
      });
    });
  } else {
    res.render("editCar", {
      title: "Add/Edit Car"
    });
  }
});

router.get("/car", secureConnection, function(req, res) {
  let carId = req.body.curCar;
  dbs.Car.findOne({ where: { id: carId } })
    .then(function(data) {
      res.render("car", { title: "AutoMate", car: data });
    })
    .catch(function(err) {
      res.status(500).json({ message: err });
    });
});

router.post("/fuel", secureConnection, function(req, res) {
 let carId = req.body.curCar;
  dbs.Fuel.create(req.body).then(function(Fuel) {
    res.render(Fuel);
  });
});

router.get("/fuels", secureConnection, function(req, res) {
  let carId = req.body.curCar;
  models.Fuel.findAll({
    where: {
      carId: 1
    },
    // Add order conditions here....
    order: [["purchaseDate", "DESC"]]
  }).then(function(data) {
    const allFuels = {
      fuels: data
    };
    res.render("fuels", allFuels);
  });
});

router.get("/fuel", secureConnection, function(req, res) {
  if (req.params.fuelID === "0") {
    // models.Fuel.findOne({
    //   where: {
    //     id: req.params.fuelID
    //   }
    res.render("fuel");
  } else {
    models.Fuel.findOne({
      where: {
        id: req.params.fuelID
      }
    }).then(function(data) {
      const oneFuel = {
        newDate: data.purchaseDate.toLocaleDateString(),
        fuels: data
      };
      // res.render("fuels", oneFuel);
      res.render("fuel", oneFuel);
    });
  }
});

router.post("/service", secureConnection, function(req, res) {
  models.Service.create(req.body).then(function(saveResult) {
    res.json(saveResult);
  });
});

router.post("/serviceEntered", secureConnection, function(req, res) {
  let serviceId = req.body.serviceId;
  let serviceDone = req.body.serviceDone;
  let inserts = [];

  for (let i = 0; i < serviceDone.length; i++) {
    inserts.push([parseInt(serviceId), parseInt(serviceDone[i])]);
  }
  connection.query(
    "INSERT INTO serviceitems (serviceId, serviceTypeId) VALUES (?)",
    inserts,
    function(error, result) {
      console.log(result);
    }
  );
});
router.get("/services", secureConnection, function(req, res) {
  models.Service.findAll({}).then(function(data) {
    const allServices = {
      services: data
    };
    res.render("services", allServices);
  });
});

router.get("/service", secureConnection, function(req, res) {
  models.Service.findOne({
    where: {
      id: req.params.serviceID
    }
  }).then(function(data) {
    let theService = data;

    models.ServiceType.findAll().then(function(data) {
      const oneService = {
        servicetype: data,
        service: theService
      };

      res.render("service", oneService);
    });
  });
});

router.get("/search", secureConnection, function(req, res) {
  models.Fuel.findAll({
    where: {
      carId: 1
    }
  }).then(function(data) {
    const allSearch = {
      fuels: data
    };
    res.render("search", allSearch);
  });
});

module.exports = router;
