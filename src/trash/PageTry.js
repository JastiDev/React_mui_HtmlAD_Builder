import React, { useState } from 'react'
import { TemplateGridList } from './components/TemplateGridList';
import { DPI0, W0, H0, newId, px2num, make_Item_0, url2family, parseImportedHtmlToJson } from '../common';
import axios from 'axios';

export const PageTry = ({ arrS3File }) => {

  const [arrItem, setArrItem] = useState();

  let arrTemplate = arrS3File.filter((s3file) => { 
    let ext = s3file.split(".").pop();
    return (ext === 'html');
  });

  const handleClickTemplate = (tUrl) => { 
    // let url = "https://newspaperads.in/api/adbuilder/template";
    // fetch(url, {
    //   method: 'GET',
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    // .then(data => {
    //   console.log(data);
    //   // setArrItem(data);
    // });

    // let url2 = "https://newspaperads.in/api/adbuilder/template";
    // fetch(url2, {
    //   method: "POST",
    //   body: JSON.stringify({adContent:'AAA'}),
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     // setArrItem(data);
    //   });

    // @CrossOrigin
    // @RequestMapping(value = "/template", method = RequestMethod.POST)
    // public @ResponseBody ReturnMessage addNewHTMLAdTemplate(@RequestBody HTMLAdTemplate htmlAdTemplate) {

    //   ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
    //   ReturnMessage returnMessage = new ReturnMessage();
    //   returnMessage.setMessage("Template added");

    //   System.out.println("htmlAdTemplate : " + htmlAdTemplate.getAdContent());

    //   AdminBean adminBean = (AdminBean) context.getBean("adminBean");

    //   adminBean.addHTMLAdTemplate(htmlAdTemplate);

    //   return returnMessage;

    // }
    // const fileSelector = document.createElement('input');
    // fileSelector.setAttribute('type', 'file');
    // fileSelector.onchange = (e) => {
    //   if (e.target.files.length === 0) return;
    //   let file = e.target.files[0];

    //   const fr = new FileReader();
    //   fr.onloadend = (event) => {
    //     let text = event.target.result;
    //     let arrItem = parseImportedHtmlToJson(text);
    //     console.log(arrItem);
    //     setArrItem(arrItem);
    //   };
    //   fr.readAsText(file);
    // }
    // fileSelector.click();

    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.onchange = (e) => {
      if (e.target.files.length === 0) return;
      let file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);

      axios.post(`https://newspaperads.in/api/adbuilder/generatead?width=${2.2}&height=${3}`, formData, {
          headers: { "content-type": "multipart/form-data" },
      }).then(resp => { 
        console.log(resp.data);
      }).catch((err)=>console.log(err));

    }
    fileSelector.click();


  }

  const width = W0;
  const height = H0;

  return (
    <div style={{height:'100%', display:'flex'}}>
      <div style={{ flex: 1 }}>
        Edit Content Panel
      </div>
      <div style={{ flex: 2 }}>
        <div
          style={{
            flex: 1,
            padding: "20px 20px",
            backgroundColor: "grey",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >

          {arrItem && (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: "white",
                position: "relative",
              }}
            >
              {arrItem.map((item, i) => (
                <div key={item.id} id={item.idStr} style={{ ...item.style, backgroundColor:'blue' }}>
                  {i}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <TemplateGridList arrTemplate={arrTemplate} handleClickTemplate={handleClickTemplate}/>
      </div>
    </div>
  )
}


// @CrossOrigin
// @RequestMapping(value = "/generatead", method = RequestMethod.POST)
// public @ResponseBody ReturnMessage generateAd(HttpServletRequest request, HttpServletResponse response,
// @RequestParam("file") MultipartFile file, @RequestParam("height") String height, @RequestParam("width") String width) {

// @CrossOrigin
// @RequestMapping(value = "/generatead", method = RequestMethod.POST)
// public @ResponseBody ReturnMessage generateAd(HttpServletRequest request, HttpServletResponse response,
// @RequestParam("file") MultipartFile file) {

//   ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
//   ReturnMessage returnMessage = new ReturnMessage();

//   if (!file.isEmpty()) {
//     try {
//       UploadFile s3Folder = new UploadFile();

//       File convFile = new File(file.getOriginalFilename());
//       System.out.println("HTML file : " + file.getOriginalFilename());

//       convFile.createNewFile();
//       FileOutputStream fos = new FileOutputStream(convFile);
//       fos.write(file.getBytes());
//       fos.close();

//       String ext = file.getOriginalFilename().substring(
//         file.getOriginalFilename().lastIndexOf(".") + 1, file.getOriginalFilename().length());

//       String destinationFile = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(64), ext);

//       s3Folder.addAdBuilderHTML(destinationFile, convFile, s3Folder.getAmazonS3Client());

//       returnMessage.setReturnUrl("https://maps-pdf.s3.ap-south-1.amazonaws.com/html_ads/" + destinationFile);

//       returnMessage.setStatus(Constants.USER_AJAX_RESPONSE_SUCCESS);
//     } catch (Exception e) {
//       System.out.println("Exception : " + e);
//       returnMessage.setStatus(Constants.USER_AJAX_RESPONSE_ERROR);
//     }
//   } else {
//     returnMessage.setStatus(Constants.USER_AJAX_RESPONSE_ERROR);
//   }

//   System.out.println("returnMessage : " + returnMessage);
//   return returnMessage;

// }
