const GroupSize = 3;

const formatPrice1 = (str) => {
    const len = str.length;
    const array=[];
    if(len <= GroupSize){
      return str
    }
    let index = len % GroupSize;
    for(let i=index,j=0;i<len;i++){
  
      array.push(str[i])
    }
  }
  //拼接字符串的形式
const formatPrice2 = (str)=>{
    let len = str.length;
    if(len <= 3){
      return str
    }
    
    let index = len % 3;
    if(index>0) {
      str = str.substr(0,index)+","+str.substr(index);
      index++;
      len++;
    }
    
    for(let i=index,j = 0;i<len;i++){
  
      if( j%3 === 0 && j!==0) {
        str = str.substr(0,i)+","+str.substr(i);
        i++;
        len++;
      }
      j++;
      
      
    }
    return str;
  }

  export{
    formatPrice1,
    formatPrice2
  }