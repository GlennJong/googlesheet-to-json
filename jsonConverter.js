const fs = require("fs");
const fetch = require("node-fetch");

// Get google sheet content
fs.readFile('./package.json', 'utf8', function(err, res) {
  if (err) console.log(' Oops! 找不到 package.json\n', err);
  else {
    console.log(' 找尋 package.json 中的 google_sheet 資訊')
    const { sheet_id, api_key, path } = JSON.parse(res).converter;
    buildWordingSync(sheet_id, api_key).then(wordings => {
      wordings.forEach(wording => {
        const filePath = `${path}${wording.name}.json`;
        fs.writeFile(filePath, JSON.stringify(wording.data), () => {
          console.log(` 檔案已產生於 ${filePath}`)
        });
      })
    });
  }
});


// Transfer sheet content
async function buildWordingSync(id, key) {
  try {
    console.log(' 取得 google_sheet 內容');
    const fulfilledValue = await handleFetchGoogleSheetData(id, key);

    console.log(' 已取得內容');
    const result = fulfilledValue.sheets.map(sheet => {
      return {
        data: sheetContentConverter(sheet.data),
        name: sheet.properties.title
      }
    })
    return result;
  }
  catch (err) {
    console.log(' 轉換失敗\n', err)
  }
}
// Transfer sheet content
async function buildWordingSync(id, key) {
  try {
    console.log(' 取得 google_sheet 內容');
    const fulfilledValue = await handleFetchGoogleSheetData(id, key);
    const result = fulfilledValue.sheets.map(sheet => {
      return {
        data: sheetContentConverter(sheet.data),
        name: sheet.properties.title
      };
    })

    console.log(' 已取得內容');
    return result;
  }
  catch (err) {
    console.log(' 轉換失敗\n', err)
  }
}

function sheetContentConverter(arr) {
  const pureSheetContent = getSheetContent(arr);
  const nestedData = mergeDeep(...pureSheetContent.map(line => lineConverter(line))) || {};

  return nestedData;
}

function handleFetchGoogleSheetData(id, key) {
  return new Promise((resolve, reject) => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}/?key=${key}&includeGridData=true`, {
      headers: { "Referer": "https://localhost:3000" },
    })
    .then( res => resolve(res.json()) )
    .catch( err => reject(err) )
  })
}

function getSheetContent(sheet) {
  const { rowData } = sheet[0];
  if (rowData === undefined) return [];

  const pureRows = [];
  rowData.forEach(row => {
    if (row.values) {
      const pureRow = row.values.map(value => value.formattedValue);
      if (pureRow.includes(undefined)) return;
      pureRows.push(pureRow)
    }
  })
  return pureRows;
}


function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }

      const { isArray, id, name } = arrayTypeChecker(key);
      if (isArray) {
        const arr = target[name] || [];
        if (!arr[id]) arr[id] = source[key];
        else arr[id] = {...arr[id], ...source[key]};
        delete target[key];
        Object.assign(target, { [name]:  arr })
      }
    }
  }
  return mergeDeep(target, ...sources);
}

function arrayTypeChecker(str) {
  const index = str.indexOf('#');
  if (index === -1) return { isArray: false, id: null, name: null };

  const id = Number(str.slice(index+1, str.length));
  const name = str.slice(0, index);

  return { isArray: true, id, name };
}

function lineConverter(arr) {
  let str = '';
  const lastIndex = arr.length - 1;
  const objTail = arr.map((_, j) => { return j !== arr.length - 1 && `}` || null }).join('');
  arr.forEach((item, j) => {
    const tail = lastIndex === j ? objTail: `: `;
    const head = lastIndex === j ? `` : `{`;
    str += `${head}"${item}"${tail}`;
  })
  return JSON.parse(str);
}