// 백엔드로 요청을 보낼 때 사용하기 위한 유틸리티 함수

import { API_BASE_URL } from "../api-config";

export function callAPI(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        window.location.href = "/login"; // redirect
      } else {
        Promise.reject(response);
        throw Error(response);
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}

export function signin(userDTO) {
  return callAPI("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      // token이 존재하는 경우, Todo 화면으로 리다이렉트
      window.location.href = "/";
    }
  });
}
