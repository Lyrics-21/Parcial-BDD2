//1)
Use cafeteria
db.cafesEspeciales.insertMany([
    {
        _id: 1,
        tipo: "espresso",
        ingredientes: ["vainilla", "caramelo"],
        pesoEnGramos: 250,
        intensidad: "baja",
        precios: [{tipo: "efectivo", precio: 500}, {tipo: "tarjeta", precio: 550}],
        contieneLeche: true,
        tostador: {localidad: "Santos", nombre: "tostado fino", cuit: 20441454334}
    },
    {
        _id: 2,
        tipo: "filtrado",
        ingredientes: ["vainilla", "chocolate"],
        pesoEnGramos: 260,
        intensidad: "alta",
        precios: [{tipo: "efectivo", precio: 800}, {tipo: "tarjeta", precio: 850}],
        contieneLeche: false,
        tostador: {localidad: "Santos", nombre: "tostado fino", cuit: 20441454334}
    },
    {
        _id: 3,
        tipo: "espresso",
        ingredientes: ["descafeinado"],
        pesoEnGramos: 200,
        intensidad: "media",
        precios: [{tipo: "efectivo", precio: 600}, {tipo: "tarjeta", precio: 650}],
        contieneLeche: true,
        tostador: {localidad: "San justo", nombre: "tostado medio", cuit: 20441454334}
    },
    {
        _id: 4,
        tipo: "flat white",
        ingredientes: ["licor", "caramelo"],
        pesoEnGramos: 280,
        intensidad: "alta",
        precios: [{tipo: "efectivo", precio: 900}, {tipo: "tarjeta", precio: 950}],
        contieneLeche: false,
        tostador: {localidad: "San justo", nombre: "tostado intenso", cuit: 20441454334}
    },
    {
        _id: 5,
        tipo: "cold brew",
        ingredientes: ["chocolate", "canela"],
        pesoEnGramos: 220,
        intensidad: "media",
        precios: [{tipo: "efectivo", precio: 500}, {tipo: "tarjeta", precio: 550}],
        contieneLeche: true,
        tostador: {localidad: "San justo", nombre: "tostado fino", cuit: 20441454334}
    },
    {
        _id: 6,
        tipo: "espresso",
        ingredientes: ["chocolate", "canela"],
        pesoEnGramos: 250,
        intensidad: "media",
        precios: [{tipo: "efectivo", precio: 500}, {tipo: "tarjeta", precio: 550}],
        contieneLeche: true,
        tostador: {localidad: "Boston", nombre: "tostado medio", cuit: 20441454334}
    },
    {
        _id: 7,
        tipo: "descafeinado",
        ingredientes: ["vainilla", "chocolate", "canela"],
        pesoEnGramos: 250,
        intensidad: "baja",
        precios: [{tipo: "efectivo", precio: 900}, {tipo: "tarjeta", precio: 950}],
        contieneLeche: true,
        tostador: {localidad: "Cordoba", nombre: "tostado fino", cuit: 20441454334}
    },
    {
        _id: 8,
        tipo: "filtrado",
        ingredientes: ["canela"],
        pesoEnGramos: 220,
        intensidad: "alta",
        precios: [{tipo: "efectivo", precio: 400}, {tipo: "tarjeta", precio: 450}],
        contieneLeche: false,
        tostador: {localidad: "Caba", nombre: "tostado fino", cuit: 20441454334}
    },
    {
        _id: 9,
        tipo: "latte",
        ingredientes: ["chocolate", "canela"],
        pesoEnGramos: 280,
        intensidad: "media",
        precios: [{tipo: "efectivo", precio: 1500}, {tipo: "tarjeta", precio: 1550}],
        contieneLeche: true,
        tostador: {localidad: "Boston", nombre: "tostado medio", cuit: 20441454334}
    },
    {
        _id: 10,
        tipo: "flat white",
        ingredientes: ["vainilla", "caramelo"],
        pesoEnGramos: 220,
        intensidad: "baja",
        precios: [{tipo: "efectivo", precio: 800}, {tipo: "tarjeta", precio: 850}],
        contieneLeche: true,
        tostador: {localidad: "Tucuman", nombre: "tostado fino", cuit: 20441454334}
    },
    {
        _id: 11,
        tipo: "cold brew",
        ingredientes: ["vainilla", "caramelo"],
        pesoEnGramos: 250,
        intensidad: "baja",
        precios: [{tipo: "efectivo", precio: 800}, {tipo: "tarjeta", precio: 850}],
        contieneLeche: true,
        tostador: {localidad: "Tucuman", nombre: "tostado medio", cuit: 20441454334}
    }
])

//2)
db.cafesEspeciales.aggregate([{$match: {ingredientes: "chocolate"}}, {$count: "Total de cafes con chocolate"}])
//3)
db.cafesEspeciales.aggregate([{$match: {ingredientes: "vainilla", tipo: "cold brew"}}, {$count: "Total de cafes con vainilla y tipo cold brew"}])
//4)
db.cafesEspeciales.aggregate([{$match: {intensidad: "media"}}, {$project: {_id: 0, tipo: 1, peso: 1}}])
//5)
db.cafesEspeciales.aggregate([{$match: {pesoEnGramos: {$gte: 200, $lte: 260}}}, {$project: {_id: 0, tipo: 1, pesoEnGramos: 1, intensidad: 1}}])
//6)
db.cafesEspeciales.aggregate([{$unwind: "$tostador"}, {$match: {"tostador.localidad": /san/i}}, {$sort: {pesoEnGramos: -1}}])
//7)
db.cafesEspeciales.aggregate([{$group: {_id: "$tipo", sumaPeso: {$sum: "$pesoEnGramos"}}}])
//8)
db.cafesEspeciales.updateMany({intensidad: "alta"}, {$push: {ingredientes: "whisky"}})
//9)
db.cafesEspeciales.updateMany({pesoEnGramos: {$gte: 200, $lte: 260}}, {$inc: {pesoEnGramos: 10}})
//10)
db.cafesEspeciales.deleteMany({pesoEnGramos: {$lte: 210}})