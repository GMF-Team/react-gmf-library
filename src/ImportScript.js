function ImportScript(url, id) {
	const existingScript = document.getElementById(id);

	if (existingScript) {
		existingScript.remove();
	}

	const script = document.createElement('script');
	script.src = url;
	script.id = id;
	document.body.appendChild(script);
}

export { ImportScript };
