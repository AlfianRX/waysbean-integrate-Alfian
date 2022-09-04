import rwanda from "../assets/img/kopi_rwanda.png"
import ethiopia from "../assets/img/kopi_ethiopia.png"
import guetemala from "../assets/img/kopi_guetemala.png"
import nicaragua from "../assets/img/kopi_nicaragua.png"

const transactionData =[
    {
        id: 1,
        day: 'Saturday,',
        date: '5 March 2020',
        status: 'On The Way',
        subTotal: 69000,
        product:[
            {
                id: 1,
                name: 'RWANDA Beans',
                price: 270000,
                img: rwanda,
                toping: [
                    {
                        id: 5,
                        name: 'Bill Berry Boba',
                        price: 2000,
                    },
                    {
                        id: 1,
                        name: 'Bubble Tea Gelatin',
                        price: 3000,
                    },
                ]
            },
        ]
    }
]

export default transactionData