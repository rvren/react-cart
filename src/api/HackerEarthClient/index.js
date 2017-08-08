
var GENERIC_ERROR = 'Oops. Something went wrong. Please contact support.'

export var commonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export var commonFetchOpts = {
    timeout: 1,
}


 export function handleErrors(response) {
   try {
     if (!response.ok) {
       return response.json().then(err => {
         return Promise.reject(err);
       })
     }
   } catch(err) {
     return Promise.reject(GENERIC_ERROR)
   }
   return response.json()
 }


/**
 * Creates a new account using the hash input as parameters to the api
 * call to the server.
 * @param  {Object} forUser hash with user attributes coresponding to columns in the db table.
 * @return {Promise<Object>}  returns hash with authentication token and user id.
 */


// API used to fetch all list items
export async function getAllProducts() {
    return fetch(`https://api.myjson.com/bins/qhnfp`, {
        method: 'GET',
        headers: {...commonHeaders },
    }).then(handleErrors).then(response => {
        return Promise.resolve(response)
    })

}

export default {
    getAllProducts
}
