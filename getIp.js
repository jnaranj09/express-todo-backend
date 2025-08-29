const getPublicIp = async () => {
	const resp = await fetch("https://ifconfig.io/ip");
	const ipAddress = await resp.text();
	return ipAddress.trim();
};

export default getPublicIp;
