
export default function OrderActions(state, type, value = null) {
    switch(type){
        case 'sortByValue':
            return sortByValue(state);
        case 'sortByDate':
            return sortByDate(state);
        case '1': case '0':
            return filterByStatus(state, type);
        default:
            return state;
    }
}
function sortByValue(state){
    return state.sort((a, b) => a.sum - b.sum);
}
function sortByDate(state){
    return state.sort((a, b) => {
        const d1 = new Date(a.createdAt);
        const d2 = new Date(b.createdAt);
        if(d1.getTime() < d2.getTime()) return -1;
        if(d1.getTime() > d2.getTime()) return 1;
        return 0;
    });
}
function filterByStatus(state, value){
    return state.filter(order => order.status.toString() === value);
}