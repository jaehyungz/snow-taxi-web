//  const emailRegex = /^[a-zA-Z0-9._%+-]+@sookmyung\.ac\.kr$/i;
export const validEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@sookmyung\.ac\.kr$/i);

// 적어도 하나의 알파벳,숫자를 포함하는 8자 이상
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");
