const BASE_URL = 'https://eloroverde-pjc5.onrender.com/'
const USER = 'user/'

async function Posts(data) {    
    console.log(data,"DDDDDDDDDDDDDDDDDDDDDD")
      var datas = {}
      for (var key in data) {
        if (key != 'method' && key != 'urls' && key != 'headerss' && key != 'actions') {
          datas[key] = data[key];
        }
      }
    try {
      const response = await fetch(BASE_URL + data.urls, {
        method: data.method,
        headers: data.headerss,
        body: data.method == "POST" ? JSON.stringify(datas) : null
      });
      const result = await response.json();
      result.success == true ? 
        localStorage.setItem(data.saving, JSON.stringify(result))
        && data.actions : null
      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
}

async function Gets(data) {    
  console.log(data,"DDDDDDDDDDDDDDDDDDDDDD")
    var datas = {}
    for (var key in data) {
      if (key != 'method' && key != 'urls' && key != 'headerss' && key != 'actions') {
        datas[key] = data[key];
      }
    }
  try {
    const response = await fetch(BASE_URL + data.urls, {
      method: data.method,
      headers: data.headerss,
      body: data.method == "POST" ? JSON.stringify(datas) : null
    });
    const result = await response.json();
    // result.success == true ? 
      localStorage.setItem(data.saving, JSON.stringify(result))
      // && data.actions 
      // : null
    console.log("Response:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}