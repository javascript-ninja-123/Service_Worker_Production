export default function registerServiceWorker(){
if('serviceWorker' in navigator){
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}\sw.js`)
    .then(res => console.log('serviceWorker is registered', res.scope))
    .catch(err => console.warn('Error',err))
}
}
