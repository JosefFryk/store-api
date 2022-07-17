

const result = document.querySelector('.result');


const fetchProduct = async () => {
    result.innerHTML = `<h2>Loading...</h2>`
    try {
        const id = window.location.search
        const data = await axios.get(`/api/single-product${id}`)
        const {name,description,price,imageAttach} = data.data
        result.innerHTML = `
            <h1 class="title">Single Product</h1>
            <article class="product">
            <img class="product-img"
            src="${imageAttach[0].url}"
            alt="${name}"
            />
            <div class="product-info">
                <h5 class="title">${name}</h5>
                <h5 class="price">$${price}</h5>
                <p class="desc">${description}</p>
            </div>
            </article>
        `
    } catch (error) {
        result.innerHTML = `<h2>${error.response.data}</h2>`
    }
}

fetchProduct()