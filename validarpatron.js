//app.getSharedData().ValidarPatron(page.F_TxtFamiliaTelefono,"####-####");
 app.getSharedData().ValidarPatronNum2 = function(theItem, pattern) {
    if(!pattern){ var pattern="9999-9999";} //valor default si no se envia

    var valorItem=theItem.getDisplayValue().toString().trim();//el valor digitado en el item
    var valorArrayNums= app.getSharedData().ExtraerDigitos2(valorItem);//obteniedo solo numeros (en formato array)
    var valorSoloNums='';
    if (valorArrayNums!=='' && valorArrayNums!==null) {
      valorSoloNums= valorArrayNums.join(''); //obteniendo numeros y colocandolos en una solo cadena
    }

    var valArrNumLength=valorArrayNums.length;
    var arrayPattern=pattern.split('');	//Patron convertido a array
    var numsPattern=pattern.match(/\d/g).length; //Total de solo numeros en patron
    var arrayPatternLength=arrayPattern.length;//longitud del patron completo

    console.log('valorSoloNums: ',valorSoloNums);
    console.log('valorArrayNums: ',valorArrayNums);
    //alert("valArrNumLength= "+valArrNumLength+" numsPattern= "+numsPattern);
    debugger;
    if (valArrNumLength===numsPattern) {
      //alert("Entro valArrNumLength===numsPattern");
        var posValorNum=0;
        var strOutput='';
        for (var i = 0; i < arrayPatternLength; i++) {
            let pattValue=get(arrayPattern,i);
            if (!isNaN(pattValue)) {//si lo que esta en patron es numero
                if (posValorNum<valArrNumLength) {
                    strOutput+=get(valorArrayNums,posValorNum);//escribimos el numero
                    posValorNum+=1;
                    theItem.setValue(strOutput);
                    theItem.setDisplayValue(strOutput);
                }
            }else{
                strOutput+=pattValue; //escribimos lo que no es numero
                theItem.setValue(strOutput);
                theItem.setDisplayValue(strOutput);
            }
        }
        return false;
    }else if(valArrNumLength>numsPattern){//asumimos que el patron ya esta completo
       //alert("valArrNumLength>numsPattern" );
       var valLimited=valorItem.substring(0,arrayPatternLength);
       theItem.setValue(valLimited);
       theItem.setDisplayValue(valLimited);
      return false;
    }else {
      //alert("valArrNumLength<numsPattern" );
      theItem.setValue(valorSoloNums);
      theItem.setDisplayValue(valorSoloNums);
      return false;
    }
}

//Función que extrae los digitos de una cadena de texto
//app.getSharedData().ExtraerDigitos(itemValue,returnString)
 app.getSharedData().ExtraerDigitos2 = function(itemValue,returnString){
   if (!returnString)
      returnString=false;

   var patSoloNum=/\d/g;
   var soloNum=itemValue.match(patSoloNum);
   if (soloNum===null) {//si no hay coincidencias con el patron
     return '';
   }

   if (returnString) {
     return soloNum.join(''); //retorna un string con todos los numeros
   }else {
        return soloNum; //retorna array con los numeros encontrados
   }

 }

//Función auxiliar que recibe un valor y retorna solo los numeros enteres
//app.getSharedData().SoloEnteros(itemValue)
app.getSharedData().SoloEnteros2 = function(itemValue) {
   var patSoloNum=/\d+/;
   var soloNum=itemValue.match(patSoloNum);
   if(soloNum===null){ //si no coincide con patron
     return '';//''
   }else{
     return get(soloNum,0);
   }
}
