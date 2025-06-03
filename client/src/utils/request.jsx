
const API_DOMAIN =("http://localhost:3055/api/v1/"
)
export const get = async (path) => {
    if (!API_DOMAIN) {
        throw new Error("API_DOMAIN không được định nghĩa");
    }
    const response = await fetch(API_DOMAIN + path, {
        headers: {
            Accept: "application/json, application/pdf", // Hỗ trợ JSON và PDF
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType.includes("application/json")) {
        return await response.json();
    } else if (contentType.includes("application/pdf")) {
        return await response.blob(); // Trả về Blob cho PDF
    } else {
        throw new Error(`Loại nội dung không được hỗ trợ: ${contentType}`);
    }
};

export const post = async (path, options) =>{
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(options),
        credentials: "include",
    });
    const result = await response.json();
    return result;
}
export const postform = async (path, formData) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    body: formData, // body là FormData
    credentials: "include",
  });
  const result = await response.json();
  return result;
};


export const del = async (path, options = {}) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
        credentials: "include",
    });
    const result = await response.json();
    return result;
};


export const patch = async (path, options = {}) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
        credentials: "include",
    });
    const result = await response.json();
    return result;
};
