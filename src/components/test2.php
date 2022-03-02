<?php

session_start();

//error_reporting(-1);
//ini_set('display_errors', 'On');


// fatto per la differenza tra windows e linux
/*
if(is_dir('..\\')){

    include_once "..\generatePage.php";

    include_once("..\db_manager.php");
    
    include_once("..\\feedback\invia_richiesta_feedback.php");

    //include_once("..\auto\ciao.php");
    
    include_once("..\\taskNotturno\lanciaTaskNotturno.php");
    
    include_once("..\\autoriparatori\BE_autoriparatori.php"); 
    
    //include_once("..\utility.php");
}

else{*/

     include_once("../db_manager.php");

    //include_once "../generatePage.php";

    //include_once("..//feedback/invia_richiesta_feedback.php");
    
    //include_once("..//taskNotturno/lanciaTaskNotturno.php");
    
    include_once("..//autoriparatori/BE_autoriparatori.php");
    


//}    


include_once("mailConfermaRichiesta.php");

include_once("utility.php");

include_once("fotoRichiesta.php");

include_once("mailRinnovaAnnullaRichiesta.php");

//include_once("invioSingolaRichiesta.php");





$_POST = str_replace("'","",$_POST,$i);
$_POST = str_replace('"',"",$_POST,$i);

//$_POST["INFO"] = str_replace(array("\r\n","\r", "\n"), "", $_POST["INFO"]);
$_POST["INFO"] = trim($_POST["INFO"]);

if($_POST["ACCETTAZIONE_PUBBLICITA"]==1){
    // do nothing
} 
else{
   $_POST["ACCETTAZIONE_PUBBLICITA"]=0; 
}



//print_r($_POST);
//exit("fine");


/*
if(!$_SESSION["ID_RICHIESTA"]){
    if($_POST["PAGE_FROM"]=="NUOVA_PAGINA"){
        echo("verifichiamo1");
        header("Location:../3preventivo/preventivo.php?primo=primo");   
        exit();
    } 
    else{
        header("Location:preventivo");   
        exit();
   }    
}*/


//echo("eccomi");
// BISOGNA METTERE IL CONTROLLO ID_RICHIESTA E PASSWORD
if($_POST["ID_RICHIESTA"] && $_POST["PASSWORD"] && check_idrichiesta_password()==true){
    //OK
}
else{
   exit("Sessione scaduta"); 
   
}


// ESEGUO CANCELLAZIONE SOLAMENTE SE C'E' UN ID DA CANCELLARE
if($_POST["ID_FOTO_TO_DELETE"]){
    
        
        
   updateDatiRichiesta();
   delete();

   if($_POST["PAGE_FROM"]=="NUOVA_PAGINA"){
       //echo("verifichiamo2");
        //header("Location:../3preventivo/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1");   
        echo("<script>window.location.replace('../3preventivo/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1');</script>");
        exit();
   }
   else if($_POST["PAGE_FROM"]=="APP"){
       //echo("verifichiamo2");
        //header("Location:../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1");   
        echo("<script>window.location.replace('../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1');</script>");
        exit();
   }   
   else{    
        //header("Location:preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]);   
        echo("<script>window.location.replace('preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."');</script>");
        exit();
   }     
}


// STAMPO LA LISTA DI FOTO
$fileToUpload  = $_FILES["fileToUpload"];

if($fileToUpload && $fileToUpload["size"][0]!=0 ){

    //print_r($_POST);
    //exit("prova martin");
    
    updateDatiRichiesta();

    foreach($_FILES["fileToUpload"]["tmp_name"] as $index => $nomeFile){
        if(formatoFileAdatto($index)){
            $idFoto = registraSuDB();

            $nomeFile = $idFoto.".jpg";
            salvaFile($index,$nomeFile);
        }
        else{
            echo("IL FORMATO DELL' IMMAGINE NON E' ADATTO, UTILIZZARE SOLO IL FORMATO JPEG o GIF O PNG <BR>");
        }
    }

    //print_r($_POST);
    //exit();
    
   if($_POST["FROM_ANDROID"]=="1"){
       // NON ESCO PERCHE CON ANDROID LE FOTO SONO MANDATE IN UNA UNICA SOLUZIONE
   }
   else{
        if($_POST["PAGE_FROM"]=="NUOVA_PAGINA"){
            //echo("verifichiamo3");
            //header("Location:../3preventivo/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1");   
            echo('<script>window.location.replace("../3preventivo/preventivo.php?ID_RICHIESTA='.$_POST["ID_RICHIESTA"].'&PASSWORD='.$_POST["PASSWORD"].'&FROM_GESTIONE_FOTO=1");</script>');
            exit();        
        }
        else if($_POST["PAGE_FROM"]=="APP"){
            //echo("dopo foto pagefrom app");
            //header("Location:../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1");   
            echo("<script>window.location.replace('../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1');</script>");
            exit();        
        }
        else{
            //header("Location:preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]);   
            echo("<script>window.location.replace('preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."');</script>");
            exit();
        }    
   }

}

if( $_POST["s1"] ){

    
    updateDatiRichiesta();
    
    $idFoto = registraSuDB();

    $nomeFile = $idFoto.".jpg";
    
   
    salva_file_gia_ridotto($nomeFile);
    
   if($_POST["FROM_ANDROID"]=="1"){
       // NON ESCO PERCHE CON ANDROID LE FOTO SONO MANDATE IN UNA UNICA SOLUZIONE
   }
   else{
        if($_POST["PAGE_FROM"]=="APP"){
            //echo("verifichiamo33");
            //header("Location:../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1");   
            echo("<script>window.location.replace('../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1');</script>");
            exit();        
        }
        else{
            //header("Location:preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1");   
            echo("<script>window.location.replace('preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&FROM_GESTIONE_FOTO=1');</script>");
            exit();
        }    
   }


}





// NEL CASO IN CUI NON CI SIA STATO DA CANCELLARE FOTO O DA CARICARE FOTO ALLORA VADO AVANTI E REGISTRO COME ULTIMO LA RICHIESTA
// E FACCCIO TUTTE LE ALTRE COSE .. MANDARE MAIL ETC ..

$idRichiesta = $_POST["ID_RICHIESTA"];



updateDatiRichiesta();


// controllo se i dati sono a posto
$alertCampi = checkCampi();
if($alertCampi!=''){
   if($_POST["PAGE_FROM"]=="NUOVA_PAGINA"){
       //echo("verifichiamo4");
        //header("Location:../3preventivo/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&ALERT_CAMPI=".$alertCampi);   

    $string_prova_campagna = '
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23373009-1">
    </script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());

    gtag("config", "UA-23373009-1");
    </script>
    ';
        echo($string_prova_campagna."<script>window.location.replace('../3preventivo/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&ALERT_CAMPI=".$alertCampi."');</script>");
        exit();
   } 
   else if($_POST["PAGE_FROM"]=="APP"){
       //echo("verifichiamo4");
        //header("Location:../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&ALERT_CAMPI=".$alertCampi);   
        echo("<script>window.location.replace('../3preventivo_soloapp/preventivo.php?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&ALERT_CAMPI=".$alertCampi."');</script>");
        exit();
   } 
   else{
        //header("Location:preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&ALERT_CAMPI=".$alertCampi);   
        echo("<script>window.location.replace('preventivo?ID_RICHIESTA=".$_POST["ID_RICHIESTA"]."&PASSWORD=".$_POST["PASSWORD"]."&ALERT_CAMPI=".$alertCampi."');</script>");
        exit();
   }     
}


$richiesta = getRichiesta($_POST["ID_RICHIESTA"]);

// controllo che non abbia spam
if(isSpam($richiesta)){
	exit("ATTENZIONE !! NESSUN CAMPO DEVE CONTENERE INDIRIZZI INTERNET!! E SOLO IL CAMPO E-MAIL PUO´CONTENERE UNO, E UNO SOLO, INDIRIZZO E-MAIL. GRAZIE");
}

 if($_POST["FROM_ANDROID"]=="1"){
     // TENGO LA MAIL NON CONFERMATA
 }
 else{
     confermaRichiesta($testoMail);
 }


// DOPO LA CONFERMA ... AGGIORNO LA TABELLA AUTORIPARATORI 
aggiornaAutoriparatoriDopoInsertRichiesta($richiesta['E-MAIL'],$richiesta['TELEFONO'],$richiesta['NOME'],$richiesta['ID_PROVINCIA'],$_POST["ACCETTAZIONE_PUBBLICITA"]);

updateRichiesta_IdAutoriparatore($richiesta['ID']);

// se non ho già mandato la mail di avviso con il link per vedere la lista richieste .. allora la invio 

// e registro la nuova data



// INVIO COOKIE PER RICORDARE I DATI DELL'UTENTE SUL OMPUTER

if($_POST["FROM_ANDROID"]=="1"){
     
 }
 else{
        if($_COOKIE["letto_info_cookie"] == "yes"){
            setcookie ("NOME", $richiesta["NOME"],time()+ 94608000 ,  '/'); // setto la durata del cookie a 3 anni
            setcookie ("TELEFONO", $richiesta["TELEFONO"],time()+ 94608000,  '/');
            setcookie ("MAIL", $richiesta["E-MAIL"],time()+ 94608000 ,  '/');
            setcookie ("PROVINCIA", $richiesta["ID_PROVINCIA"],time()+ 94608000 ,  '/');
        }    
 }

$body_text = getTestoInvioEffetuato($richiesta["ID_UTENTE"]);


// INVIO UNA MAIL A QUELLO CHE HA FATTO LA RICHIESTA
	//$testoMail = "Lei ha appena richiesto un preventivo ad autorecupero.it.<br>Le ricordiamo che Autorecupero.it vi fornisce un servizio gratuito e non si assume nessuna responsabilità sulla veridicità o l'aggiornamento delle informazioni, e la vendita dei ricambi che può generarsi per le informazioni fornite da autorecupero.it è una questione che riguarda solamente il ricambista e il cliente interessato.<br>Nell’intento di migliorare il servizio e di renderlo sempre più affidabile <b>vi invitiamo a scriverci in merito a qualunque problema incontriate!!</b><br><br>Cordiali saluti<br><br>Staff di autorecupero.it";
// invio la mail solamente a quelli che non son autodemolitori !!! perchè per loro viene gestito in maniera diversa attraverso l'apposita sezione 
if( autoriparatoreConMailGiornaliera($richiesta["E-MAIL"])!="1"  ){
    
        $testoMail = getBodyMail($idRichiesta);

        //echo($idRichiesta);

        $oggetto = "Richiesta di ricambi per ".$richiesta["MARCA"]." ".$richiesta["MODELLO"];

	mail($richiesta["E-MAIL"],$oggetto,$testoMail,"Content-Type: text/html\r\n"."From:info@autorecupero.it\r\n"."Reply-To:info@autorecupero.it\r\n");
    
}
    


// richiesta a trucks italiana e compari  lo lancio come task asincrono


    $params = array( "CHECK" => "1" , "ID_RICHIESTA" => $_POST["ID_RICHIESTA"]);
        
    //echo('prova');
    if($_POST["FROM_ANDROID"]=="1"){
        
    }
    else{
        //  adesso viene inviato il processo da un batch
        //invioRichiestaToAudemolitori($_POST["ID_RICHIESTA"]);
         //lanciaProcessoAsincrono("https://www.autorecupero.it/richiesta/invioSingolaRichiesta.php", $params);
    }
    //invioRichiestaToAudemolitori($_POST["ID_RICHIESTA"]);




// ritorno la pagina da visualizzare quando la richiesta

if($_POST["FROM_ANDROID"]=="1"){
     echo("La sua richiesta è stata inviata ai circa 60 ricambisti del circuito!<br>Attenda i loro preventivi!");
} 
else{
    
    

    $title = "RICHIESTA DI PREVENTIVO";
    $title_on_bread_crumb = $title;
    $keyword = "CONFRONTA I PREVENTIVI DELLE 60 AUTODEMOLIZIONI DEL CIRCUITO";
    $meta_tag_description = "E' possibile richiedere un preventivo alle 60 autodemolizioni del circuito di autorecupero.it";
    $shoulder_name = "RICHIESTA";
    $language = "IT";

     
    //include($_SERVER['DOCUMENT_ROOT']."/generate_page_bootstrap.php");
    
    //include($_SERVER['DOCUMENT_ROOT']."/generate_page_bootstrap.php");
    
    if($_POST["PAGE_FROM"]=="APP"){
        include("..//3preventivo_soloapp/preventivo_risposta.php");
    }else{
        include("..//3preventivo/preventivo_risposta.php");
       //            header("Location:../3preventivo/preventivo_risposta.php?NOME=".$_POST["NOME"]."&ID_RICHIESTA=".$_POST["ID_RICHIESTA"]); 
    }
    
     exit();
    
    //echo generatePage($title,$keyword,$description,$shoulder_name,$body_text,$language);  
}










function check_idrichiesta_password(){

        //echo("voglio capire qualcosa");
    
	$connection = getConnection()

        or closePage("Si è verificato un errore riprovare in un altro momento o contattare l'amministratore info@autorecupero.it 328 0555034'");


	$query = "		select * 

					from richiesta

					where ID=".$_POST["ID_RICHIESTA"]." and MILLISECONDO=".$_POST["PASSWORD"];

        //echo("<br>".$query);

	select($query,$connection,$result) or closePage("Si è verificato un errore riprovare in un altro momento o contattare l'amministratore info@autorecupero.it 328 0555034'");

        $row = $result[0];
        
        //print_r($row);

        if($row["ID"]==$_POST["ID_RICHIESTA"]){
            return true;
        }
        else{
            return false;
        }

}





/* 

 aggiorna il db tabella  "configurazione" per sapere fin che giorno si è arrivati nello spedire la mail 

 con il link alla lista di richieste 

*/
/*
function aggiornaDataMailLinkRichieste(){

	$connection = getConnection() or

        closePage("Si è verificato un errore riprovare in un altro momento o contattare l'amministratore info@autorecupero.it 328 0555034'");


	$query = "

					update configurazione 

					set VALORE ='".date("d")."' 

					where  PARAMETRO='DATA_ULTIMA_MAIL_RIC' ";


	execute($query,$connection) or closePage("Si è verificato un errore riprovare in un altro momento o contattare l'amministratore info@autorecupero.it 328 0555034'");			 		


}*/


function updateDatiRichiesta(){

	$connection = getConnection()

        or registrazioneAutoPostClosePage("Impossibile stabilire la connessione al DataBase");


        $query = "
                    UPDATE `richiesta` SET
                            NOME = '".$_POST["NOME"]."' ,
                            ID_PROVINCIA = '".$_POST["PROVINCIA"]."' ,
                            TELEFONO = '".$_POST["TELEFONO"]."' ,
                            `E-MAIL` = TRIM('".$_POST["MAIL"]."') ,
                            MARCA = '".$_POST["MARCA"]."' ,
                            MODELLO = '".$_POST["MODELLO"]."' ,
                            ANNO = '".$_POST["ANNO"]."' ,
                            ALIMENTAZIONE = '".$_POST["ALIMENTAZIONE"]."' ,
                            CILINDRATA = '".$_POST["CILINDRATA"]."' ,
                            CODICE_MOTORE = '".$_POST["CODICE_MOTORE"]."' ,
                            SPEC_MODELLO = '".$_POST["SPECIFICHE_MODELLO"]."' ,
                            INFO_RICAMBIO = '".$_POST["INFO"]."' ,
                            DATA = CURRENT_DATE() ,
                            MILLISECONDO = UNIX_TIMESTAMP( NOW( ) ),
                            AUTORIZZA_PUBBLICITA = '".$_POST["ACCETTAZIONE_PUBBLICITA"]."',
                            SPEDITA_VIA_MAIL_A_DEMOLITORI = 0    
                    WHERE ID = ".$_POST["ID_RICHIESTA"];

        //mail("martin.modena@gmail.com", "errore", $query);

/*

	$query = "

					INSERT INTO `richiesta` (

						`ID` , `NOME` , `ID_PROVINCIA` , `TELEFONO` ,

						`E-MAIL` , `MARCA` , `MODELLO` , `ANNO` ,

						`ALIMENTAZIONE` , `CILINDRATA` , `SPEC_MODELLO` ,

						`INFO_RICAMBIO` , `INVIATO` , `DATA` , `RAGGIO`  ,  `AUTORIZZA_PUBBLICITA` )

					VALUES (

						NULL , '".$_GET["NOME"]." ".$_GET["COGNOME"]."', '".$_GET["PROVINCIA"]."', '".$_GET["TELEFONO"]."',

						'".$_GET["MAIL"]."', '".$_GET["MARCA"]."', '".$_GET["MODELLO"]."', '".$_GET["ANNO"]."',

						'".$_GET["ALIMENTAZIONE"]."', '".$_GET["CILINDRATA"]."', '".$_GET["SPECIFICHE_MODELLO"]."',

						'".$_GET["INFO"]."', '0', CURRENT_DATE() , '0' , '".$_GET["ACCETTAZIONE_PUBBLICITA"]."' ) ";

*/

	execute($query,$connection) or registrSuDBnonRiuscita($testoMail);

        // affinche venga rinviata via whatsapp ai demolitori
        $query = '
            delete from `wa_invio_richiesta_richiesta_inviata` 
            where ID_RICHIESTA = '.$_POST["ID_RICHIESTA"];
        
        execute($query,$connection);
        
        // affinche venga rinviata via mail  ai demolitori
        $query = '
            delete from `richiesta_inviata_a_utente_via_mail` 
            where ID_RICHIESTA = '.$_POST["ID_RICHIESTA"];
        
        execute($query,$connection);
        


        //return mysql_insert_id($connection);
        return $_POST["ID_RICHIESTA"];


}




function checkCampi(){
    
    $alertString = '';
    
    if(trim($_POST["NOME"])==""){
        $alertString .= ' -Nome';
    }
    if(trim($_POST["TELEFONO"])==""){
        $alertString .= ' -Telefono';
    }
    if(trim($_POST["MAIL"])==""){
        $alertString .= ' -Mail';
    }
    if(trim($_POST["INFO"])==""){
        $alertString .= ' -Lista Ricambi';
    }
      
    
    if($alertString!=''){
        $alertString = "Valorizzare i seguenti campi: ".$alertString;
    }
    
    return $alertString;
}





/*

	Registra la richiesta nel DB

*/

function confermaRichiesta($testoMail){

	$connection = getConnection()

        or registrazioneAutoPostClosePage("Impossibile stabilire la connessione al DataBase");


        $query = "
                    UPDATE `richiesta` SET
                            CONFERMATA  = 1 ,
                            AUTORIZZA_PUBBLICITA = '".$_POST["ACCETTAZIONE_PUBBLICITA"]."'
                    WHERE ID = ".$_POST["ID_RICHIESTA"];

//echo($query);

/*

	$query = "

					INSERT INTO `richiesta` ( 

						`ID` , `NOME` , `ID_PROVINCIA` , `TELEFONO` , 

						`E-MAIL` , `MARCA` , `MODELLO` , `ANNO` , 

						`ALIMENTAZIONE` , `CILINDRATA` , `SPEC_MODELLO` ,

						`INFO_RICAMBIO` , `INVIATO` , `DATA` , `RAGGIO`  ,  `AUTORIZZA_PUBBLICITA` )

					VALUES (

						NULL , '".$_GET["NOME"]." ".$_GET["COGNOME"]."', '".$_GET["PROVINCIA"]."', '".$_GET["TELEFONO"]."', 

						'".$_GET["MAIL"]."', '".$_GET["MARCA"]."', '".$_GET["MODELLO"]."', '".$_GET["ANNO"]."', 

						'".$_GET["ALIMENTAZIONE"]."', '".$_GET["CILINDRATA"]."', '".$_GET["SPECIFICHE_MODELLO"]."', 

						'".$_GET["INFO"]."', '0', CURRENT_DATE() , '0' , '".$_GET["ACCETTAZIONE_PUBBLICITA"]."' ) ";

*/
	
	execute($query,$connection) or registrSuDBnonRiuscita($testoMail);				 		
		
        //return mysql_insert_id($connection);
        return $_POST["ID_RICHIESTA"];

}


//[NOME] => dc [PROVINCIA] => Ancona [TELEFONO] => cx [MAIL] => cx [MARCA] => AC [MODELLO] => xc [ANNO] => xc [//ALIMENTAZIONE] => BENZINA [CILINDRATA] => xc [SPECIFICHE_MODELLO] => xc	 [INFO] 

// controllo che non ci siano scritte http ne @ nella richiesta
// inoltre controllo che il campo mail contenga al massimo una @
function isSpam($richiesta){

	
	
	if($_POST["antispam"]!=''){
        return true;
    }
	
	foreach($richiesta as $index => $value){
	  if(contains($value, "http")){
		return true;	
	  }	
	  if(contains($value, "@")){
		if($index!="E-MAIL"){
		   return true;		
		}
		else{ // nel caso in cui sia il campo mail controllo che contenga una sola @
			$lista = explode("@",$value);
			$numElementi = count($lista);
			if($numElementi>2){
				return true;	
			}
		}
	  }	
	}

	return false; 
}

function contains( $content,$str, $ignorecase=true){
    if ($ignorecase){
        $str = strtolower($str);
        $content = strtolower($content);
    }  
    return strpos($content,$str) ? true : false;
}


function registrSuDBnonRiuscita($testoMail){

	mail("$staff","REGISTRAZIONE NON RIUSCITA","$testoMail","Content-Type: text/html\r\n"."From:info@autorecupero.it\r\n"."Reply-To:info@autorecupero.it\r\n");


}

function getTestoInvioEffetuato($idUtente){

    
return '



<p>
<font class="corpo" style="FONT-SIZE: 15pt;">

La richiesta è stata inoltrata con successo alle autodemolizioni del circuito!<br>
            
<A style="FONT-SIZE: 15pt;" href="https://'.$_SERVER['HTTP_HOST'].'/preventivo?U='.$idUtente.'">CLICCA QUI PER UNA NUOVA RICHIESTA</A>

</font>
</p>
';
    
    



}




function salva_file_gia_ridotto($nomeFileFinale){

    

    if(is_dir('..\\')){

        $slash = "\\";

    }

    else{

        $slash = "/";

    }

    

    $slash = "/";

     

    

        $base64size = strlen($_POST['s1']);

        $f = base64_decode($_POST['s1']);

        //$name = microtime(true).".jpeg";

        

        $dest = $_SERVER['DOCUMENT_ROOT'].$slash."richiesta".$slash."foto".$slash.$nomeFileFinale;

        //$dest = $uploaddir."/foto/".$nomeFileFinale;

        //file_put_contents("./$nomeFileFinale", $f);

        file_put_contents($dest, $f);

    

}



?>
