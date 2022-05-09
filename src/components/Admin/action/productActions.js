
export default function ProductsAction(state, type, value=null) {
    console.log(type);
    switch(type){
        case 'sortByName':
            return sortByName(state);
        case 'sortByPrice':
            return sortByPrice(state);
        case 'filterByType':
            return filterByType(state, value);
        case '1': case '0':
            return filterByStatus(state, type);
        default:
            return state;
    }
}
function sortByName(state){
    return state.sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });
}
function sortByPrice(state){
    return state.sort((a, b) => {
        if(a.prices < b.prices) return -1;
        if(a.prices > b.prices) return 1;
        return 0;
    });
}
function filterByType(state, value){
    return state.filter(product => product.typeId.type === value);
}
function filterByStatus(state, value){
    return state.filter(product => product.status.toString() === value);
}