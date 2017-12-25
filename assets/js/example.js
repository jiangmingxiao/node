var FilterableProductTable = React.createClass({
  ele:null,
  width:0,
  getInitialState: function() {
    return {
      mwidth: ''
    };
  },
  mousemove:function(e){
    
    e=e||window.event;
    var t = e.clientX - this.lastX;
    console.dir("上次记录点："+this.lastX+";本次记录点："+e.clientX+"差值："+t+"原始宽度："+this.ele.offsetWidth)
    this.ele.style.width=Math.floor(this.ele.offsetWidth+t-2)+"px"
    this.lastX=e.clientX;
  },
  mouseup:function(e){
    document.removeEventListener("mousemove", this.mousemove);
    document.removeEventListener("mouseup", this.mouseup);
    this.ele=null;
  },
  mousedown:function(e){

    e=e||window.event;
    if(!(e.target)||e.target.nodeName!="TH")
      return
    this.lastX = e.clientX;
    this.ele=e.target;
    console.dir(this.ele)
    this.ele.style.width=this.ele.offsetWidth+"px";
    document.addEventListener("mousemove",this.mousemove);
    document.ele.addEventListener("mouseup",this.mouseup);
  },
  render: function() {
    return (
        <table ref="table1" onMouseDown={this.mousedown} border="0" cellSpacing="0" cellPadding="0" width="100%" ><thead>
        <tr><th style={{width:"50px"}} ><div>姓名</div></th><th><div>年纪</div></th><th><div>性别</div></th></tr></thead>
          <tbody>
          <tr><td>jmx</td><td>26</td><td>nan</td></tr>
          <tr><td >jmx</td><td>26</td><td>nan</td></tr>
          <tr><td >jmx</td><td>26</td><td>nan</td></tr>
          <tr><td >jmx</td><td>26</td><td>nan</td></tr>
          <tr><td >jmx</td><td>26</td><td>nan</td></tr>
          </tbody>
        </table>
    );
  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('container')
);
