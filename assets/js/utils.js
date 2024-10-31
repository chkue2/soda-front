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
		.replace(/[^0-9]/g, '') // 숫자만 남기기
		.replace(/^02(\d{3,4})(\d{4})$/, '02-$1-$2') // 02인 경우
		.replace(/^070(\d{3,4})(\d{4})$/, '070-$1-$2') // 070인 경우
		.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3') // 3자리 지역번호인 경우
		.replace(/^(\d{2})(\d{3,4})(\d{4})$/, '$1-$2-$3'); // 2자리 지역번호인 경우
};

/**
 * 비밀번호 validation
 * 영문, 숫자, 특수문자를 조합한 8자리 이상.
 */
const isValidPassword = password => {
	const regex =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[A-Za-z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}$/;

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

/**
 * file 객체를 리사이징 해서 return
 *
 * @param {File} file
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @param {number} quality
 * @param {function} callback
 */
const resizeImage = (file, maxWidth, maxHeight, quality, callback) => {
	const reader = new FileReader();

	reader.onload = function (e) {
		const img = new Image();
		img.src = e.target.result;

		img.onload = function () {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			let width = img.width;
			let height = img.height;

			if (width > maxWidth) {
				height *= maxWidth / width;
				width = maxWidth;
			}
			if (height > maxHeight) {
				width *= maxHeight / height;
				height = maxHeight;
			}

			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0, width, height);

			canvas.toBlob(
				function (blob) {
					const resizedFile = new File([blob], file.name, {
						type: file.type,
						lastModified: Date.now(),
					});
					callback(resizedFile);
				},
				file.type,
				quality,
			);
		};
	};

	reader.readAsDataURL(file);
};

export {
	convertToKoreanCurrency,
	fileDownload,
	isValidId,
	isValidPassword,
	keyupToLocaleString,
	resizeImage,
	rexFormatPhone,
};
