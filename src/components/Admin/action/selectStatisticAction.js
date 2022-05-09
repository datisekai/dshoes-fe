
export default function SelectStatisticAction(state, selectValue) {
    const statisticSortByQuantity = state.sort((a, b) => b.totalQuantity - a.totalQuantity);
    const statisticSortByMoney = state.sort((a, b) => b.totalMoney - a.totalMoney);
    console.log(statisticSortByMoney);
    const nameQuantity = statisticSortByQuantity.slice(0, selectValue).map(item => item.product.name);
    const nameMoney = statisticSortByMoney.slice(0, selectValue).map(item => item.product.name);
    let quatity = state.map(item => item.totalQuantity);
    let money = state.map(item => item.totalMoney);
    quatity = quatity.sort((a, b) => b - a).slice(0, selectValue);
    money = money.sort((a, b) => b - a).slice(0, selectValue);
    return { quatity, money, nameQuantity, nameMoney };
}