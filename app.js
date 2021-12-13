const MAPA_API   = 'https://nominatim.openstreetmap.org/search?q='
const DEPTO      = ', Artigas, Uruguay' // Ayuda del mapa
const COMP_QUERY = '&format=json&polygon=1&addressdetails=1'

const DELIVERY_CARO   = 120
const COSTOS_DELIVERY = [
    {
        radio: 800,
        precio: 30
    },
    {
        radio: 1200,
        precio: 50
    },
    {
        radio: 2000,
        precio: 80
    }
]

// Coordenada del local
const DIR_LOCAL = {
    lat: -30.4034259,
    lon: -56.4581579
}

function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return Math.round(d * 1000);
  }
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

// const getDistance = function (x1, y1, x2, y2){
//     let y = x2 - x1;
//     let x = y2 - y1;
//     return Math.sqrt(x * x + y * y);
// }

const app = new Vue({
    el: '#app',
    data: {
        titulo: 'COCINA CASERA',
        subtitulo: "Hacé tu pedido online y estará listo!",        
        pasos: [
            {
                titulo: `<b>1. Desde el barrio hospital</b><br> el mejor delivery!`
            },
            {
                titulo: `<b>2. Hacé tu pedido</b><br>Aboná online o en nuestro local`
            },
            {
                titulo: `<b>3. Acercate a disfrutar</b><br>Comida al instante de llegar`
            }
        ],
        platos: [
            {
                imagen: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/08/hamburguesa-2028707.jpg?itok=ujl3qgM9",
                nombre: "COMBO 1",
                descripcion: "Cheddar simple junior. Hamburguesas en serio, grandes, ricas y rapidísimas",
                tiempo: 30,
                medida: "min"
            },
            {
                imagen: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/08/hamburguesa-2028707.jpg?itok=ujl3qgM9",
                nombre: "PLATO 1",
                descripcion: "Ensalada de pollo grill.\nExquisita, fresca y crujiente, perfecta para el verano",
                tiempo: 30,
                medida: "min"
            },
            {
                imagen: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/08/hamburguesa-2028707.jpg?itok=ujl3qgM9",
                nombre: "POSTRE 1",
                descripcion: "Sundae de vainilla o chocolate.\nUn clásico, pero con las más ricas y variadas salsas",
                tiempo: 30,
                medida: "min"
            }
        ],
        buscador: {
            direccion: '',
            barrio: ''
        },
        resultado: {
            delivery: 0,
            metros: 0
        }
    },
    methods: {
        buscarDireccion: function (){
            let direccion = this.buscador.direccion
            axios.get(MAPA_API + direccion + DEPTO + COMP_QUERY).then( res => {
                const dirCoord = res.data.filter(item => item.osm_type == "node")[0]
                const lat      = parseFloat(dirCoord.lat)
                const lon      = parseFloat(dirCoord.lon)
                const distancia = getDistance(DIR_LOCAL.lat, DIR_LOCAL.lon, lat, lon)
                let costo      = DELIVERY_CARO

                COSTOS_DELIVERY.map( item => {
                    if(item.radio < distancia){
                        costo = item.precio
                    }
                })

                this.resultado.delivery = costo


                console.log("costo: ", costo, distancia)
            })
        }
    }
})