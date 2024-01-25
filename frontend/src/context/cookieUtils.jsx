export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
          console.log('cookie received for user')
        return decodeURIComponent(cookieValue);
      }
    }
    return null; 
  }
  
  export function setCookie(name, value, options = {}) {
    if (value === null) {
        options.expires = new Date(0);
        console.log('cookie expired');
    } else {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        console.log('cookie set');
        console.log(cookieString);

        for (const option in options) {
            if (options.hasOwnProperty(option)) {
                cookieString += `; ${option}=${options[option]}`;
            }
        }

        document.cookie = cookieString;
    }
}
  