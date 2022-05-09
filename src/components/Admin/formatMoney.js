
export default function formatMoney(value){
    return value.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
}