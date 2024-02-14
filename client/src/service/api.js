//ye page basicall api ke bare me btayga ki api backend me handle kase horhi hai agar api ka response hai to kaisa hoga agar error aaraah hai to bhi kase way me handle krna hia
//aur hm yaha centralize bhi krrhe hain sari apis ko ek sath kse handle kr hm messages ko modify kr pa rhe hain through interceptors ki help se
//// api notification hme help krrhi hai btane me ki error kis trah ka sare tareeke ke handle hm krrrhe hain

import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
const API_URL = "http://localhost:8000"; // server ka url hai

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  // interceptor use kiya hai
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Stop global loader here jab hm call kr rahe hote hain toloader aata hai use hm rok sakte hain interceptors ki vjh se
    return processResponse(response);
  },
  function (error) {
    // Stop global loader here
    return Promise.reject(ProcessError(error));
  }
);

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse = (response) => {
  if (response?.status === 200) {
    //response? mtlb resonse hona chhiy isisliy question mark
    return { isSuccess: true, data: response.data }; // jab response aata hai to response ek object hoti hai uske andar data ek field hoti hai uske andar hamara exact response msg hota hai
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};
// error hmara teen tareeka ka hota hai
//1. response
//2. request
//3. blank simple ek msg aayga
// 2 and 3 me request jaa nhi pati hai backend me

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////

const ProcessError = (error) => {
  if (error.response) {
    // Request made and server responded with a status code
    // that falls out of the range of 2xx
    console.log("ERROR IN RESPONSE: first ", error);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received to connectivity issue hai ya network issue hai
    console.log("ERROR IN RESPONSE: second ", error.request);
    console.log(error.toJson());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // Something happened in setting up the request that triggered an Error mostly frontend ki galti hoti hai
    console.log("ERROR IN RESPONSE: third", error.message);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};
// common api bnai hai by using for of loop ye hmara chlega ek k baad ek service url se
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  // yaha signup key hogi aur uska value url diya hai jo service url me vo hoga
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    //showupload and showdownload jab api request jarhi hoti hai ya aa rhi hoti hai to ye out of 100 progress btataa hai aur jab complete ho jati hai to 100 dikhata hai
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API };
