const initStore = () => {
	const mailRe =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const data = {
		q1: null,
		q2: [],
		q3: [],
		q4: {
			name: '',
			surname: '',
			email: ''
		}
	};
	const store ={
		updateData: function(item, key, callback, subkey) {
			if (Array.isArray(data[key])) {
				toggleValue(item.dataset.value, data, key);
				setLocalStorage(key, data[key]);
			} else if (typeof data[key] === 'object' && data[key] !== null) {
				if (subkey === 'email') {
					if (mailRe.test(item.value)) {
						data[key][subkey] = item.value;
						setLocalStorage(subkey, item.value);
					} else {
						data[key][subkey] = '';
						setLocalStorage(subkey, '');
					}
				} else {
					data[key][subkey] = item.value;
					setLocalStorage(subkey, item.value);
				}
			}
			 else {
				data[key] = item.dataset.value;
				setLocalStorage(key, data[key]);
			}
			return callback(item, getCopy(data), key);
		},

		updateProgress: function(callback) {
			let progressValue = 0;

			if (getLocalStorage('q1')) {
				progressValue++;
			}

			if (getLocalStorage('q2')) {
				if (getLocalStorage('q2').length) {
					progressValue++;
				}
			}

			if (getLocalStorage('q3')) {
				if (getLocalStorage('q3').length) {
					progressValue++;
				}
			}

			if (getLocalStorage('name')) {
				progressValue++;
			}

			if (getLocalStorage('surname')) {
				progressValue++;
			}

			if (getLocalStorage('email')) {
				progressValue++;
			}

			return callback(progressValue);
		},

		getData: function(key) {
			return getLocalStorage(key);
		}
	};

	window.store = store;

	function setLocalStorage(key, value) {
		localStorage.setItem(`${key}`, value);
	}

	function getLocalStorage(key) {
		return localStorage.getItem(key);
	}

	function getCopy(x) {
		return JSON.parse(JSON.stringify(x));
	}

	function toggleValue(value, data, key) {
		const index = data[key].indexOf(value);

		if (index === -1) {
			data[key].push(value);
		} else {
			data[key].splice(index, 1);
		}
	}
};

export default initStore;