	/** Makes search box show prompt text when not focused */
	var scrolling = false;
	var len = 0;
	var lastLen = 0;
	var selected = -1;// -1 = no item in list/just typed text, 0 or greater is the index in the list
	var original = "";
	
	var ele = null;//document.getElementById("searchResults");

	//var pass = true;
	
function attachEvents(box,results) {
	// onfocus="togglePrompt(this, true)" onblur="togglePrompt(this, false)" 
	//	onkeydown="return selectItem(event, this);" onkeyup="return getResults(event, this, this.value);"
	
	
	// onmousedown="return doSomething(event, this.boo);" onmouseover="return onHover(event, this.boo);" onmouseout="return onUnHover(event, this.boo);" oninput="selected(event, boo, searchResults)"
	var box = document.getElementById(box);
	box.onfocus = function () {togglePrompt2(this, true)};
	box.onblur = function () {togglePrompt2(this, false)};
	
	box.onkeydown = function (e) {return selectItem(e, this)};
	box.onkeyup = function (e) {return getResults(e, this, this.value)};//shouls use onkeypress instead?
	
	ele = document.getElementById(results);
	ele.onmousedown = function (e) {return doSomething(e, box);};
	ele.onmouseover = function (e) {return onHover(e, box);};
	ele.onmouseout = function (e) {return onUnHover(e, box);};

}
	
function togglePrompt2 (box, focus) {
	//if (pass) {
		ele.style.display = "none";
		//(focus?"block":"none");
		//pass = true;
	//}
    if (box.value != box.defaultValue && box.value != "") {
		return;
	}
    box.value = (focus?"":box.defaultValue);
    if (focus) {
		box.style.cssText = "font-style: normal;color: black;";
	}else {
		box.style.cssText = "font-style: italic;color: grey;";
	}
}

//click
function doSomething(e, box) {
    if (e.target !== e.currentTarget) {
		box.style.cssText = "font-style: normal;color: black;";

		//pass = false;
		//alert(e.target.innerHTML);
        box.value = e.target.innerHTML;	
        
		ele.style.display = "none"; 
		box.focus();
		box.setSelectionRange(box.value.length,box.value.length);

		return false;

    }
    e.stopPropagation();
}

function findRow3(node)
{
    var i = 0;
    while (node = node.previousSibling) {
        if (node.nodeType === 1) { ++i }
    }
    return i;
}

function onHover(e, box) {
	if (e.target !== e.currentTarget) {
        e.target.className += " autoListItemHover";
        scroll(e, box, findRow3(e.target));
    }
}
function onUnHover(e, box) {
	if (e.target !== e.currentTarget) {
        e.target.className = "autoListItem";//TODO: remove
    }
}

function scroll(e, box, index) {
	scrolling = true;
	if (selected >= 0) {
		var item = ele.children[selected];
		item.className = "autoListItem";
		ele.children[selected] = item;
	}
	selected = index;
	//scrolling up from typed text into autocomplete
	if (selected < -1 ) {
		selected = ele.children.length-1;
	}
	if (selected < 0 || selected >= (ele.children.length)) {
		selected = -1;
		box.value = original;
		box.setSelectionRange(len,box.value.length);
		return false;
	}
	
	var item = ele.children[selected];//
	item.className += " autoListItemHover";
	ele.children[selected] = item;
	e.stopPropagation();
	box.value = item.innerHTML;
	box.setSelectionRange(len,box.value.length);
}

//keydown
function selectItem(e, box) {
	var key = e.which || e.keyCode;
	if (key == 38) {//up
		scroll(e, box, selected -1);
		return false;
	} else if (key == 40) {  //down
		scroll(e, box, selected +1);
		return false;
	}	
}

//keyup
function getResults(e, box, typed) {	
	
	if (e.ctrlKey==1 || e.keyCode == 17) {//ctrl was down?
		return;
	}
	lastLen = len;
	if (typed.length == lastLen) {
		return;
	}
	
	ele.style.display = "block";
	if (scrolling) {
		scrolling = false;
		return false;
	}
	selected =-1;
	original = typed;
	
	len = typed.length;

	var xmlhttp;
	if (typed.length==0) { 
		while (ele.firstChild) {
			ele.removeChild(ele.firstChild);
		}
		ele.style.display = "none"; 
		//alert("yo");
		// document.getElementById("searchResults").size=0;
		return;
	}
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	 }
	else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()  {
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var strings = xmlhttp.responseText.split(";");
			var out = "";
			if (strings.length <= 1) {
				return;
			}
			while (ele.firstChild) {
				ele.removeChild(ele.firstChild);
			}
			for (var index = 0; index < (strings.length-1); index++) {
				//out += "   <div class=\"searchRes\" value="+index+">"+strings[index]+"</div>\n";
				var div=document.createElement("div");
				div.className = "autoListItem";
				div.textContent = strings[index];
				ele.appendChild(div);
			}
			//document.getElementById("searchResults").innerHTML=out;//xmlhttp.responseText.split("\n");
			//document.getElementById("searchResults").size=6;
			//	var e = evt || event;
			var key = e.which || e.keyCode;

			if (key == 8) {//backspace
				//box.setSelectionRange(len,box.value.length);

				//box.value = typed.substring(0,typed.length-1);
				return;
			}
			 
			box.value += strings[0].substring(typed.length,strings[0].length);
			box.setSelectionRange(typed.length,strings[0].length);
			//len = typed.length;

		}
	}
	xmlhttp.open("GET","tsresults.php?typed="+typed,true);
	xmlhttp.send();
}
