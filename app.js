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
        ]
    }
})