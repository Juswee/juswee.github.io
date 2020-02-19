// Parsing CSV to JS arr
let data, obj = [], count = 0, cost = 0, number = 0, numeric = 0;

async function Parse() {
	Papa.parse("assets/data/sweets.csv", {
		header: true,
		download: true,
		dynamicTyping: true,
		complete: function(results) {
			data = results.data;
		}
	});
}

async function Output() {
	let parsy = false;
	while (!parsy) {
		parsy = true;
		await Timer(300);
		if (data === undefined) {
			parsy = false;
		}
	}
	
	// Output to content
	var index = document.querySelector("div.content__inner");
	
	for (var i in data[0]) 
		obj.push(i);

	while (count < data.length-1) {
		let item  = document.createElement("div");
		let img  = document.createElement("img");
		let head = document.createElement("div");
		let text = document.createElement("div");
		let sup = document.createElement("div");
		
		item.className = "content__item";
		img.className = "content__img";
		head.className = "content__head";
		text.className = "content__text";
		sup.className = "content__sub";

		let value = document.createElement("div");
		let button1 = document.createElement("input");
		let button2 = document.createElement("input");
		let button3 = document.createElement("input");
		let price = document.createElement("div");
		
		button2.pattern = "[0-9]*";
		
		button1.type = "button";
		button2.type = "text";
		button3.type = "button";
		
		
		button1.value = "-";
		button2.value = "0";
		button3.value = "+";
		
		value.className = "content__sub__btn";
		button1.className = "content__sub__btn__text butt";
		button2.className = "content__sub__btn__text inp";
		button3.className = "content__sub__btn__text butt";
		price.className = "content__sub__btn__text price";
		
		item.textContent = " ";
		//img.src = "assets/images/" + data[count][obj[0]];
		img.src = "assets/images/temp";
		head.textContent = data[count][obj[0]];
		text.textContent = obj[1] + ": " + data[count][obj[1]] + "\n" + obj[2] + ": " + data[count][obj[2]] + "\n" + obj[3] + ": " + data[count][obj[3]];
		price.textContent = obj[4] + ": " + data[count][obj[4]];
			
		value.append(button1);
		value.append(button2);
		value.append(button3);
		value.append(price);
		sup.append(value);
		
		item.append(img);
		item.append(head);
		item.append(text);
		item.append(sup);
		index.append(item);
		count++;
	}
	
	let scale_obj = document.getElementsByClassName("content__text");
	let heig = 0;
	
	for (var si = 0; si < data.length-1; si++) {
		if (heig < scale_obj[si].clientHeight) {
			heig = scale_obj[si].clientHeight;
		}
	}
	for (var si = 0; si < data.length-1; si++) {
		if (si < data.length-1) {
			while (scale_obj[si].clientHeight < heig) {
				scale_obj[si].lastChild.textContent += "    ";
			}		
		}
	}
}

async function EventListener() {
	await Timer(500);
	var elem = document.querySelectorAll("input.content__sub__btn__text");
	for (var p of elem) {
		if (p.type == "button") {
    		p.addEventListener("click", function(){
				let sweet_name = this.parentElement.parentElement.parentElement.childNodes[2];
				let sweet_count = this.parentElement.childNodes[1];
				
      			if (this.value == "+") {
					sweet_count.value = Number(sweet_count.value) + 1;
					if (document.getElementsByClassName(sweet_name.textContent).length == 0) {
						let list = document.createElement('p');
						
						list.className = sweet_name.textContent;
						list.textContent = "1x " + sweet_name.textContent;
						
						document.getElementsByClassName("order__item__text")[0].append(list);
					} else {
						document.getElementsByClassName(sweet_name.textContent)[0].textContent =  + Number(sweet_count.value) + "x " + sweet_name.textContent;
					}
					let sweets = document.getElementById("sweets");
					
					cost += Number(this.parentElement.childNodes[3].textContent.slice(6, -1));
					sweets.textContent = "Заказ: " + cost + "р";
					
      			} else if (sweet_count.value != 0) {
					this.parentElement.childNodes[1].value = Number(sweet_count.value) - 1;
      				if (sweet_count.value == 0) {
						document.getElementsByClassName(sweet_name.textContent)[0].remove();
					} else {
						document.getElementsByClassName(sweet_name.textContent)[0].textContent =  + Number(sweet_count.value) + "x " + sweet_name.textContent;
					}
					
					let sweets = document.getElementById("sweets");
					
					cost -= Number(this.parentElement.childNodes[3].textContent.slice(6, -1));
					sweets.textContent = "Заказ: " + cost + "р";
				}
    		})
  		} else {
			let sweets = document.getElementById("sweets");
			p.addEventListener("click", function() {
				number = this.value; 
			})
			p.addEventListener("change", function() {
				let sweet_name = this.parentElement.parentElement.parentElement.childNodes[2];
				let sweet_count = this.parentElement.childNodes[1];
				
				if (Number(this.value) <= 0) {
					this.value = 0;
				}
				
				numeric = this.value;
				cost += (Number(this.parentElement.childNodes[3].textContent.slice(6, -1))) * (numeric - number);
				sweets.textContent = "Заказ: " + cost + "р";
				
				if (document.getElementsByClassName(sweet_name.textContent).length == 0) {
					let list = document.createElement('p');
						
					list.className = sweet_name.textContent;
					list.textContent = numeric + "x " + sweet_name.textContent;
					document.getElementsByClassName("order__item__text")[0].append(list);
				} else {
					document.getElementsByClassName(sweet_name.textContent)[0].textContent = numeric + "x " + sweet_name.textContent;
				}
				if (numeric == 0) {
					document.getElementsByClassName(sweet_name.textContent)[0].remove();
				}
			})
		}
	}
	
	document.querySelector("div.bg").addEventListener("click", function() {
		document.querySelector("form").hidden = true;
		Cleaner();
	});
}

async function CompleteOrder() {
	var order_list = document.querySelector("div.order__item__text").children;
	
	for (var oi of order_list) {
		console.log(oi.textContent);
	}
	
	console.log(order_list);
}

async function Submit() {
	Cleaner();
	document.querySelector("form").hidden = false;
	//let list = document.querySelector("div.order__item__text");
	//document.querySelector("div.form__item2").append(list);
}

async function Cleaner() {
	let cleaner = document.querySelectorAll("input.text");
	for (var fi of cleaner) {
		fi.value = "";
	}
}

function Timer(ms) {
	return new Promise(res => setTimeout(res, ms));
}