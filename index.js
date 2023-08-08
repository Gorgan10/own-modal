let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Oranges', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://www.pngmart.com/files/8/Mango-PNG-File-Download-Free.png'},
]

const renderFruits = fruit => `
       <div class="card-body">
           <h2>${fruit.title}</h2>
           <img src="${fruit.img}" alt="${fruit.title}" />
           <div class="card-bottom">
            <a href="#"  class="btn btn-primary" data-details="price" data-id="${fruit.id}">See the price</a>
            <a href="#" class="btn btn-danger" data-details="remove" data-id="${fruit.id}">Delete</a>
           </div>
       </div>
`


function render() {
    const html = fruits.map(renderFruits).join('\n')
    document.querySelector('#fruits').innerHTML = html
}

render()



const priceModal = $.modal({
    title: `The Price`,
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler() { // type: primary for bootstrap
                priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.details
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    
    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Price of ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if(btnType === 'remove') {
        $.confirm({
            title: `Are you sure?`,
            content: `Do you want to remove <strong>${fruit.title}?</strong>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})