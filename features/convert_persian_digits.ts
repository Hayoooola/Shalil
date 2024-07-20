const handleConvertPersianDigits = (text) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let englishText = text;

    persianDigits.forEach((digit, index) => {
        const regex = new RegExp(digit, 'g');
        englishText = englishText.replace(regex, englishDigits[index]);
    });

    return englishText;
};

export default handleConvertPersianDigits;
