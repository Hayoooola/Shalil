const handleConvertToNumber = (val: string) => parseFloat(val.replace(/,/g, ''));

export default handleConvertToNumber;