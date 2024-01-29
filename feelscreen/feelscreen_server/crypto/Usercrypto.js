const crypto = require('crypto');
require('dotenv').config();

// 암호화 AES256
function AES_encrypt(data) {
	const iv = Buffer.alloc(16, 0); // 16비트
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		Buffer.from(process.env.SALT),
		iv
	);
	let encryptedText = cipher.update(data, 'utf8', 'base64');
	encryptedText += cipher.final('base64');
	return encryptedText;
}

// 복호화 AES256
function AES_decrypt(data) {
	const iv = Buffer.alloc(16, 0); // 16비트
	const decipher = crypto.createDecipheriv(
		'aes-256-cbc',
		Buffer.from(process.env.SALT),
		iv
	);
	let decryptedText = decipher.update(data, 'base64', 'utf8');
	decryptedText += decipher.final('utf8');
	return decryptedText;
}

function hash(password) {
	const salt = crypto.randomBytes(32).toString('hex');
	const hashedPassword = crypto
		.pbkdf2Sync(password, salt, 1, 32, 'sha512')
		.toString('hex');

	return {
		passwordSalt: salt,
		passwordEn: hashedPassword,
	};
}

module.exports = { hash, AES_encrypt, AES_decrypt };
