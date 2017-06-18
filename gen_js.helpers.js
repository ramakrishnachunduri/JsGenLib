function GEBI(id)
{
    var parent = isNull(arguments[1]) ? document : arguments[1];
    return parent.getElementById(id);
}

function GEBN(elementName)
{
    var parent = isNull(arguments[1]) ? document : arguments[1];
    return parent.getElementsByName(elementName);
}

function GEBTN(tagName)
{
    var parent = isNull(arguments[1]) ? document : arguments[1];
    return parent.getElementsByTagName(tagName);
}

function GEBCN(className)
{
    var parent = isNull(arguments[1]) ? document : arguments[1];
    var retnode = [];
    className = new RegExp('\\b' + className + '\\b');
    var allels = parent.getElementsByTagName('*');
    for (i in allels)
    {
        if (className.test(allels[i].className))
        {
            retnode.push(allels[i]);
        }
    }
    return retnode;
}

function isFn(fn)
{
    if(isNull(fn) || fn==undefined)
    {
        return false;
    }
    return (typeof (fn) == 'function');
}

function isNull(fn)
{
    return (fn == null);
}

function isStr(str)
{
    return (typeof (str) == 'string');
}

function styleEl(el, stylset)
{
    for (x in stylset)
    {
        el.style[x] = stylset[x];
    }
    return el;
}

function attrib(el, ao)
{
    if (ao == 'undefined')
    {
        return;
    }
    if (isStr(ao))
    {
        var ret = el.getAttribute(ao);
        if (isNull(ret))
        {
            ret = el[ao];
        }
        return ret;
    }
    for (prop in ao)
    {
        if (prop == 'style')
        {
            styleEl(el, ao[prop]);
        }
        else
        {
            el[prop] = ao[prop];
        }
    }
    return el;
}

function REM(elem)
{
    if (!isNull(elem))
    {
        if (!isNull(elem.parentNode))
        {
            elem.parentNode.removeChild(elem);
        }
        else
        {
            attrib(elem,
            {
                display: 'none'
            });
        }
    }
}

function GEPos(theElement)
{
    var posX = 0;
    var posY = 0;
    while (theElement != null)
    {
        posX += theElement.offsetLeft;
        posY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }
    return {
        x: posX,
        y: posY
    };
}

function CE(tagName, opt)
{
    var el = document.createElement(tagName);
    attrib(el, opt);
    return el;
}

function AC(el, parent)
{
    parent.appendChild(el);
}

function CreateTable(rowcnt, colcnt, opts)
{
    var table = CE('table', opts['tableoptions']);
    var tbody = CE('tbody', opts['tbodyoptions']);
    var tdcnt = 0;
    for (i = 1; i <= rowcnt; i++)
    {
        var tr = CE('tr', opts['troptions']);
        for (j = 1; j <= colcnt; j++)
        {
            tdcnt++;
            if (isNull(opts['tdoptions']))
            {
                opts['tdoptions'] = new Object();
            }
            //tdoptions.id='td'+tdcnt;
            var td = CE('td', opts['tdoptions']);
            var tddo = opts['tddo'];
            if (!isNull(tddo))
            {
                tddo.call(td, td,
                {
                    row: i,
                    col: j
                });
            }
            AC(td, tr);
        }
        AC(tr, tbody);
    }
    AC(tbody, table);
    return table;
}

function randomColor()
{
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function getText(el)
{
    var nl = CE('div',
    {
        innerHTML: el.innerHTML
    });
    var tgs = ['style', 'script'];
    for (i = 0; i <= tgs.length - 1; i++)
    {
        var els = GEBTN(tgs[i], nl);
        for (j = 0; j <= els.length - 1; j++)
        {
            REM(els[j]);
        }
    }
    return nl.innerText || nl.textContent;
}

function GEBAT(attribs)
{
    var parent = isNull(arguments[1]) ? document : arguments[1];
    var retnode = [];
    var allels = parent.getElementsByTagName('*');
    for (i in allels)
    {
        var ad = false;
        for (prop in attribs)
        {
            ad = (allels[i][prop] == attribs[prop]);
        }
        if (ad)
        {
            retnode.push(allels[i]);
        }
    }
    return retnode;
}