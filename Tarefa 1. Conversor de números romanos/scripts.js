function ConverteNumero(){

    var numero =  document.getElementById("number").value;
    var p = document.getElementById("converted-number");

    if(isNaN(numero)){
        p.innerHTML = "Em decimal: "+ RomanoParaDecimal(numero.toUpperCase());
    }
    else{
        p.innerHTML = "Em romano: "+ ConverteParaRomano(numero);
    }

    
}

var matrizRomana = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  
  function ConverteParaRomano(num) {
    if (num === 0) {
      return '';
    }
    for (var i = 0; i < matrizRomana.length; i++) {
      if (num >= matrizRomana[i][0]) {
        return matrizRomana[i][1] + ConverteParaRomano(num - matrizRomana[i][0]);
      }
    }
  }

  function value(r) 
  {
      if (r == 'I')
          return 1;
      if (r == 'V')
          return 5;
      if (r == 'X')
          return 10;
      if (r == 'L')
          return 50;
      if (r == 'C')
          return 100;
      if (r == 'D')
          return 500;
      if (r == 'M')
          return 1000;
      return -1;
  }
    

  function RomanoParaDecimal(str) 
  {
      var res = 0;
    
       for (i = 0; i < str.length; i++) 
       {
           var s1 = value(str.charAt(i));
    
           if (i + 1 < str.length) 
           {
               var s2 = value(str.charAt(i + 1));
    
               if (s1 >= s2) 
               {
                   res = res + s1;
               } 
               else 
               {
                   res = res + s2 - s1;
                   i++;
               }
           } 
           else  
           {
               res = res + s1;
           }
       }
       return res;
  }