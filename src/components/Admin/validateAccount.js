
export default function validateAccount(phone, pass1, pass2) {
    const regex = new RegExp('^0[0-9]+$');
    if(regex.test(phone)===false) return 'Invalid phone number (phone number only contain number and start with 0)';
    if(pass1 !== pass2) return 'Password not match';
    return '';
}
