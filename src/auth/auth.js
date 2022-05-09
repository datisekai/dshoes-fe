
export default function isLogin(){
   return  sessionStorage.getItem('token') ? true : false;
}