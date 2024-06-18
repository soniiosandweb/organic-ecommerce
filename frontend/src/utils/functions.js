export const getDiscount = (price, cuttedPrice) => {
    return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
}

export const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7)
    return deliveryDate.toUTCString().substring(0, 11);
}

export const formatDate = (dt) => {
    return new Date(dt).toUTCString().substring(0,16);
}

export const getRandomProducts = (prodsArray, n) => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n)
}

export const getRelatedProducts = (prodsArray, n, id) => {
    prodsArray = prodsArray.filter((product, i) => product._id !== id)
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n)
}