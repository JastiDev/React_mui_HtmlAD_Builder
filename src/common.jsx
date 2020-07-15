export const MY_GOOGLE_API_KEY = 'AIzaSyCECthHE0MkBqQQTcKqK8dUP8MFpV8hVjs';
export const urlServer = 'https://newspaperads.in/api/adbuilder/files/';

export let dpiX = 96;
export let dpiY = 96;

export const setDpi = (x, y) => {
  dpiX = x;
  dpiY = y;
};

export const Font_Extensions = ['eot', 'ttf', 'woff', 'woff2', 'svg'];
export const Img_Extensions = [
  'apng',
  'png',
  'bmp',
  'gif',
  'ico',
  'cur',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'svg',
  'tif',
  'tiff',
  'webp'
];

export const url2img = url => {
  return `url(${url})`;
};

export const img2url = img => {
  if (!img || img.length < 5) return '';
  return img.substr(4, img.length - 5);
};

export const url2family = url => {
  let filename = url
    .split('/')
    .pop()
    .split('.')[0];
  filename = 'My' + filename;
  filename = filename.replace('.', '');
  filename = filename.replace('-', '');
  filename = filename.replace('_', '');
  return filename;
};

export const px2num = str => {
  let num = 0;
  if (!str) str = '';
  str = '' + str;
  let len = str.length;
  if (str[len - 2] === 'p' && str[len - 1] === 'x')
    num = Number(str.slice(0, len - 2));
  else num = Number(str);

  return Math.round(num * 10000) / 10000;
};

export const pr2num = str => {
  let num = 0;
  if (!str) str = '';
  str = '' + str;
  let j = str.indexOf('%');
  num = Number(str.slice(0, j));
  return Math.round(num * 10000) / 10000;
};

export const DPI0 = 96;

export const W0 = 192;
export const H0 = 192;

export const make_the_data = (width = W0, height = H0) => {
  let item = make_Item_0(0, width, height / 3, width / 10);

  return {
    title: 'New Template',
    width,
    height,
    arrItem: [item]
  };
};

export const make_Item_0 = (id, w, h, fontSize) => {
  return {
    id: id,
    text: 'Type text here',
    idStr: `div_${id}`,
    style: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: w + 'px',
      height: h + 'px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      zIndex: 1,
      borderStyle: 'none',
      boderWidth: 0,
      borderRadius: 0,
      borderColor: 'black',
      backgroundColor: 'transparent',
      backgroundImage: '',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      fontFamily: '',
      fontSize: fontSize + 'px',
      fontStyle: 'normal',
      fontWeight: '400',
      color: 'black',
      textAlign: 'center',
      alignItems: 'center', //adding for text vertical alignment
      display: 'grid', //adding for text vertical alignment
      verticalAlign: 'middle',
      textAlignVertical: 'none', // this is the trick, not css
      useCustomFont: false, // this is not css, this is trick for google/custom font switch
      customFontURL: '' // this is not css
    }
  };
};

export const parseImportedHtmlToJson = text => {
  // text = text.replace(new RegExp("rui19921209", 'g'), "#");

  let i = text.indexOf('<myprojectjson>'); // 15 characters
  let j = text.indexOf('</myprojectjson>'); // 16 characters

  let ss = text.substr(i + 15, j - i - 15);
  let json = JSON.parse(ss);
  return json;
};

export const makeExportHtml = theData => {
  let strFontLink = '';
  let strStyleSheet = '';
  theData.arrItem.forEach(item => {
    if (item.style['useCustomFont']) {
      let url = item.style['customFontURL'];
      let family = url2family(url);

      strStyleSheet += `
        <style tyle="text/css">
        @font-face {
          font-family: '${family}';
          src: url('${url}');
        }
        </style>
        `;
    } else {
      let fontFamily = item.style['fontFamily'] || 'Droid Sans';
      fontFamily = fontFamily.replace(' ', '+');
      strFontLink += `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${fontFamily}"></link>`;
    }
  });

  let strTheData = JSON.stringify(theData);
  let strContent = document.getElementById('exposable_container').innerHTML;
  let exportHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style type="text/css">
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
              monospace;
          }
        </style>
        ${strStyleSheet}
        ${strFontLink}
      </head>
      <body>
        ${strContent}
      </body>
      </html>`;

  // <div style="display:none;">
  //   <myprojectjson>
  //     ${strTheData}
  //   </myprojectjson>
  // </div>

  // exportHtml = exportHtml.replace(/\s{2,}/g, '')   // <-- Replace all consecutive spaces, 2+
  //   .replace(/%/g, '%25')     // <-- Escape %
  //   .replace(/&/g, '%26')     // <-- Escape &
  //   .replace(/#/g, '%23')     // <-- Escape #
  //   .replace(/"/g, '%22')     // <-- Escape "
  //   .replace(/'/g, '%27');    // <-- Escape ' (to be 100% safe)

  return exportHtml;
};
