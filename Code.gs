const SPREADSHEET_ID = '1h8WinT719cakxB8CyRfae9sdK96b9THu6-mfdolpvE4';
const SHEET_NAME = '수령현황';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('JJAS 굿즈 수령 확인')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getSheet_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('수령현황 시트를 찾을 수 없습니다.');
  return sheet;
}

function findOrders(name) {
  const query = String(name || '').trim();
  if (!query || query.length > 40) throw new Error('이름을 정확히 입력해 주세요.');
  const values = getSheet_().getDataRange().getDisplayValues();
  return values.slice(1).filter(row => row[1].trim() === query).map(row => ({
    id: row[0], name: row[1], item: row[2], orderedSize: row[3], quantity: Number(row[4]),
    received: row[5], sizeCheck: row[6], actualSize: row[7]
  }));
}

function saveOrders(name, updates) {
  const query = String(name || '').trim();
  if (!query || !Array.isArray(updates) || updates.length === 0 || updates.length > 100) {
    throw new Error('저장할 주문이 올바르지 않습니다.');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSheet_();
    const rows = sheet.getDataRange().getDisplayValues();
    const index = new Map(rows.slice(1).map((r, i) => [r[0], {row: i + 2, values: r}]));
    const seen = new Set();
    const prepared = updates.map(u => {
      if (!u || typeof u.id !== 'string' || seen.has(u.id)) throw new Error('중복되거나 잘못된 주문입니다.');
      seen.add(u.id);
      const found = index.get(u.id);
      if (!found || found.values[1].trim() !== query) throw new Error('주문 정보가 일치하지 않습니다.');
      const received = String(u.received || '');
      let sizeCheck = String(u.sizeCheck || '');
      let actualSize = String(u.actualSize || '').trim();
      if (!['', '수령 완료', '미수령'].includes(received)) throw new Error('수령 여부를 확인해 주세요.');
      if (found.values[3] === '') {
        sizeCheck = '해당 없음';
        actualSize = '';
      } else if (received !== '수령 완료') {
        sizeCheck = '';
        actualSize = '';
      } else {
        if (!['', '일치', '불일치', '확인하지 못함'].includes(sizeCheck)) throw new Error('사이즈 확인 값을 확인해 주세요.');
        if (sizeCheck === '불일치' && (!actualSize || actualSize.length > 50)) throw new Error('실제로 받은 사이즈를 입력해 주세요.');
        if (sizeCheck !== '불일치') actualSize = '';
      }
      return {row: found.row, data: [received, sizeCheck, actualSize, new Date()]};
    });
    prepared.forEach(p => sheet.getRange(p.row, 6, 1, 4).setValues([p.data]));
    return {success: true, count: prepared.length};
  } finally {
    lock.releaseLock();
  }
}
