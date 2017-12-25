//--数据显示自适应滚动条--
var DataCellObj;
var oGridBody;
var ColumnDefalutWidth = 120;
var tableheadObj; 
var TableBodyObj;

function ShowTableScroll(maxHeight)
{
    if (maxHeight == null) maxHeight = 50;
    
    var Winw;
    var Winh;
    var clientWidth;
    var clientHeight;
    clientWidth = document.body.clientWidth;
    clientHeight = parseInt(document.body.clientHeight);
    Winw = clientWidth;
    Winw = Winw - 35;
     
    if (clientHeight < 300)
        Winh = 100;
    else 
        Winh = clientHeight-maxHeight;
     
    if (Winw < 200) Winw = 200;
    if (Winh < 100) Winh = 100;

    var WinFW;
    if (document.getElementById("Table4")) {
        WinFW = (parseInt(document.getElementById("Table4").offsetWidth) * 0.99).toFixed(0) - 17;
    } else {
        WinFW = Winw;
    }
    var obj = document.getElementById("order_Container");
    if (obj != null)
    {
        obj.style.width = WinFW + 10;
        obj.style.height = Winh + 40;
    }
    
    var obj2 = document.getElementById("order_GridBody");
    if (obj2 != null)
    {
        obj2.style.width = WinFW;
        obj2.style.height = Winh + 15;
    }
    
    tableheadObj = document.getElementById("order_Gridhead");
    if (tableheadObj != null)
    {
        tableheadObj.style.width = WinFW - 17;
    }
    
    var obj3 = document.getElementById("reloadshow1");
    if (obj3 !=null )
    {
        obj3.style.width  = Winw + 3;
        obj3.style.height = Winh + 90;
    }
    
    //获取数据单元对象
    DataCellObj = document.getElementById("order_GridBody_Cells");
    oGridBody = obj2;
}

//插入数据表中的 <div class='gridCell_standard'>
function InsertIntoDataTableStandardDiv(tab)
{
    if (tab == null) return;
    var iMax = 0;
    var jMax = 0;
    
    jMax = tab.rows.length;
    if (jMax == 0) return;
    var obj1;
    var Temname;

    iMax = tab.rows[0].cells.length;
    for(var i=0;i < iMax;i++)
    {
  	    for(var j = 0;j < jMax;j++)
        {
	        obj1 = tab.rows[j].cells[i];
	        if (obj1.childNodes[0] != null)
	        {
	            Temname = obj1.childNodes[0].className;
	            if (Temname != "gridCell_standard")
	            {
	               obj1.innerHTML ="<div class=gridCell_standard nowrap>" + obj1.innerHTML + "</div>";
	            }
	        }   
	    }
	}
}

//记住表头的宽度
function TableColumnSave(name,width) {
    fGetMemfocus(name, width);
}

//读取表头的宽度
function TableColumnRead(name) {
    var width;
    var i, j;
    try {
        if (typeof (memdata) != "undefined" && memdata != null) {
            for (i = 0; i < memdata.length; i++) {
                if (memdata[i][0] == name) {
                    width = memdata[i][1];
                    break;
                }
            }
        }
    }
    catch (e) {
    }
    if (width == null)
        return ColumnDefalutWidth;
    else
        return width;
}

//读本表所有列原有宽度
function ReadTableAllColumnWidth(tableID)
{
    var objTable = document.getElementById(tableID);
    if (objTable == null) return;
    var objDiv;
    var width;

    var cMax = objTable.rows[0].cells.length;
    //var resetPattern = /style=[^\s\t\n]+/;
    var resetPattern = /style=\s*[""]\s*\w*\s*\:\s*\w*\s*[""]/;
    for (var j = 0; j < cMax; j++) {
        objDiv = objTable.rows[0].cells[j].children[0];
        //获取div控件名
        if ((objDiv != null) && (objDiv.id.indexOf(tableID + "_Column_") > -1)) {
            width = TableColumnRead(objDiv.id);
            if (window.ActiveXObject) {
                if (navigator.userAgent.toLowerCase().indexOf("msie") != -1 && navigator.userAgent.toLowerCase().indexOf("trident/7.0") != -1) {
                    objDiv.style.width = width;
                }
                else {
                    objDiv.outerHTML = objDiv.outerHTML.replace(resetPattern, "style='width:" + width + "'");
                }
            } else {
                objDiv.style.width = width;
            }
            try {
                if (!window.ActiveXObject) {
                    //处理可能出现的操作列
                    var TempClass = objDiv.getAttribute("class").toString();
                    if (TempClass == "gridCell_narrow") {
                        width = parseInt(width) - 3 + "px";
                    }
                    AddDivAndBodyWidth(j, width);
                }
                else {
                    AddDivAndBodyWidth(objDiv.columnIndex, width);
                }
            }
            catch (e) {
                try {
                    AddDivAndBodyWidth(j, width);
                }
                catch (e) {
                }
            }
        }
    }
}

//每个单元加div标签且同步宽度
function AddDivAndBodyWidth(idx, width)
{
	//此对象由ajax返回后获取！
    if (DataCellObj == null) return;
    var rows = DataCellObj.childNodes;
    var iMax = rows.length;
    var mhead = "<div class='gridCell_standard' nowrap style='width:" + width + "'>";
    var cell;
    var mcurid;
    
    for (var i = 0; i < iMax; i++) {
        try {
            if (!window.ActiveXObject) {
                //处理详细视图追加行
                if (rows[i].id != "hj") {
                    cell = rows[i].childNodes[idx + 1];
                } else {
                    cell = rows[i].childNodes[idx];
                }
            } else {
                cell = rows[i].childNodes[idx];
            }
            cell.innerHTML = mhead + cell.innerHTML + "</div>";
        }
        catch (e) {
        }    
    }
}

//表头宽度同步到列
function TableTopToBodyWidth(idx, width)
{
    var cells = DataCellObj;
	if (cells == null) return;
	var rows = cells.childNodes;
	var cell;
	var resetPattern = /style=[^\s\t\n]+/;
	var iMax = rows.length;
    //IE及非IE浏览器分支
	if (window.ActiveXObject) {
	   
	    for (var i = 0; i < iMax; i++) {
	        cell = rows[i].childNodes[idx].childNodes[0];
	        cell.outerHTML = cell.outerHTML.toString().replace(resetPattern, "style='width:" + width + "'");
	    }
	} else {
	    for (var i = 0; i < iMax; i++) {
            //过滤非IE浏览器下的空TEXT
	        if (rows[i].childNodes[idx] != undefined) {
                //处理详细视图的追加行
	            if (rows[i].id != "hj") {
	                cell = rows[i].childNodes[idx + 1].childNodes[0];
	            } else {
	                cell = rows[i].childNodes[idx].childNodes[0];
	            }
                //处理可能出现的操作列
	            var TempClass = currentResizeTdObj.getAttribute("class").toString();
	            if (TempClass == "gridCell_narrow") {
	                cell.style.width = parseInt(width) - 3 + "px";
	            } else {
	                cell.style.width = width;
	            }
	        }
	    }
	}
}
//onscroll body to head
function onscrollBodyTohead() {
    tableheadObj.scrollLeft = oGridBody.scrollLeft;
}
//显示列表数据
function Call_J_DataShow(response){
    objreloadshow.style.display="none";
    var ReHtml = response.value;
    var listHtml = "";
    listHtml +=ReHtml[0];
    listHtml +=ReHtml[1];
    listHtml +=ReHtml[2];
    document.getElementById('showList_notifyBox').innerHTML = listHtml;
    fGetAllMemo(ReHtml[6]);
    if (TableShowStyle==1) {
        ReShowSize();
        initTabTools("SL_tableBody",0,0,0);
        ReadTableAllColumnWidth("browser_"+objViewList.options[objViewList.selectedIndex].value.split("_")[0]);
    }
    else
        initTabTools("SL_tableBody",1,0,0);
    document.getElementById('showSelectedCount').innerHTML = crmnew_vb30+"0"+crmnew_script18;
    document.getElementById("printdiv").innerHTML = ReHtml[3];
    mGClickUrlStr = ReHtml[4];
    mGEditUrlStr = ReHtml[5];

    mClearFloat();
}

//选择统计
function Rowselectedcount()
{
    var seleCount = 0;
    var ListID = "";
    var mframe=Form1.elements;
    var jmax = mframe.length;
    var temObj;
    
    for (var j=0;j<jmax;j++)
    {
        temObj = mframe[j];
        if ((temObj.type=="checkbox") && (temObj.name=="chkIS") && (temObj.disabled==false) && (temObj.checked==true))
        {
            ListID += temObj.value +",";
            temObj.parentNode.parentNode.parentNode.style.backgroundColor="#bbffff";
        }else
        {
             if (temObj.parentNode.parentNode.parentNode.style.backgroundColor=="#bbffff")
                if (j % 2==1)
                    temObj.parentNode.parentNode.parentNode.style.backgroundColor="#eeeeee";
                else
                    temObj.parentNode.parentNode.parentNode.style.backgroundColor="#ffffff";
            currentcolor = "";
        }
    }   
    
    if (ListID.lastIndexOf(',') == ListID.length-1) 
        ListID = ListID.substring(0,ListID.length-1);
    if (ListID!="")
        seleCount = ListID.length - ListID.replace(/\,/g,"").length+1;
    else
        seleCount = 0;
    //alert(seleCount);
    //seleCount=formatMoney(seleCount, 1);
    document.getElementById('showSelectedCount').innerHTML = crmnew_vb30+"<font color=#0000ff>"+seleCount+"</font>"+crmnew_script18;
}

function initTabTools(tabid,top,bottom,displayTongJi)
{
    //alert(document.getElementById(tabid));
    
    var tab = document.getElementById(tabid);
    if (tab == null) return false;
    //if(tab.getAttribute("dealed")=="1")return;
    var rowslength = tab.rows.length;
    var cols = rowslength-top-bottom;
    tab.title = crmnew_script17 + cols + crmnew_script18;
    var hj=tab.insertRow(rowslength);
    var c = 0;
    var DotNum = 0;
    var NaviType = navigator.userAgent.toLowerCase().indexOf("msie");
    
    var td;
    var count;
    var isnum;
    
    var txt;
    var iMax;
    var jMax;


    iMax = tab.rows[0].cells.length;
    jMax = rowslength - bottom;
    
    for(var i = 0;i < iMax;i++)
    {
         
       
         if (tab.rows[top].cells[i].align != "right")
        {
            td=hj.insertCell(-1);
            continue;
        }
        
        count = 0;
        isnum = false;
        DotNum = 0;
        
        for(var j = top;j < jMax;j++)
        {
           txt = "";
           if(NaviType!=-1)
            txt = tab.rows[j].cells[i].innerText;
           else
           //txt = getinnerText(tab.rows[j].cells[i]);
               txt = tab.rows[j].cells[i].innerHTML;
           
            txt = txt.replace(/\,/g,"");
            
            if (txt!="")
            {
                c = parseFloat(txt);
                count += c;
                isnum = true;
                if (txt.indexOf(".")==-1)
                    DotNum = 0;
                else
                    DotNum = txt.length-txt.indexOf(".")-1;
            }
        }
        
        td = hj.insertCell(-1)
        td.style.textAlign = "right";
        
        if(! isNaN(count) && isnum == true)
        {
            var mcount = count.toFixed(DotNum);  //adv_format(count, DotNum);
            var mzs = Math.floor(mcount);
            var mxs;
            count = formatMoney(mzs);
            var mtotal;
            if (DotNum > 0) {
                mxs = mcount.replace(mzs.toString() + ".", "");
                mtotal = count.toString() + "." + mxs.toString();
            }
            else {
                mtotal = count;
            }
            td.innerHTML = crmnew_script20 + ":" + mtotal;
            td.noWrap = true;
        }
    }            
    hj.style.backgroundColor="#dddddd";
    hj.id = "hj"
    hj.className = tab.rows[0].className;
}
        

function getinnerText(e)
{
    return e.textContent();
}
        
function getstr(s)
{
    var isDotNum=/(\d+)(\.\d+)/.test(s);
    var s1=isDotNum ? RegExp.$1 : s;
    var s2=isDotNum ? RegExp.$2 : "";
    s1=s1.split("").reverse().join("").replace(/(\d{3})/g,"$1,").split("").reverse().join("").replace(/^,/,"");
    return s1+s2;
}

//小数点格式化
function adv_format(value,num)   //四舍五入
{
    var a_str = formatnumber(value,num);
    var a_int = parseFloat(a_str);

    if (value.toString().length>a_str.length)
    {
        var b_str = value.toString().substring(a_str.length,a_str.length+1)
        var b_int = parseFloat(b_str);
        if (b_int<5)
        {
            return a_str
        }
        else
        {
            var bonus_str,bonus_int;
            if (num==0)
            {
                bonus_int = 1;
            }
            else
            {
                bonus_str = "0."
                for (var i=1; i<num; i++)
                    bonus_str+="0";
                bonus_str+="1";
                bonus_int = parseFloat(bonus_str);
            }
            a_str = formatnumber(a_int + bonus_int, num)
        }
    }
   return a_str
}
    
function formatnumber(value,num) //直接去尾
{
    var a,b,c,i
    a = value.toString();
    b = a.indexOf('.');
    c = a.length;
    if (num==0)
    {
        if (b!=-1)
            a = a.substring(0,b);
    }
    else
    {
        if (b==-1)
        {
            a = a + ".";
            for (i=1;i<=num;i++)
            a = a + "0";
        }
        else
        {
            a = a.substring(0,b+num+1);
            for (i=c;i<=b+num;i++)
            a = a + "0";
        }
    }
    return a
}

//////////----start browser.ascx////////////////



 function showSelectDiv()
 {
    var selectDownobj = document.getElementById("selectDown1");
    selectDownobj.style.visibility='visible';
 }
 
 function HiddenSelecDiv()
 { 
    var selectDownobj = document.getElementById("selectDown1");
    selectDownobj.style.visibility="hidden";
 }
 
 function checkSeleAll()
 {
    mselectall(true);
    document.getElementById("allselecheckbox1").checked=true;
 }
 
  function checkSeleNoAll()
 {
    mselectall(false);
    document.getElementById("allselecheckbox1").checked=false;
 }
 
 function checkSeleReverse()
 {
    document.getElementById("allselecheckbox1").checked=false;
    var mframe=document.getElementById("Form1").elements;
    for (var j=0;j<mframe.length;j++)
    if ((mframe[j].type=="checkbox") && (mframe[j].name=="chkIS") && (mframe[j].disabled==false))
    mframe[j].checked=!mframe[j].checked;
    //统计选中的数量
    Rowselectedcount();
 }
//改变表格展示形式
 function changeTablestyle()
 {
    var date = new Date();
  
    date.setYear(date.getYear()+1);
//    if (!ispad) {
        if (TableShowStyle == 1) {
            TableShowStyle = 0;
        } else {
            TableShowStyle = 1;
        }
//    }
//    else
//        TableShowStyle = 0;
    
    setCookie("Brower_tablestyle", TableShowStyle,date,"/");
    ButtonViewSearch();
 }
 //读取表头的宽度
function ReadTablestyle()
{
    TableShowStyle = getCookie("Brower_tablestyle");
//    if (!ispad) {
        if (TableShowStyle == null)
            TableShowStyle = 1;
//    }
//    else
//        TableShowStyle = 0;
    return TableShowStyle;
}

//弹出筛选器


 
//改变页数
function PageChange(topage,mIsLink)
{
    try
   {
   topage = parseInt(topage)
   } catch(err)
   {
       alert(crmnew_vb19);
       return ;
   }
   curpage = topage

   this.ShowChange(objViewList.options[objViewList.selectedIndex].value, mIsLink);
     
}

//改变排序
function orderbySpeed() {
    var mobj = document.getElementById("Crm_Control_Speed_Sort");
    sort = mobj.options[mobj.selectedIndex].value+" desc";
    PageChange(1, 0);
}

//改变排序
function orderbyRead(sortstr)
{
    sort = sortstr;
    PageChange(1,0);
}



//视图改变时读取数据
 function ViewListSeleChange()
 {
     curpage = 1;
    document.getElementById("KeywordInView").value = '';
    ButtonViewSearch();//读取数据改变
    window.focus();
 }
 
//显示视图内搜索列
function Call_J_ShowFieldList(response){
    var seleValue=new Array();  
    var TextValue=new Array();
     
    seleValue=response.value.split(',');   
    fieldlistObj.length=1;
    var iMax = seleValue.length;   
    for (i=0;i<iMax;i++)
    {   
        TextValue = seleValue[i].split('~')
        var oOption = document.createElement("OPTION");
        oOption.text=TextValue[0];
        oOption.value=TextValue[1];
        if (TextValue[1]==TextValue[2]) oOption.selected = true;
        fieldlistObj.add(oOption);
    }
}

//显示试图编辑
function Call_J_CreateViewEdit(response){
	showviewObj.innerHTML = response.value;
}

//删除等操作后调用显示
function showList_load()
{  
    PageChange(curpage,3);
}
 
//在视图中搜索按钮
function ButtonInViewsearch(but1)
{
    IsInViewsearch = 1;
    PageChange(1,0);
}



window.onresize = ReShowSize;
function ReShowSize()
{ 
    ShowTableScroll(182);
}      
		 
//---------以下是其他操作-------------------------------------------


//选中全部
function mselectall(dd)
{
    var mframe=Form1.elements;
    for (var j=0;j<mframe.length;j++)
    if ((mframe[j].type=="checkbox") && (mframe[j].name=="chkIS") && (mframe[j].disabled==false))
    mframe[j].checked=dd;
    //统计选中的数量
    Rowselectedcount();
}

//获取选中的ID
function GetSeletedID()
{
    checkSelect();
    var ListID = "";
    var mframe=Form1.elements;
    for (var j=0;j<mframe.length;j++)
        if ((mframe[j].type=="checkbox") && (mframe[j].name=="chkIS") && (mframe[j].disabled==false) && (mframe[j].checked==true))
            ListID += mframe[j].value +",";
    if (ListID.lastIndexOf(',') == ListID.length-1) 
        ListID = ListID.substring(0,ListID.length-1);
    return ListID;
}

//至少选择一行
function checkSelect(mtype)
{
    var mframe = Form1.elements;
    var msg = "一旦记录提交批准，您就不能再编辑记录，也不能从批准过程中再将其调回。是否继续？";
    for (var j = 0; j < mframe.length; j++)
        if ((mframe[j].type == "checkbox") && (mframe[j].name == "chkIS") && (mframe[j].disabled == false) && (mframe[j].checked == true)) {
            if (mtype == '1') {
                if (confirm(msg))
                    return true;
                else
                    return false;
            }
            else
               return true;
        }
        
    alert(crmnew_vb21);
    return false;
}

///////////----end browser.ascx////////////////
///////////////////////////////////////////////
var d = null;
var lastX = null;
var watch_dog = null;
var currentResizeTdObj = null;
//IE、火狐、Chrome、Opera、Safari浏览器(五种内核)判定
var s;
var strSys = {};
var ua = navigator.userAgent.toLowerCase();
(s = ua.match(/msie ([\d.]+)/)) ? strSys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? strSys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? strSys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? strSys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? strSys.safari = s[1] : 0;

function MouseDown(event) {
    //判断是否存在未释放控件/事件
    if (currentResizeTdObj) {
        return;
    }
    d = document;
    event = event || window.event;
    //获取事件触发控件
    var objAfter = document.elementFromPoint(event.clientX, event.clientY);
    var objPrevious = document.elementFromPoint(event.clientX - 1, event.clientY);
    if (objAfter.tagName.toLowerCase() == "th") {
        if (objPrevious.tagName.toLowerCase() == "th") {
            objAfter = objPrevious;
        }
        if (objAfter.className == "fixed") {
            return;
        }
        lastX = event.clientX;
        currentResizeTdObj = objAfter.childNodes[0];
        //全浏览器事件抓取/监听
        if (navigator.userAgent.indexOf("Safari") > 0) {
            d.addEventListener("mousemove", MouseMove, true);
            d.addEventListener("mouseup", MouseUp, true);
        } else {
            if (currentResizeTdObj.setCapture) {
                currentResizeTdObj.setCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
        }
    }
}

function MouseUp() {
    if (!currentResizeTdObj) {
        return;
    }
    //保存列宽度
    TableColumnSave(currentResizeTdObj.id, currentResizeTdObj.style.width);
    //全浏览器事件释放/删除监听
    if (navigator.userAgent.indexOf("Safari") > 0) {
        d.removeEventListener("mousemove", MouseMove, true);
        d.removeEventListener("mouseup", MouseUp, true);
    } else {
        if (currentResizeTdObj.releaseCapture) {
            currentResizeTdObj.releaseCapture();
        } else if (window.releaseEvents) {
            window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
    }
    d.onmousemove = null;
    d.onmouseup = null;
    currentResizeTdObj = null;
}

function MouseMove(event) {
    if (!currentResizeTdObj) {
        return;
    }
    event = event || window.event;
    var t = event.clientX - lastX;
    var width;
    //处理需要同步的宽度
    if (window.ActiveXObject) {
        width = Math.round(currentResizeTdObj.clientWidth * 1 + t);
    } else {
        var TempClass = currentResizeTdObj.getAttribute("class").toString();
        if (TempClass != "gridCell_narrow") {
            width = currentResizeTdObj.clientWidth * 1 + t - 6;
        } else {
            width = currentResizeTdObj.clientWidth * 1 + t - 3;
        }
    }
    if (width < 0) {
        width = 5;
    }
    if (width > 500) {
        width = 500;
    }
    currentResizeTdObj.style.width = width;
    //同步宽度
    TableTopToBodyWidth(currentResizeTdObj.parentNode.cellIndex, currentResizeTdObj.style.width);
    lastX = event.clientX;
}

function DblClickTH(obj, event) {
    var src = null;
    //判断事件触发控件(火狐、非火狐)
    if (strSys.firefox == null) {
        src = event.srcElement;
    } else {
        src = event.target;
    }
    //非DIV时取其子结点(防止点到TH边框时触发)
    if (src.tagName.toLowerCase() != "div") {
        src = src.childNodes[0];
    }
    //DIV控件返回至全局变量(同步用)
    currentResizeTdObj = src;
    //IE、非IE浏览器分支
    if (window.ActiveXObject) {
        if (parseInt(src.clientWidth) == 120) {
            src.style.width = "500";
        } else {
            src.style.width = "";
        }
    } else {
        if (parseInt(src.clientWidth) == 126) {
            src.style.width = "506";
        } else {
            src.style.width = "";
        }
    }
    //处理需要同步的宽度
    if (!window.ActiveXObject) {
        var width = null;
        var TempClass = currentResizeTdObj.getAttribute("class").toString();
        if (TempClass != "gridCell_narrow") {
            width = currentResizeTdObj.clientWidth * 1 - 6;
        } else {
            width = currentResizeTdObj.clientWidth * 1 - 3;
        }
        TableTopToBodyWidth(src.parentNode.cellIndex, width);
    } else {
        TableTopToBodyWidth(src.parentNode.cellIndex, src.clientWidth);
    }
    //手动释放事件
    MouseUp();
}

function TouchStart() {
    //获取事件触发控件
    var objAfter = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
    var objPrevious = document.elementFromPoint(event.touches[0].clientX - 1, event.touches[0].clientY);
    if ((objPrevious.tagName.toLowerCase() == "th") || ((objPrevious.tagName.toLowerCase() == "div") && (objPrevious.parentNode.tagName.toLowerCase() == "th"))) {
        if ((objAfter.tagName.toLowerCase() == "th") || ((objAfter.tagName.toLowerCase() == "div") && (objAfter.parentNode.tagName.toLowerCase() == "th"))) {
            objAfter = objPrevious;
        }
        if ((objAfter.tagName.toLowerCase() == "table") || (objAfter.parentNode.tagName.toLowerCase() == "table")) {
            objAfter = objPrevious;
        }
        if (objAfter.className == "fixed") {
            return;
        }
        event.preventDefault();
        lastX = event.touches[0].clientX;
        if (objPrevious.tagName.toLowerCase() == "th") {
            currentResizeTdObj = objAfter.children[0];
        } else {
            currentResizeTdObj = objAfter;
        }
    }
}

function TouchMove() {
    if (!currentResizeTdObj) {
        return;
    }
    var t = event.touches[0].clientX - lastX;
    var width;
    //处理需要同步的宽度
    if (window.ActiveXObject) {
        width = Math.round(currentResizeTdObj.clientWidth * 1 + t);
    } else {
        var TempClass = currentResizeTdObj.getAttribute("class").toString();
        if (TempClass != "gridCell_narrow") {
            width = currentResizeTdObj.clientWidth * 1 + t - 6;
        } else {
            width = currentResizeTdObj.clientWidth * 1 + t - 3;
        }
    }
    if (width < 0) {
        width = 5;
    }
    if (width > 500) {
        width = 500;
    }
    currentResizeTdObj.style.width = width;
    TableTopToBodyWidth(currentResizeTdObj.parentNode.cellIndex, currentResizeTdObj.style.width);
    lastX = event.touches[0].clientX;
}

function TouchEnd() {
    if (!currentResizeTdObj) {
        return;
    }
    //保存列宽度
    TableColumnSave(currentResizeTdObj.id, currentResizeTdObj.style.width);
    currentResizeTdObj = null;
}
///////////////////////////////////////////////
function Call_GetSimFilStat(response) {
    if (response.value == "1") {
        document.getElementById("btnSimFil").style.display = "";
        $("tabSimFil").show();
    } else {
        document.getElementById("btnSimFil").style.display = "none";
        $("tabSimFil").hide();
    }
}
function Call_GetSimFilCon(response) {
    if (response.value == "") {
        $("tabSimFil").innerHTML = "";
        $("tabSimFil").hide();
        $("reloadshow1").style.top = "65px";
    } else {
        document.getElementById("tabSimFil").innerHTML = response.value;
        $("tabSimFil").show();
        $("reloadshow1").style.top = parseInt($("reloadshow1").style.top.replace("px", "")) + $("tabSimFil").offsetHeight - 1;
    }
}
function DisplaySF() {
    var simfil = document.getElementById("tabSimFil");
    if (simfil.style.display == "") {
        $("tabSimFil").hide();
        $("reloadshow1").style.top = "65px";
    } else {
        $("tabSimFil").show();
        $("reloadshow1").style.top = parseInt($("reloadshow1").style.top.replace("px", "")) + $("tabSimFil").offsetHeight - 1;
    }
}