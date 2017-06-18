/* RJS Prototypes */

if (!Array.prototype.forEach)
{
	Array.prototype.forEach = function(fun /*, thisp*/)
	{
		var len = this.length;
		if (typeof(fun)!= "function")
		{
			throw new TypeError();
		}
		var thisp = arguments[1];
		for (var i = 0; i < len; i++)
		{
			if (i in this)
			{
				fun.call(thisp, this[i], i, this);
			}
		}
	};
}

Array.prototype.filter= function(fnc /*, thisp*/)
{
	var len = this.length;
	if (!isFn(fnc))
		throw new TypeError();
	
	var res = new Array();
	var thisp = arguments[1];

	for (var i = 0; i < len; i++)
	{
		if (i in this)
		{
			var val = this[i]; // in case fun mutates this
			if (fnc.call(thisp, val, i, this))
				res.push(val);
		}
	}

	return res;
};

/* End Of Global Prototypes */

htmlFn=function(htmset)
{
	htmls=[];
	this.elements.forEach(function(el,htm)
	{
		if(isNull(htmset))
		{
			htmls.push(el.innerHTML);
		}
		else
		{
			if(isFn(htmset))
			{
				htmset.call(el.innerHTML);
			}
			else
			{
				el.innerHTML=htmset;
			}
		}
	});
	
	if(!isNull(htmset))
	{
	    return this;
	}
	return htmls;
};



removeFn=function()
{
	if(this.elements.length>0)
	{
		this.elements.forEach(REM);
	}
};


alertFn=function()
{
	alert(this.elements);
	return this;
};


styleFn=function(stylset)
{
	this.elements.forEach(function(el)
	{
		styleEl(el,stylset);
	});
	return this;
};


bindFn=function(propset)
{
	this.elements.forEach(function(el)
	{
		attrib(el,propset);
	});
	return this;
};


attribFn=bindFn;

showFn=function()
{
	this.elements.forEach(function(el)
	{
		styleEl(el,{display:'block'});
	});
	return this;
};


hideFn=function()
{
	this.elements.forEach(function(el)
	{
		styleEl(el,{display:'none'});
	});
	return this;
};


cloneFn=function(propset)
{
	var clonecopy=El();
	this.elements.forEach(function(el)
	{
		clonecopy.elements.push(attrib(el.cloneNode(true),propset));
	});
	return clonecopy;
};

doIndexingFn=function(prefix)
{
	var i=0;
	this.elements.forEach(function(el)
	{
		attrib(el,{index:i});
		if(!isNull(prefix))
		{
			attrib(el,{id:(""+prefix)+i});
		}
		i++;
	});
	return this;
};

RJS=Object;

function El(obj)
{
	var Els=new RJS();
	Els.html=htmlFn;
	Els.remove=removeFn;
	Els.alert=alertFn;
	Els.style=styleFn;
	Els.bind=bindFn;
	Els.attrib=attribFn;
	Els.show=showFn;
	Els.hide=hideFn;
	Els.clone=cloneFn;
	Els.doIndexing=doIndexingFn;
	Els.elements=new Array();
	Els.toString=function tostring(){return "RJS Object";};
	
	if(isNull(obj))
	{
		return Els;
	}

	if(isStr(obj))
	{
		
		
		
		if(obj.indexOf('#')>-1)
		{
			tmid=obj.replace(/#/,'');
			Els.elements.push(GEBI(tmid));
		}
		else if(obj.indexOf('.')>-1)
		{
			tmcl=obj.replace(/./,'');
			Els.elements=GEBCN(tmcl);
		}
		else
		{
			Els.elements=GEBTN(obj);
		}
	}
	else
	{
		Els.elements=GEBAT(obj);
	}
	
	return Els;
}