
class Request{
	constructor(){
		this.r = fetch;
	}

	get(path){
		return fetch(path).then(response => response.json());
	}

	put(path, obj){
		return this.r(path, {
	      method: 'PUT',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(obj)
	    });
	}

	post(path, obj){
		return this.r(path, {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(obj)
	    });
	}
};

module.exports = Request;