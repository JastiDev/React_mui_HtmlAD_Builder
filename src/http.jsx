import axios from 'axios';

const urlServer = 'https://newspaperads.in/api/adbuilder';


export const readAllTemplate = () => {
  return fetch(urlServer + "/template", {
    method: 'GET'
  }).then(resp => {
    return resp.json();
  });
}

export const createTempalte = (adContent) => { 
  return fetch(urlServer + "/template", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      adContent
    })
  }).then(resp => resp.json());
}

// export const updateTemplate = (theData) => { 
//   return fetch(urlServer + "/template"+"/update", {
//     method: 'POST',
//     body: {
//       adContent: JSON.stringify()
//     }
//   }).then(resp => resp.json());

// }

export const deleteTemplate = (template) => {
  return fetch(urlServer + "/template/delete", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(template)
  }).then(resp => resp.json());
}


export const makePDF = ( width, height, formData ) => {
  return axios.post(`${urlServer}/generatead?width=${width/96}&height=${height/96}`, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}


export const uploadToS3 = (formData) => {
  return axios.post(urlServer +"/files", formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export const readS3 = () => { 
  return axios.get("https://newspaperads.in/api/adbuilder/files/");
}