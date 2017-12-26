
import {formatPrice1,formatPrice2} from "../lib/utils";

var FilterableProductTable = React.createClass({
  data:[{"name":"jmx","id":"1","sex":"男","age":1},
    {"name":"jmx1","id":"2","sex":"男","age":2},
    {"name":"jmx2","id":"3","sex":"男","age":3},
    {"name":"jmx3","id":"4","sex":"男","age":4},
    {"name":"jmx4","id":"5","sex":"男","age":5}],
  getInitialState: function() {
    return {
      data:this.data,
      head:[{"key":"name","value":"名称","type":"value"},{"key":"sex","value":"性别","type":"value"},{"key":"age","value":"年龄","type":"input"}],
      pageSize:10,
      pageIndex:1,
      pageCount:(this.data && this.data.length)?this.data.length:0
    };
  },
  setValue:function (index,key,value) {
    var data=this.state.data;
    data[index+(this.state.pageIndex-1)*this.state.pageSize][key]=value;
    this.setState({data:data});
  },
  deleFn:function (index) {
    var data=this.state.data;
    data.splice(index+(this.state.pageIndex-1)*this.state.pageSize,1);
    this.setState({data:data,pageCount:data.length});
  },
  changeIndex:function (index) {
    this.setState({pageIndex:index})
  },
  i:5,
  add:function () {
    var data=this.state.data;
    this.i++;
    data.push({"name":"jmx4","id":"5","sex":"男","age":this.i});
    this.setState({data:data,pageCount:data.length});
  },
  render: function() {
    var data=[];
    var self=this;
    this.state.data.map(function (item,index) {

      if(index>=((self.state.pageIndex-1)*self.state.pageSize) && index<=(self.state.pageIndex*self.state.pageSize-1)){

        data.push(item);
      }
    });
    return (
        <div>
          <button onClick={this.add}>添加</button>
          <table ref="table1" onMouseDown={this.mousedown} border="0" cellSpacing="0" cellPadding="0" width="100%" ><thead>
            <tr><th style={{width:"50px"}} ><div>姓名</div></th><th><div>年纪</div></th><th><div>性别</div></th><th><div>操作</div></th></tr></thead>
            <TBody  data={data} head={this.state.head} setValue={this.setValue} deleFn={this.deleFn}></TBody>
          </table>
          <Pagination pageSize={this.state.pageSize} pageIndex={this.state.pageIndex} pageCount={this.state.pageCount} onChange={this.changeIndex}></Pagination>
        </div>
    );
  }
});

console.log("testData",formatPrice1("1234567890"))
var Pagination=React.createClass({
  getInitialState : function(){
    return {
      pageCount : this.props.pageCount || 0,
      pageSize : this.props.pageSize || 10,
      pageIndex : this.props.pageIndex || 1
    }
  },
  _onChange : function(page){
    var pageNum = parseInt(this.state.pageIndex);
    if(this.props && this.props.onChange && typeof this.props.onChange == 'function' && page != pageNum){
      var count = parseInt(this.state.pageCount);
      var pageSize = parseInt(this.state.pageSize);
      var pageCount = count%pageSize == 0 ? parseInt(count/pageSize) : parseInt(count/pageSize)+1;
      if(page<1){
        page = 1;
      }else if(page>pageCount){
        page = pageCount;
      }
      this.props.onChange(page);
    }
  },
  render: function() {

    var btnArray = [];
    var count = parseInt(this.state.pageCount);
    var pageSize = parseInt(this.state.pageSize);
    var pageNum = parseInt(this.state.pageIndex);
    var pageCount = count%pageSize == 0 ? parseInt(count/pageSize) : parseInt(count/pageSize)+1;

    if (pageNum > 1) {

      btnArray.push(<PagerItem showValue="上一页" pageValue={pageNum-1} clickEventHandler={this._onChange} key={"prevPage"}/>);
    }

    if (pageNum <= 5) {

      for (var i = 1; i < pageNum; ++i) {

        btnArray.push(<PagerItem showValue={i} pageValue={i} clickEventHandler={this._onChange} key={i} />);
      }

      btnArray.push(<PagerItem showValue={pageNum} pageValue={pageNum} current="1" key={pageNum}/>);
    } else {

      btnArray.push(<PagerItem showValue="1" pageValue="1" clickEventHandler={this._onChange} key={1} />);
      btnArray.push(<PagerItem showValue="2" pageValue="2" clickEventHandler={this._onChange} key={2} />);
      btnArray.push(<PagerItem showValue="..." pageValue="" key="page-more" />);
      btnArray.push(<PagerItem showValue={pageNum-2} pageValue={pageNum-2} clickEventHandler={this._onChange} key={pageNum-2}/>);
      btnArray.push(<PagerItem showValue={pageNum-1} pageValue={pageNum-1} clickEventHandler={this._onChange} key={pageNum-1}/>);
      btnArray.push(<PagerItem showValue={pageNum} pageValue={pageNum} current="1" key="page-lastone" />);
    }

    if (pageNum+2 >= pageCount) {

      for (var i = pageNum+1; i <= pageCount; ++i) {

        btnArray.push(<PagerItem showValue={i} pageValue={i} clickEventHandler={this._onChange} key={i}/>);
      }

    } else {

      btnArray.push(<PagerItem showValue={pageNum+1} pageValue={pageNum+1} clickEventHandler={this._onChange} key={pageNum+1}/>);
      btnArray.push(<PagerItem showValue={pageNum+2} pageValue={pageNum+2} clickEventHandler={this._onChange} key={pageNum+2}/>);
      btnArray.push(<PagerItem showValue="..." pageValue="" key="page-more" />);
    }

    if (pageNum < pageCount) {

      btnArray.push(<PagerItem showValue="下一页" pageValue={pageNum+1} clickEventHandler={this._onChange} key={"pageNext"}/>);
    }

    btnArray.push(<PagerItem showValue={"共"+pageCount+"页"} pageValue="" key="page-count" />);
    btnArray.push(<PagerItem showValue="jump" pageValue={pageNum} clickEventHandler={this._onChange} key="page-jump" />);

    return (
        <div className="ChanjetPager_React">
          <ul className="ChanjetPager_React_UL">{btnArray}</ul>
          <div className="clear"></div>
        </div>
    );
  },
  componentWillReceiveProps: function(nextProps) {

    this.setState(nextProps);
  }
});
var PagerItem = React.createClass({
  getInitialState : function(){
    return {
      showValue : this.props.showValue || "",
      pageValue : this.props.pageValue || 0,
      current : this.props.current || "0"
    }
  },
  render : function(){
    if(this.state.showValue == "jump"){
      return <li className="ChanjetPager_React_LI Omit">到第<input className="ChanjetPager_React_LI_Input" type="text" onKeyDown={this._onKeyDown} onChange={this._onInput} value={this.state.pageValue} />页<div className="ChanjetPager_React_LI_Button" onClick={this._onClick}>确定</div></li>;
    }else{
      var LiClassName = "ChanjetPager_React_LI";
      if(this.state.pageValue == ""){
        LiClassName += " Omit";
      }
      if(this.state.current == "1"){
        LiClassName += " Current";
      }
      return <li className={LiClassName} onClick={this._onClick}>{this.state.showValue}</li>;
    }
  },
  _onKeyDown : function(event){
    if(event.keyCode == '13'){
      this._onClick();
    }
  },
  _onInput : function(event){
    var value=event.target.value;
    var number = /^[0-9]*$/;
    if(number.test(value)){
      this.setState({pageValue : value});
    }
  },
  _onClick : function(){
    if(this.props && this.props.clickEventHandler && typeof this.props.clickEventHandler == 'function' && this.state.current == 0 && this.state.pageValue != ""){
      this.props.clickEventHandler(this.state.pageValue);
    }
  },
  componentWillReceiveProps : function(nextProps){
    //if(!nextProps.current){
    //    nextProps.current = 0;
    //}
    var state = nextProps;
    this.setState(state);
  }
});
var TBody=React.createClass({
  render: function() {
    var trs=[];
    var self=this;
    this.props.data.map(function(item,index){

      trs.push(<Tr data={item} key={index} index={index} head={self.props.head} setValue={self.props.setValue.bind(null,index)} deleFn={self.props.deleFn.bind(null,index)}></Tr>);
    })
    return(
      <tbody>
        {trs}
      </tbody>
      )
  }
});
var Tr=React.createClass({
  render: function() {
    var tds=[];
    var self=this;
    this.props.head.map(function (item,index) {
      tds.push(<td key={index}><Cell config={item} value={self.props.data[item["key"]]} setValue={self.props.setValue.bind(null,item["key"])}></Cell></td>)
    })
    tds.push(<td key="a"><div onClick={this.dele}>删除</div></td>);
    return(<tr>{tds}</tr>)
  },
  dele:function () {
    this.props.deleFn();
  }
});
var Cell=React.createClass({
  getInitialState: function() {
    return{
      type:this.props.config.type,
      isEdit:false,
      value:this.props.value
    }
  },
  componentWillReceiveProps: function(nextProps) {

    this.setState({value:nextProps.value,type:nextProps.config.type});
  },
  render:function () {
    var config=this.props.config;
    switch (config.type){

    }
    var content=null;
    if(this.state.isEdit){
      content=(<input ref="input" value={this.state.value} onChange={this.changeValue}  onBlur={this.edited}/>)
    }else{
      content=(<span>{this.state.value}</span>)
    }
    return(
        <div onClick={this.editing}>
          {content}
        </div>
    )
  },
  changeValue:function (event) {
    this.setState({value:event.target.value});
  },
  editing:function () {
    this.setState({isEdit:true},function(){
      ReactDOM.findDOMNode(this.refs["input"]).focus();
    });

  },
  edited:function (event) {
    this.props.setValue(event.target.value);
    this.setState({isEdit:false});
  }
})

ReactDOM.render(
    <FilterableProductTable  />,
    document.getElementById('container')
);
