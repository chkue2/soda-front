const keyupToLocaleString = str => {
	const num = String(str).replace(/[^0-9]/gi, '');
	return num === '' ? '' : parseInt(num).toLocaleString();
};

const convertToKoreanCurrency = num => {
	if (num == '0' || num === '') return '영';
	const number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
	const unit = ['', '만', '억', '조'];
	const smallUnit = ['천', '백', '십', ''];

	let result = []; //변환된 값을 저장할 배열

	var unitCnt = Math.ceil(num.length / 4); //단위 갯수. 숫자 10000은 일단위와 만단위 2개이다.
	num = num.padStart(unitCnt * 4, '0'); //4자리 값이 되도록 0을 채운다

	const regexp = /[\w\W]{4}/g; //4자리 단위로 숫자 분리
	const array = num.match(regexp); //낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)

	for (let i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
		const hanValue = _makeHan(array[i]); //한글로 변환된 숫자
		if (hanValue == '')
			//값이 없을땐 해당 단위의 값이 모두 0이란 뜻.
			continue;

		result.unshift(hanValue + unit[unitCnt]); //unshift는 항상 배열의 앞에 넣는다.
	}

	function _makeHan(text) {
		let str = '';
		for (let i = 0; i < text.length; i++) {
			const num = text[i];
			if (num == '0')
				//0은 읽지 않는다
				continue;
			str += number[num] + smallUnit[i];
		}
		return str;
	}
	return result.join('');
};

/**
 * 숫자로만 된 전화번호를 -를 포함한 전화번호로 변경
 *
 * @param {string} text
 * @returns
 */
const rexFormatPhone = text => {
	return (text || '')
		?.replace(/[^0-9]/g, '')
		?.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
};

/**
 * 비밀번호 validation
 * 영문, 숫자, 특수문자를 조합한 8자리 이상.
 */
const isValidPassword = password => {
	const regex =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

	return regex.test(password);
};

/**
 * 아이디 validation
 * 영문이나 숫자 5자리 이상.
 */
const isValidId = id => {
	const regex = /^[A-Za-z0-9]{5,}$/;

	return regex.test(id);
};

/**
 * blob data를 활용해 file download
 * 파일명은 fileName.ext
 *
 * @param {blob} data
 * @param {string} fileName
 * @param {string} ext
 */
const fileDownload = (data, fileName, ext) => {
	const url = window.URL.createObjectURL(new Blob([data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${fileName}.${ext}`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export {
	keyupToLocaleString,
	convertToKoreanCurrency,
	rexFormatPhone,
	isValidPassword,
	isValidId,
	fileDownload,
};
