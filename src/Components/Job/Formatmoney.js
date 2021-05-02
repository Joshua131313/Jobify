export function Formatmoney(money) {
   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(parseInt(money))+'/hour'
}  