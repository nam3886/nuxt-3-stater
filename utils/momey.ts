class CountingMoneyByWords {
  private _unit = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ'];
  private _numberByWords = [
    ' không ',
    ' một ',
    ' hai ',
    ' ba ',
    ' bốn ',
    ' năm ',
    ' sáu ',
    ' bảy ',
    ' tám ',
    ' chín ',
  ];

  private _read3DigitNumbers(baso: number) {
    const tram = parseInt((baso / 100).toString());
    const chuc = parseInt(((baso % 100) / 10).toString());
    const donvi = baso % 10;
    let KetQua = '';

    if (tram === 0 && chuc === 0 && donvi === 0) return '';

    if (tram !== 0) {
      KetQua += this._numberByWords[tram] + ' trăm ';
      if (chuc === 0 && donvi !== 0) KetQua += ' linh ';
    }

    if (chuc !== 0 && chuc !== 1) {
      KetQua += this._numberByWords[chuc] + ' mươi';
      if (chuc === 0 && donvi !== 0) KetQua = KetQua + ' linh ';
    }

    if (chuc === 1) KetQua += ' mười ';
    switch (donvi) {
      case 1:
        if (chuc !== 0 && chuc !== 1) {
          KetQua += ' mốt ';
        } else {
          KetQua += this._numberByWords[donvi];
        }
        break;
      case 5:
        if (chuc === 0) {
          KetQua += this._numberByWords[donvi];
        } else {
          KetQua += ' lăm ';
        }
        break;
      default:
        if (donvi !== 0) {
          KetQua += this._numberByWords[donvi];
        }
        break;
    }

    return KetQua;
  }

  public read(money: number) {
    let lan = 0;
    let i = 0;
    let so = 0;
    let KetQua = '';
    let tmp = '';
    let soAm = false;
    const ViTri: number[] = [];
    if (money < 0) soAm = true; // return "Số tiền âm !";
    if (money === 0) return 'Không đồng'; // "Không đồng !";
    if (money > 0) {
      so = money;
    } else {
      so = -money;
    }
    if (money > 8999999999999999) {
      // SoTien = 0;
      return ''; // "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5])) ViTri[5] = 0;
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4])) ViTri[4] = 0;
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3])) ViTri[3] = 0;
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt((so / 1000000).toString());
    if (isNaN(ViTri[2])) ViTri[2] = 0;
    ViTri[1] = parseInt(((so % 1000000) / 1000).toString());
    if (isNaN(ViTri[1])) ViTri[1] = 0;
    ViTri[0] = parseInt((so % 1000).toString());
    if (isNaN(ViTri[0])) ViTri[0] = 0;
    if (ViTri[5] > 0) {
      lan = 5;
    } else if (ViTri[4] > 0) {
      lan = 4;
    } else if (ViTri[3] > 0) {
      lan = 3;
    } else if (ViTri[2] > 0) {
      lan = 2;
    } else if (ViTri[1] > 0) {
      lan = 1;
    } else {
      lan = 0;
    }
    for (i = lan; i >= 0; i--) {
      tmp = this._read3DigitNumbers(ViTri[i]);
      KetQua += tmp;
      if (ViTri[i] > 0) KetQua += this._unit[i];
      if (i > 0 && tmp.length > 0) KetQua += ''; // ',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) === ',') {
      KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    if (soAm) {
      return 'Âm ' + KetQua + ' đồng'; // .substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    }

    return KetQua + ' đồng'; // .substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }
}

export const countingMoneyByWords = new CountingMoneyByWords();

/**
 * Read a number as money.
 * @param {number} number - The number to be read.
 * @returns A function that takes a number and returns a string.
 */
export function readMoney(number: number | string | undefined | null) {
  if (!number) return;

  return countingMoneyByWords.read(Number(number));
}

/**
 * Divide the price by 1000 until it's less than 1, then multiply it back by 1000 and return the
 * result.
 * @param {string | number | undefined | null} price - The price to be shortened.
 * @returns A function that returns a string.
 */
export function shortVNDPrice(price: string | number | undefined | null) {
  if (!price) return '0 đồng';

  const units = ['đồng', 'nghìn', 'trăm', 'triệu', 'tỷ'];
  const step = 1e3;
  const maxStep = 10;
  let shortPrice = Number(price);

  for (let i = 0; ; i++) {
    shortPrice /= step;

    if (shortPrice < 1 || i > maxStep) {
      shortPrice *= step;

      return `${Number(shortPrice).toString()} ${units[i + 1] || units[units.length - 1]}`;
    }
  }
}
