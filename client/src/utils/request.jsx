
const API_DOMAIN =("http://localhost:3055/api/v1/"
)
export const get = async (path) =>{
    const response = await fetch(API_DOMAIN+path,{
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
        },
        credentials: "include",
    });
    const result = await response.json();
    return result;
}

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


export const del = async (path) =>
{
    const response = fetch(API_DOMAIN+ path, {
        method:"DELETE",
    });
    const result = await response.json();
    return result;
}

export const patch = async(path, option)=>{
    const response = fetch(API_DOMAIN +path, {
        method:"PATCH",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(option),
    });
    const result = await response.json();
    return result;
}