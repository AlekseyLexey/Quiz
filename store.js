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
			} else if (typeof data[key] === 'object' && data[key] !== null) {
				if (subkey === 'email') {
					if (mailRe.test(item.value)) {
						data[key][subkey] = item.value;
					} else {
						data[key][subkey] = '';
					}
				} else {
					data[key][subkey] = item.value;
				}
			}
			 else {
				data[key] = item.dataset.value;
			}
			return callback(item, getCopy(data), key);
		},

		updateProgress: function(callback) {
			let progressValue = 0;

			if (data.q1) {
				progressValue++;
			}

			if (data.q2.length) {
				progressValue++;
			}

			if (data.q3.length) {
				progressValue++;
			}

			if (data.q4.name) {
				progressValue++;
			}

			if (data.q4.surname) {
				progressValue++;
			}

			if (data.q4.email) {
				progressValue++;
			}

			return callback(progressValue);
		},

		getData: function() {
			return getCopy(data);
		}
	};

	window.store = store;

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