/*
	Framework  de funciones básicas para validaciones de objetos de formularios, IBM Forms Builder 8.6x (actualmente HCL Leap 9.x)
	Programado por: José Luis Olivares, Software Specialist, GBM El Salvador
	Email: jolivares@gbm.net
	Versión: 1.0.0
	Fecha: Junio 2019
	--------------------------------------------------------- <> ----------------------------------------------------
	NOTA: Esta librería esta diseñada para ser utilizada cuando la seguridad JavaScript dentro de FEB está habilitada 
	      (secureJS=true, en el archivo Builder_config.properties)
	--------------------------------------------------------- <> ----------------------------------------------------
	
	LinkedIn: www.linkedin.com/in/jolivaress/
	Email personal: joseluis_503@yahoo.com
	
*/

//definir el placeholder a mostrar en un input.
//EX.  app.getSharedData().InputPlaceHolder(page.F_NumUnico,"########-#");
 app.getSharedData().InputPlaceHolder=function(myInput,placeHolder) {
 	if (myInput.getActive===false){
 	 	myInput.setActive(true);	
 	}

	//myInput.setValue("");
	myInput.setPlaceholderText(placeHolder);//define patron recibido, Ex "####-##"
	//myInput.setFocus(); 
 }

//app.getSharedData().ValidarPatron(page.F_TxtFamiliaTelefono,"####-####",0);
//validaOnBlur opcional 0 o 1
 app.getSharedData().ValidarPatron = function(theItem, pattern,validaOnBlur) {

 	if(!pattern){
 		var pattern="####-####"; //valor default si no se envia
 	}

	if(!validaOnBlur){
 		var validaOnBlur=0;
 	}
	
		var valorItem=theItem.getDisplayValue().toString().trim();//el valor digitado en el item
		var strError='El valor especificado debe coincidir con el formato: ';
		var longPatron=pattern.length;

	try {

		var arrayPattern=pattern.split(''); //convertimos pattern a array
	    var numArray = valorItem.match(/(\d)|(-)/g); //obteniendo numeros y guiones, guardando en arreglo
	    //var numArrayString=numArray.toString().replace(/,/g,''); //numeros y guines en formato string da error en Forms
	    //var nuevoNumArray= numArray;
	 	var valorEnmascarado="";

		for (var i = 0; i <numArray.length; i++) {

			if(valorEnmascarado.length<longPatron){// si no se ha superado la longitud del patron		

				if(get(numArray,i)!=="-" && get(arrayPattern,i)!=="-")// si lo que hay en nuevoNumArray[i] es un numero, y en el patron no hay guion
				{
					valorEnmascarado+=get(numArray,i); //escribimos el numero

				}else if(get(numArray,i)!=="-" && get(arrayPattern,i)==="-"){
					valorEnmascarado+="-"+get(numArray,i); //escribimos el guion y el numero			
				}

				if(get(numArray,i)==="-" && get(arrayPattern,i)==="-"){
					valorEnmascarado+="-"; //esccribimos el guion
				}

			}

			theItem.setValue(valorEnmascarado);
			theItem.setDisplayValue(valorEnmascarado);
		}//end for	

	} catch(e) {
		// statements
		theItem.setDisplayValue("");
		theItem.setValue("");
		//console.log(e);
	}

		if(validaOnBlur!==0){ //si se va a validar al desenfocar item
			if(theItem.getValue().length!==longPatron){//si lo escrito no cumple longitud del patron
				theItem.getBOAttr().setValid(false, strError+pattern);		
			}else {
				theItem.getBOAttr().setValid(true, "");	
			}
		}
}

 
//Ex. app.getSharedData().ListadoDepartamentos("San Miguel");
app.getSharedData().ListadoDepartamentos = function(dropDownDestino, defaultDepto) {
	var listaDeptos=["Ahuachapán","Cabañas","Chalatenango","Cuscatlán","Morazán","La Libertad","La Paz","La Unión","San Miguel", "San Salvador","San Vicente","Santa Ana", "Sonsonate", "Usulután"];
	var deptos=new Array();
	var defaultDeptoPos=9;

	dropDownDestino.setValue('');//limpiando opciones

	for (var i = 0; i < listaDeptos.length; i++) {
		deptos.push({title: get(listaDeptos,i),value:get(listaDeptos,i)});	//usando get()  solo para IBM Forms

			if (get(listaDeptos,i)===defaultDepto.toString().trim()) {
		        	defaultDeptoPos=i;
		        }

	}

	dropDownDestino.setOptions(deptos);//
	dropDownDestino.setValue(get(deptos, defaultDeptoPos).value);//definimos el valor por deafult a mostrar, 9 es San Salvador 
}

//Carga un Drop Down List con los  municipios pertenecientes al departamento seleccionado.
//Ex. app.getSharedData().MostrarMunicipios("San Miguel", DropdownDestino);
app.getSharedData().MostrarMunicipios = function(depSeleccionado,myOption) {
	var ahuachapan=["Ahuachapán","Apaneca","Atiquizaya","Concepción de Ataco","El Refugio","Guaymango","Jujutla","San Francisco Menéndez","San Lorenzo","San Pedro Puxtla","Tacuba","Turín"];
	var cabanas=["Cinquera","Dolores (Villa Doleres)","Guacotecti","Ilobasco","Jutiapa","San Isidro","Sensuntepeque","Tejutepeque","Victoria"];
	var chalatenango=["Agua Caliente","Arcatao","Azacualpa","Chalatenango","Citalá","Comalapa","Concepción Quezaltepeque","Dulce Nombre de María","El Carrizal","El Paraíso","La Laguna","La Palma","La Reina","Las Vueltas","Nombre de Jesús","Nueva Concepción","Nueva Trinidad","Ojos de Agua","Potonico","San Antonio de la Cruz","San Antonio Los Ranchos","San Fernando","San Francisco Lempa","San Francisco Morazán","San Ignacio","San Isidro Labrador","San José Cancasque (Cancasque)","San José Las Flores","San Luis del Carmen","San Miguel de Mercedes","San Rafael","Santa Rita","Tejutla"];
	var cuscatlan=["Candelaria","Cojutepeque","El Carmen","El Rosario","Monte San Juan","Oratorio de Concepción","San Bartolomé Perulapía","San Cristóbal","San José Guayabal","San Pedro Perulapán","San Rafael Cedros","San Ramón","Santa Cruz Analquito","Santa Cruz Michapa","Suchitoto","Tenancingo"];
	var morazan=["Arambala","Cacaopera","Chilanga","Corinto","Delicias de Concepción","El Divisadero","El Rosario","Gualococti","Guatajiagua","Joateca","Jocoaitique","Jocoro","Lolotiquillo","Meanguera","Osicala","Perquín","San Carlos","San Fernando","San Francisco Gotera","San Isidro","San Simón","Sensembra","Sociedad","Torola","Yamabal","Yoloaiquín"];
	var lalibertad=["Antiguo Cuscatlán","Chiltiupán","Ciudad Arce","Colón","Comasagua","Huizúcar","Jayaque","Jicalapa","La Libertad","Santa Tecla (Nueva San Salvador)","Nuevo Cuscatlán","San Juan Opico","Quezaltepeque","Sacacoyo","San José Villanueva","San Matías","San Pablo Tacachico","Talnique","Tamanique","Teotepeque","Tepecoyo","Zaragoza"];
	var lapaz=["Cuyultitán","El Rosario (Rosario de La Paz)","Jerusalén","Mercedes La Ceiba","Olocuilta","Paraíso de Osorio","San Antonio Masahuat","San Emigdio","San Francisco Chinameca","San Juan Nonualco","San Juan Talpa","San Juan Tepezontes","San Luis La Herradura","San Luis Talpa","San Miguel Tepezontes","San Pedro Masahuat","San Pedro Nonualco","San Rafael Obrajuelo","Santa María Ostuma","Santiago Nonualco","Tapalhuaca","Zacatecoluca"];
	var launion=["Anamorós","Bolívar","Concepción de Oriente","Conchagua","El Carmen","El Sauce","Intipucá","La Unión","Lilisque","Meanguera del Golfo","Nueva Esparta","Pasaquina","Polorós","San Alejo","San José","Santa Rosa de Lima","Yayantique","Yucuaiquín"];
	var sanmiguel=["Carolina","Chapeltique","Chinameca","Chirilagua","Ciudad Barrios","Comacarán","El Tránsito","Lolotique","Moncagua","Nueva Guadalupe","Nuevo Edén de San Juan","Quelepa","San Antonio del Mosco","San Gerardo","San Jorge","San Luis de la Reina","San Miguel","San Rafael Oriente","Sesori","Uluazapa"];
	var sansalvador=["Aguilares","Apopa","Ayutuxtepeque","Ciuddad Delgado","Cuscatancingo","El Paisnal","Guazapa","Ilopango","Mejicanos","Nejapa","Panchimalco","Rosario de Mora","San Marcos","San Martín","San Salvador","Santiago Texacuangos","Santo Tomás","Soyapango","Tonacatepeque"];
	var sanvicente=["Apastepeque","Guadalupe","San Cayetano Istepeque","San Esteban Catarina","San Ildefonso","San Lorenzo","San Sebastián","San Vicente","Santa Clara","Santo Domingo","Tecoluca","Tepetitán","Verapaz"];
	var santaana=["Candelaria de la Frontera","Chalchuapa","Coatepeque","El Congo","El Porvenir","Masahuat","Metapán","San Antonio Pajonal","San Sebastián Salitrillo","Santa Ana","Santa Rosa Guachipilín","Santiago de la Frontera","Texistepeque"];
	var sonsonate=["Acajutla","Armenia","Caluco","Cuisnahuat","Izalco","Juayúa","Nahuizalco","Nahulingo","Salcoatitán","San Antonio del Monte","San Julián","Santa Catarina Masahuat","Santa Isabel Ishuatán","Santo Domingo de Guzmán","Sonsonate","Sonzacate"];
	var usulutan=["Alegría","Berlín","California","Concepción Batres","El Triunfo","Ereguayquín","Estanzuelas","Jiquilisco","Jucuapa","Jucuarán","Mercedes Umaña","Nueva Granada","Ozatlán","Puerto El Triunfo","San Agustín","San Buenaventura","San Dionisio","San Francisco Javier","Santa Elena","Santa María","Santiago de María","Tecapán","Usulután"];

	var dep=depSeleccionado.toString().trim();
	var munDepartamento=sansalvador;//por default
	var defaultCabecera=0;
	myOption.setActive(true);//habilitando el option
	switch (dep) {
		case "Ahuachapán":
			munDepartamento=ahuachapan;
			break;
		case "Cabañas":
			munDepartamento=cabanas;
			break;
		case "Chalatenango":
			munDepartamento=chalatenango;
			break;
		case "Cuscatlán":
			munDepartamento=cuscatlan;
			break;			
		case "Morazán":
			munDepartamento=morazan;
			break;
		case "La Libertad":
			munDepartamento=lalibertad;
			defaultCabecera=8;
			break;			
		case "La Paz":
			munDepartamento=lapaz;
			break;	
		case "La Unión":
			munDepartamento=launion;
			defaultCabecera=7;
			break;
		case "San Miguel":
			munDepartamento=sanmiguel;
			defaultCabecera=16;
			break;
		case "San Vicente":
			munDepartamento=sanvicente;
			defaultCabecera=7;
			break;				
		case "Santa Ana":
			munDepartamento=santaana;
			defaultCabecera=9;
			break;
		case "Sonsonate":
			munDepartamento=sonsonate;
			break;	
		case "Usulután":
			munDepartamento=usulutan;
			defaultCabecera=22;
			break;																			
		default:
			munDepartamento=sansalvador; 
			defaultCabecera=14;
			break;
	}

	myOption.setValue('');//limpiando opciones
	var options= new Array();

	for (var i = 0; i < munDepartamento.length; i++) {
		//options.push({title: munDepartamento[i],value:munDepartamento[i]});//con javascript standard	
		options.push({title: get(munDepartamento,i),value:get(munDepartamento,i)});	//usando get()  solo para IBM Forms
	}

	myOption.setOptions(options);//cargamos los municipios acorde al departamento seleccionado
	myOption.setValue(get(options, defaultCabecera).value);//definimos el valor por deafult a mostrar,  

}
// funcion para cargar listado de paises en Drop Down 
//EX.  app.getSharedData().ListadoPais(page.DropDow,"El Salvador");
app.getSharedData().ListadoPais=function(myOption, defaultCountry) {
var lstPais={"AF":"Afganist\u00e1n","AL":"Albania","DE":"Alemania","AD":"Andorra","AO":"Angola","AI":"Anguila","AQ":"Ant\u00e1rtida","AG":"Antigua y Barbuda","SA":"Arabia Saud\u00ed","DZ":"Argelia","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaiy\u00e1n","BS":"Bahamas","BD":"Banglad\u00e9s","BB":"Barbados","BH":"Bar\u00e9in","BE":"B\u00e9lgica","BZ":"Belice","BJ":"Ben\u00edn","BM":"Bermudas","BY":"Bielorrusia","BO":"Bolivia","BA":"Bosnia-Herzegovina","BW":"Botsuana","BR":"Brasil","BN":"Brun\u00e9i","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","BT":"But\u00e1n","CV":"Cabo Verde","KH":"Camboya","CM":"Camer\u00fan","CA":"Canad\u00e1","IC":"Canarias","BQ":"Caribe neerland\u00e9s","QA":"Catar","EA":"Ceuta y Melilla","TD":"Chad","CZ":"Chequia","CL":"Chile","CN":"China","CY":"Chipre","VA":"Ciudad del Vaticano","CO":"Colombia","KM":"Comoras","KP":"Corea del Norte","KR":"Corea del Sur","CR":"Costa Rica","CI":"C\u00f4te d\u2019Ivoire","HR":"Croacia","CU":"Cuba","CW":"Curazao","DG":"Diego Garc\u00eda","DK":"Dinamarca","DM":"Dominica","EC":"Ecuador","EG":"Egipto","SV":"El Salvador","AE":"Emiratos \u00c1rabes Unidos","ER":"Eritrea","SK":"Eslovaquia","SI":"Eslovenia","ES":"Espa\u00f1a","US":"Estados Unidos","EE":"Estonia","ET":"Etiop\u00eda","EZ":"Eurozone","PH":"Filipinas","FI":"Finlandia","FJ":"Fiyi","FR":"Francia","GA":"Gab\u00f3n","GM":"Gambia","GE":"Georgia","GH":"Ghana","GI":"Gibraltar","GD":"Granada","GR":"Grecia","GL":"Groenlandia","GP":"Guadalupe","GU":"Guam","GT":"Guatemala","GF":"Guayana Francesa","GG":"Guernesey","GN":"Guinea","GQ":"Guinea Ecuatorial","GW":"Guinea-Bis\u00e1u","GY":"Guyana","HT":"Hait\u00ed","HN":"Honduras","HU":"Hungr\u00eda","IN":"India","ID":"Indonesia","IQ":"Irak","IR":"Ir\u00e1n","IE":"Irlanda","AC":"Isla de la Ascensi\u00f3n","IM":"Isla de Man","CX":"Isla de Navidad","NF":"Isla Norfolk","IS":"Islandia","AX":"Islas \u00c5land","KY":"Islas Caim\u00e1n","CC":"Islas Cocos","CK":"Islas Cook","FO":"Islas Feroe","GS":"Islas Georgia del Sur y Sandwich del Sur","FK":"Islas Malvinas","MP":"Islas Marianas del Norte","MH":"Islas Marshall","UM":"Islas menores alejadas de EE. UU.","PN":"Islas Pitcairn","SB":"Islas Salom\u00f3n","TC":"Islas Turcas y Caicos","VG":"Islas V\u00edrgenes Brit\u00e1nicas","VI":"Islas V\u00edrgenes de EE. UU.","IL":"Israel","IT":"Italia","JM":"Jamaica","JP":"Jap\u00f3n","JE":"Jersey","JO":"Jordania","KZ":"Kazajist\u00e1n","KE":"Kenia","KG":"Kirguist\u00e1n","KI":"Kiribati","XK":"Kosovo","KW":"Kuwait","LA":"Laos","LS":"Lesoto","LV":"Letonia","LB":"L\u00edbano","LR":"Liberia","LY":"Libia","LI":"Liechtenstein","LT":"Lituania","LU":"Luxemburgo","MK":"Macedonia","MG":"Madagascar","MY":"Malasia","MW":"Malaui","MV":"Maldivas","ML":"Mali","MT":"Malta","MA":"Marruecos","MQ":"Martinica","MU":"Mauricio","MR":"Mauritania","YT":"Mayotte","MX":"M\u00e9xico","FM":"Micronesia","MD":"Moldavia","MC":"M\u00f3naco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MZ":"Mozambique","MM":"Myanmar (Birmania)","NA":"Namibia","NR":"Nauru","NP":"Nepal","NI":"Nicaragua","NE":"N\u00edger","NG":"Nigeria","NU":"Niue","NO":"Noruega","NC":"Nueva Caledonia","NZ":"Nueva Zelanda","OM":"Om\u00e1n","NL":"Pa\u00edses Bajos","PK":"Pakist\u00e1n","PW":"Palaos","PA":"Panam\u00e1","PG":"Pap\u00faa Nueva Guinea","PY":"Paraguay","PE":"Per\u00fa","PF":"Polinesia Francesa","PL":"Polonia","PT":"Portugal","PR":"Puerto Rico","HK":"RAE de Hong Kong (China)","MO":"RAE de Macao (China)","GB":"Reino Unido","CF":"Rep\u00fablica Centroafricana","CG":"Rep\u00fablica del Congo","CD":"Rep\u00fablica Democr\u00e1tica del Congo","DO":"Rep\u00fablica Dominicana","RE":"Reuni\u00f3n","RW":"Ruanda","RO":"Ruman\u00eda","RU":"Rusia","EH":"S\u00e1hara Occidental","WS":"Samoa","AS":"Samoa Americana","BL":"San Bartolom\u00e9","KN":"San Crist\u00f3bal y Nieves","SM":"San Marino","MF":"San Mart\u00edn","PM":"San Pedro y Miquel\u00f3n","VC":"San Vicente y las Granadinas","SH":"Santa Elena","LC":"Santa Luc\u00eda","ST":"Santo Tom\u00e9 y Pr\u00edncipe","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leona","SG":"Singapur","SX":"Sint Maarten","SY":"Siria","SO":"Somalia","LK":"Sri Lanka","SZ":"Suazilandia","ZA":"Sud\u00e1frica","SD":"Sud\u00e1n","SS":"Sud\u00e1n del Sur","SE":"Suecia","CH":"Suiza","SR":"Surinam","SJ":"Svalbard y Jan Mayen","TH":"Tailandia","TW":"Taiw\u00e1n","TZ":"Tanzania","TJ":"Tayikist\u00e1n","IO":"Territorio Brit\u00e1nico del Oc\u00e9ano \u00cdndico","TF":"Territorios Australes Franceses","PS":"Territorios Palestinos","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad y Tobago","TA":"Trist\u00e1n de Acu\u00f1a","TN":"T\u00fanez","TM":"Turkmenist\u00e1n","TR":"Turqu\u00eda","TV":"Tuvalu","UA":"Ucrania","UG":"Uganda","UN":"United Nations","UY":"Uruguay","UZ":"Uzbekist\u00e1n","VU":"Vanuatu","VE":"Venezuela","VN":"Vietnam","WF":"Wallis y Futuna","YE":"Yemen","DJ":"Yibuti","ZM":"Zambia","ZW":"Zimbabue"};
		var defaultCountryPos=62; //62 es la posicion de El Salvador en el objeto lstPais
		var currentPos=0;
		var options = new Array();

		for (var key in lstPais) {
		    if (lstPais.hasOwnProperty(key)) {
		        //var valor = lstPais[key]; //javascript standard
		        var valor = get(lstPais,key); //get es un metodo que usa Forms. Syntax: get(obj,prop)
		        //https://www.ibm.com/support/knowledgecenter/SS8QV4/FEB/ref_jsapi_javascript_security.html#javascriptsecurity		        
		        options.push({title: valor,value:valor});

		        if (valor===defaultCountry.toString().trim()) {
		        	defaultCountryPos=currentPos;
		        }
		    }
		    currentPos++;
		}
		myOption.setOptions(options);
		myOption.setValue(get(options, defaultCountryPos).value); //definimos el valor por deafult a mostrar, posicion 62 es El Salvador

}

//Funcion que compara dos fechas para determinar si una es mayor que otra
//EX.  app.getSharedData().ValidarFechaMayor(Bo.objetoFechaEvaluar,BO.objetoFechaMaxima,mensajeError);

app.getSharedData().ValidarFechaMayor= function(miFecha, fechaMaxima, errorMsg) {
 
	var fechaEvaluada = miFecha.getValue(); //fecha 1
	var fechaMax = fechaMaxima.getValue(); //fecha 2
	
	//convirtiendo a milisegundos
	var fechaEvaluadaMili = fechaEvaluada.getTime();
	var fechaMaximaMili = fechaMax.getTime();
	 
	if(fechaEvaluadaMili>fechaMaximaMili){
		miFecha.setValid(false,errorMsg);
	}else{
		miFecha.setValid(true,"");
	}
}

//Calcula la edad partiendo de la fecha de nacimiento.
// Ex. BO.F_Number.setValue(app.getSharedData().CalcularEdad(BOA.getValue(), true));
app.getSharedData().CalcularEdad = function(birthDay) {
  //31557600000 is 24 * 3600 * 365.25 * 1000 es un año, un año 365 days y 6 horas, lo cual es  0.25 de dia.
  // doble tilde convierte float a integer
  return ~~((Date.now() - birthDay) / (31557600000));

}

//Habilita un objeto destino en base a un valor del objeto causante
//Ex.  app.getSharedData().HabilitarItemCausaEfecto(optionObject,"Si",txtObject);
 app.getSharedData().HabilitarItemCausaEfecto=function(itemOrigen, valorCausa, itemDestino) {

 	var valorItemOrigen=itemOrigen.getValue();
	if(valorItemOrigen===valorCausa){
		  itemDestino.setActive(true);
		  itemDestino.setValue("");
		  itemDestino.setFocus();
	}else{
		  itemDestino.setValue("N/A");
		  itemDestino.setActive(false);
	}

 }

 //busca texto dentro de las opciones del dropdown y retorna su posición
 //app.getSharedData().BuscarOpcionDropDown(listaOpciones,"texto a buscar");
 app.getSharedData().BuscarOpcionDropDown = function(lstDropDown,searchValue) {
 	//var lstDropDown=myDropDown.getOptions();
 	var currentPos=0;
 	var defaultPos=-1;

		for (var key in lstDropDown) {
		    if (lstDropDown.hasOwnProperty(key)) {
		        var valor = get(lstDropDown,key); //get es un metodo que usa Forms. Syntax: get(obj,prop)

		        if (valor===searchValue.trim()) {
		        	defaultPos=currentPos;
		        }
		    }
		    currentPos++;
		}

		return defaultPos;
 }

//Validar que un input acepte solo números (enteros/flotantes)
//app.getSharedData().SoloNumeros(itemInput);
  app.getSharedData().SoloNumeros = function(theItem) {

	  	var valor=theItem.getDisplayValue()||'';
	  	var patron=/\d+\.?\d{0,2}/; //entero, o float con dos digitos decimales
	  	var newValor=valor.toString().match(patron);//validando patron
	  	if(newValor===null){
	  		theItem.setValue('');
	  		theItem.setDisplayValue('');
	  	}else{
	  		theItem.setValue(get(newValor,0));
	  		theItem.setDisplayValue(get(newValor,0));
	  	}

  }

  //Validar que un input acepte solo digitos con guiones 
//app.getSharedData().SoloNumGuion(itemInput);
  app.getSharedData().SoloNumGuion = function(theItem) {

	  	var valor=theItem.getDisplayValue()||"";
	  	var patron=/\d+\-?/g; // 1 o mas decimales y guiones
	  	var newValor=valor.toString().match(patron);//validando patron
	  	var numGuion="";
	  	if(newValor===null){
	  		theItem.setValue('');
	  		theItem.setDisplayValue('');
	  	}else{

	  		for (var i = 0; i < newValor.length; i++) {
	  			numGuion+=get(newValor,i);
	  		}
	  		theItem.setValue(numGuion);
	  		theItem.setDisplayValue(numGuion);
	  		theItem.getBOAttr().setValid(true);
	  	}
  }


 //Validar que solo el usuario que creo el registro, pueda editarlo. 
 //se compara el valor de app.getCurrentUser() guardado en un campo del formulario con el usuario actual de sesión
 //si el usuario guardado no corresponde con el de la sesión actual, desactivamos la sección. 
 //Ex. app.getSharedData().ValidarEditarSeccion(page.F_TxtHiddenCreatorID.getValue(),app.getCurrentUser(),page.F_secDatosPersonales);
  app.getSharedData().ValidarEditarSeccion = function(savedUser,currentUser,theSection) {
	//page.F_secDatosPersonales.setActive(false);
	var creatorUser=savedUser||"x";	   
	var sessionUser=currentUser||"y";

	if(theSection.getType() === "section"){  //si el elemnto es una sesccion ( getType es propio de FEB)
		if(creatorUser!==sessionUser && creatorUser!==""){// si son distintos y  creator no está vacio
			theSection.setActive(false);	
		}else{
			theSection.setActive(true);
		}
	}else{
		//console.log("El parametro TheSection no es item de tipo section");//da error en FEB con security javascript
	}

  }