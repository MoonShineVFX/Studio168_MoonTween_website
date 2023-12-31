// POST https://studio168-moontwin.msvfx.com/api/v1/getuserinfo



export const fetchDataFromApi = async (utoken) => {
  const apiUrl = 'https://studio168-moontwin.msvfx.com/api/v1/checkIsUser';
  const authToken = process.env.REACT_APP_API_TOKEN
  const headers = {
    'Authorization': authToken,
    'Content-Type': 'application/json',
  };

  const requestBody = {
    'utoken': utoken,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('API request failed.');
    }
  } catch (error) {
    throw error;
  }
};


export const fetchCheckIsModelApi = async (utoken) => {
  const apiUrl = 'https://studio168-moontwin.msvfx.com/api/v1/checkIsModel';
  const authToken = process.env.REACT_APP_API_TOKEN


  const headers = {
    'Authorization': authToken,
    'Content-Type': 'application/json',
  };

  const requestBody = {
    'qrcode': utoken,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('API request failed.');
    }
  } catch (error) {
    throw error;
  }
};


const test = ()=>{
  const utoken = "123465";

  fetchDataFromApi(utoken)
    .then(data => {
      console.log(data);
      if(!data){
        console.log('查無使用者')

      }else{
        console.log('有此人')
        
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
